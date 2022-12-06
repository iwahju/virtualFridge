import certifi
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
client = MongoClient('mongodb+srv://andrewg3:Sshdwrnd1@cluster0.sx6hgc8.mongodb.net/test', tlsCAFile=certifi.where())
db = client.test
recipeData = db.recipeData
userData = db.users
cors = CORS(app)

app.config["JWT_SECRET_KEY"] = "ThisIsASecretFridge:P"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/token', methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print(", "+password)
    user=userData.find_one({"$and": [{"name": username}, {"password": password}]})
    
    if user is None:
        return {"msg": "Wrong username or password"}, 401

    access_token = create_access_token(identity=username)
    response = {"access_token":access_token}
    return response

@app.route('/createAccount', methods=["POST"])
def create_account():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    newAcc= {
        "name":username,
        "password":password,
        "inventory":{},
        "shoppingList":{}   
    }
    user=userData.find_one({"name": username})
    if user is not None:
        return {"msg": "That username is taken"}, 401

    userData.insert_one(newAcc)
    
    access_token = create_access_token(identity=username)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/profile')
@jwt_required()
def my_profile():
    
    user=userData.find_one({"name": get_jwt_identity()})
    response_body = {
        "name": get_jwt_identity(),
        "items" :user["inventory"],
        "list":user["shoppingList"]
    }
    counter=0
    for item in response_body["items"]:
        item["index"]=counter
        counter=counter+1

    return response_body

@app.route('/recipes', methods=["GET"])
@jwt_required()
def get_recipes():
    # get all docs from mongo collection and remove unserializable ID
    response = list(recipeData.find({}, { "_id": 0}))
    for item in response:
        for component in item["ingredients"]:
            if "unit" not in component:
                component["unit"]=""
            if component["unit"]!="":
                component["unit"]=str(component["unit"])+"s"
            if component["unit"]=="Nones":
                component["unit"]=""
    # print(response)
    return response

@app.route('/planRecipe', methods=["POST"]) #put recipe ingredients to shopping cart
@jwt_required()
def planRecipe():
    data = request.json.get("data", None)
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for each in data:
        item=each
        item["date"] = None   #This should be able to hardcode it as a "null" string
        item["fridge"] = True   #default as True, as we otherwise don't know and we probably don't want another popup
        item["ingredient"]=item["name"]
        item["name"]=None
        user["shoppingList"].append(item)

    userData.update_one({"name": get_jwt_identity()}, {"$set": {"shoppingList": user["shoppingList"]}})
    return user["shoppingList"]




@app.route('/addRecipe', methods=["POST"])
@jwt_required()
def addRecipes():
    newRecipe={
        "author": get_jwt_identity(),
        "name": str(request.json.get("name", None)).lower(),
        "time": int(request.json.get("time", None)),
        "difficulty":int(request.json.get("difficulty", None)),
        "spiceLevel": request.json.get("spice", None).lower(),
        "tags":request.json.get("tags", None),
        "ingredients": request.json.get("ingredients", None),
        "steps": request.json.get("instructions", None)
    }
    recipeBook=recipeData.find({}, { "_id": 0})
    for item in recipeBook:
        for component in item["ingredients"]:
            if "unit" not in component:
                component["unit"]=""
            
            if component["unit"]!="":
                component["unit"]=str(component["unit"])+"s"
            if component["unit"]=="Nones":
                component["unit"]=""
    check = recipeData.find({"$and": [{"name": newRecipe["name"]}, {"author": newRecipe["author"]}]}, { "_id": 0})
    if len(list(check)) > 0:
        return {"message": "recipe already added"}
    recipeData.insert_one(newRecipe)

    return {"message":"recipe added"}

@app.route('/makeRecipe', methods=["POST"]) #make a recipe and use all ingredients (no matter if it is enough or not) that you have in fridge/pantry
@jwt_required()
def makeRecipe():
    data = request.json.get("data", None)
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for each in data:
        for item in user["inventory"]:
            if each["name"].lower() == item["ingredient"].lower():      #if item exist in inventory
                
                if each["unit"] == item["unit"]:
                    item["quantity"]-=each["quantity"]
                    if item["quantity"] <= 0:
                        user["inventory"].pop(each["name"]) ##REMOVE ITEM FROM USER INVENTORY
                    break
                elif each["unit"] == "" or item["unit"] == "":
                    break
                else:
                    item["quantity"] -= unitConversion(each, item["unit"]) ##MAY HAVE A GLITCH, as data is a recipeName;quantity;unit structure while item is a name;quantity;unit;fridge;date structure
                    if item["quantity"] <= 0:                              ##IF NOT WORKING, then set else as break and continue on the next for loop iteration
                        user["inventory"].pop(each["name"]) ##REMOVE ITEM FROM USER INVENTORY
                    break

    userData.update_one({"name": get_jwt_identity()}, {"$set": {"inventory": user["inventory"]}})
    return {"message": "inventory is updated and enjoy cooking!"}

@app.route('/addItem', methods=["POST"])
@jwt_required()
def add_item():
    item = {
        "ingredient": str(request.json.get("ingredient", None)).lower(),
        "quantity": float(request.json.get("quantity", None)),
        "unit": request.json.get("unit", None),
        "date": request.json.get("date", None),
        "fridge": request.json.get("fridge", None),
    }
    if item["fridge"] == "false" or item["fridge"] == "False":
        item["fridge"]=False
    else:
        item["fridge"]=True
    if item["ingredient"]=="" or item["quantity"]==0:
        return {"msg": "please fill out all fields"}, 401
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for ingredient in user["inventory"] :
        if ingredient["ingredient"]==item["ingredient"] and ingredient["date"]==item["date"]:
            if ingredient["unit"] == item["unit"]:
                ingredient["quantity"]+=item["quantity"]
                userData.update_one({"name": get_jwt_identity()}, {"$set": {"inventory": user["inventory"]}})
                return {"message": "item exists, adding q"}
            elif ingredient["unit"]=="" or item["unit"]=="":
                break #add as seperate entity
            else:
                if unitConversion(item, ingredient["unit"]) == 0:
                    break
                ingredient["quantity"] =  ingredient["quantity"]+ float(unitConversion(item, ingredient["unit"]))
                userData.update_one({"name": get_jwt_identity()}, {"$set": {"inventory": user["inventory"]}})
                return {"message": "item exists, adding q in converted units"}

    user["inventory"].append(item) #add item as seperate entity
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item didnt exist, adding new item"}

@app.route('/addList', methods=["POST"])
@jwt_required()
def addList():
    item = {
        "ingredient": request.json.get("ingredient", None).lower(),
        "quantity": float(request.json.get("quantity", None)),
        "unit": request.json.get("unit", None),
        "fridge": request.json.get("fridge", None),
    }
    if item["fridge"] == "false" or item["fridge"] == "False":
        item["fridge"]=False
    else:
        item["fridge"]=True
    if item["ingredient"]=="" or item["quantity"]==0:
        return {"msg": "please fill out all fields"}, 401
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for ingredient in user["shoppingList"] :
        if ingredient["ingredient"]==item["ingredient"] and ingredient["date"]==item["date"]:
            if ingredient["unit"] == item["unit"]:
                ingredient["quantity"]+=item["quantity"]
                userData.update_one({"name": get_jwt_identity()}, {"$set": {"inventory": user["inventory"]}})
                return {"message": "item exists, adding q"}
            elif ingredient["unit"] == "" or item["unit"] == "":
                break #add as seperate entity
            else:
                ingredient["quantity"] += unitConversion(item, ingredient["unit"]) 
                userData.update_one({"name": get_jwt_identity()}, {"$set": {"inventory": user["inventory"]}})
                return {"message": "item exists, adding q in converted units"}
    user["shoppingList"].append(item)
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "shoppingList": user["shoppingList"]}})
    return {"message":"item didnt exist, adding new item"}

@app.route('/deleteItem', methods=["POST"]) #index of item
@jwt_required()
def deleteItem():
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401

    user["inventory"].pop(int(request.json.get("index", None)))
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item successfully deleted"}

@app.route('/deleteList', methods=["POST"]) #index of item
@jwt_required()
def deleteList():
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401

    user["shoppingList"].pop(int(request.json.get("index", None)))
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "shoppingList": user["shoppingList"]}})
    return {"message":"item successfully deleted" }

@app.route('/editItem', methods=["POST"] ) #values of item, index of item
@jwt_required()
def editItem():
    item = {
        "ingredient": request.json.get("ingredient", None).lower(),
        "quantity": int(request.json.get("quantity", None)),
        "unit": request.json.get("unit", None),
        "date": request.json.get("date", None),
        "fridge": request.json.get("fridge", None),
    }
    if item["fridge"] == "false" or item["fridge"] == "False" :
        item["fridge"]=False
    else:
        item["fridge"]=True
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please `Sign In"}, 401
    oldItem=user["inventory"][int(request.json.get("index", None))]
    user["inventory"][int(request.json.get("index", None))]=item

    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item edited successfully"}

@app.route('/addShoppingCart')
@jwt_required()
def addShoppingCart():
    user=userData.find_one({"name": get_jwt_identity()})
    items=user["shoppingList"]
    for ingredient in items:
        i=0

    return 0

@app.route('/')
@app.route('/home')
@app.route('/myrecipe')
@app.route('/findrecipe')
@app.route('/grocerylist')
@app.route('/sign-up')
def serve_static():
    return app.send_static_file('index.html')

# takes an ingredient and the unit that we want to convert to. this unit must be passed as a string
def unitConversion(ingredient, unit):
    if ingredient['unit'] == "" or ingredient['unit'] == unit:
        return 0
    quantity = ingredient['quantity']
    dryWeights = ['grams', 'kilograms', 'pounds', 'ounces']
    wetWeights = ['gallons', 'quarts', 'pints', 'cups', 'fluid ounces', 'tablespoons', 'teaspoons', 'liters', 'milliliters']

    if ingredient['unit'] in dryWeights and unit in dryWeights:
        if ingredient['unit'] == 'kilograms':
            quantity *= 1000
        elif ingredient['unit'] == 'pounds':
            quantity *= 453.592
        elif ingredient['unit'] == 'ounces':
            quantity *= 28.3495

    elif ingredient['unit'] in wetWeights and unit in wetWeights:
        if ingredient['unit'] == 'liters':
            quantity *= 1000
        elif ingredient['unit'] == 'cups':
            quantity *= 240
        elif ingredient['unit'] == 'pints':
            quantity *= 473
        elif ingredient['unit'] == 'quarts':
            quantity *= 946.4
        elif ingredient['unit'] == 'gallons':
            quantity *= 3785
        elif ingredient['unit'] == 'fluid ounces':
            quantity *= 29.574
        elif ingredient['unit'] == 'tablespoons':
            quantity *= 14.787
        elif ingredient['unit'] == 'teaspoons':
            quantity *= 4.929
    else:
        return 0

    ingredient['unit'] = unit
    if ingredient['unit'] in dryWeights:
        if ingredient['unit'] == 'kilograms':
            quantity /= 1000
        elif ingredient['unit'] == 'pounds':
            quantity /= 453.592
        elif ingredient['unit'] == 'ounces':
            quantity /= 28.3495

    elif ingredient['unit'] in wetWeights:
        if ingredient['unit'] == 'liters':
            quantity /= 1000
        elif ingredient['unit'] == 'cups':
            quantity /= 240
        elif ingredient['unit'] == 'pints':
            quantity /= 473
        elif ingredient['unit'] == 'quarts':
            quantity /= 946.4
        elif ingredient['unit'] == 'gallons':
            quantity /= 3785
        elif ingredient['unit'] == 'fluid ounces':
            quantity /= 29.574
        elif ingredient['unit'] == 'tablespoons':
            quantity /= 14.787
        elif ingredient['unit'] == 'teaspoons':
            quantity /= 4.929
            quantity = round(quantity, 3)
    return quantity

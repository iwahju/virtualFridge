import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)
client = MongoClient('mongodb+srv://andrewg3:Sshdwrnd1@cluster0.sx6hgc8.mongodb.net/test')
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
    for ingredient in user["inventory"]:
        if type(ingredient["date"]) !=type(datetime.now(timezone.utc)):
            ingredient["date"] = datetime.strptime(ingredient["date"],'%Y-%m-%d')
        ingredient["expWarning"] = experationWarningIng(ingredient)
    response_body = {
        "name": get_jwt_identity(),
        "items" :user["inventory"]
    }
    

    return response_body

@app.route('/recipes', methods=["GET"])
@jwt_required()
def get_recipes():
    # get all docs from mongo collection and remove unserializable ID
    response = list(recipeData.find({}, { "_id": 0}))
    # print(response)
    return response

@app.route('/addItem', methods=["POST"])
@jwt_required()
def add_item():
    item = {
        "ingredient": request.json.get("ingredient", None).lower(),
        "quantity": int(request.json.get("quantity", None)),
        "unit": request.json.get("unit", None),
        "date": request.json.get("date", None),
        "fridge": bool(request.json.get("fridge", None)),
    }
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for ingredient in user["inventory"] :
        if ingredient["ingredient"]==item["ingredient"] and ingredient["date"]==item["date"]:
            ingredient["quantity"]+=item["quantity"]
            userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
            return "item exists, adding q"
    user["inventory"].append(item)
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item didnt exist, adding new item",
            "inventory":  user["inventory"] }


def allFridgeIngredients(Fridge):
    fridgeIngredients = []
    for i in Fridge:
        fridgeIngredients.append({'name':i['ingredient'],'quantity':i['quantity'],'unit':i['unit'],'date':i['date']})
    return fridgeIngredients
def allFridgeIngredientsNames(Fridge):
    fridgeIngredients = []
    for i in Fridge:
        fridgeIngredients.append(i['ingredient'])
    return fridgeIngredients


def allRecipeIngredients(aRecipe):
    listOfIngs = []
    for i in aRecipe['ingredients']:
        listOfIngs.append(i['name'].lower())
    return listOfIngs

def checkForIngredients(Fridge, aRecipe):
    fridgeIng = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    for i in recipeIng:
        if i not in fridgeIng:
            return False
    return True

def percentOfIngredients(Fridge, aRecipe):
    if checkForIngredients(Fridge,aRecipe):
        return 1
    fridgeIng = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    matches = 0
    for i in recipeIng:
        if i in fridgeIng:
            matches = matches + 1
    return round(float(int(matches)/len(recipeIng)),3)
def createAScore(Fridge,aRecipe):
    if checkForIngredients(Fridge,aRecipe):
        return 1
    fridgeIng = allFridgeIngredientsNames(Fridge)
    recipeIng = allRecipeIngredients(aRecipe)
    matches = 0
    for i in recipeIng:
        if i in fridgeIng:
            matches = matches + 1
    percent = round(float(int(matches)/len(recipeIng)),3)
    return matches * percent

def completeRecipes(Fridge, allRecipes):
    completeRecipes = []
    for i in allRecipes:
        if checkForIngredients(Fridge, i):
            completeRecipes.append(i)
    return completeRecipes

def calcTimeDiff(date):
   today = datetime.today().date()
   date = date.date()
   timeDiff = date - today
   return int(timeDiff.days)

def experationWarningIng(anIngredient):
    ing = anIngredient['date']
    diff = calcTimeDiff(ing)
    if diff > 3:
        return 4
    elif diff == 3:
        return 3
    elif diff == 2:
        return 2
    elif diff == 1:
        return 1
    elif diff == 0:
        return 1
    else:
        return 0
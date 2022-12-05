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
        "fridge": request.json.get("fridge", None),
    }
    item["fridge"]=bool(item["fridge"])
    if item["ingredient"]=="" or item["quantity"]==0:
        return {"msg": "please fill out all fields"}, 400
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401
    for ingredient in user["inventory"]:
        if ingredient["ingredient"]==item["ingredient"] and ingredient["date"]==item["date"]:
            ingredient["quantity"]+=item["quantity"]
            userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
            return "item exists, adding quantity"
    user["inventory"].append(item)
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item didnt exist, adding new item"}
    
@app.route('/deleteItem')
@jwt_required()
def deleteItem():
    user=userData.find_one({"name": get_jwt_identity()})
    if user is  None:
        return {"msg": "Account Error: Please Sign In"}, 401

    user["inventory"].pop(int(request.json.get("index", None)))
    
    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item successfully deleted",
            "user": user["inventory"]  }

@app.route('/editItem')
@jwt_required()
def editItem():
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
    oldItem=user["inventory"][int(request.json.get("index", None))]
    user["inventory"][int(request.json.get("index", None))]=item

    userData.update_one({"name": get_jwt_identity()},{ "$set": { "inventory": user["inventory"]}})
    return {"message":"item edited successfully",
            "oldItem": oldItem,
            "item": item}

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
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
    response_body = {
        "name": get_jwt_identity(),
        "items" :user["inventory"]
    }
    

    return response_body

@app.route('/addItem', methods=["POST"])
@jwt_required()
def addItem():

    # user = userData.find_one({"name": get_jwt_identity()})
    # newItem= {
    #     "items" :user["inventory"]
    # }
    # response_body = {
    #     "items" :user["inventory"]
    # }
    username = request.json.get("username", None)
    newItem= {
        "inventory":{},
    }
    user=userData.find_one({"name": username})
    if user is not None:
        return {"msg": "That username is taken"}, 401

    userData.insert_one(newItem)

    return response_body


# @app.route('/inventory',methods=["POST"])
# @jwt_required()
# def addInventoryItem():
    
#     user=userData.find_one({"name": get_jwt_identity()})
#     response_body = {
#         "name": get_jwt_identity(),
#         "items" :user["inventory"]
#     }
    

#     return response_body



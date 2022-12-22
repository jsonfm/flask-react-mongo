from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from config import config


app = Flask(__name__)
app.config["MONGO_URI"] = config["MONGO_URI"]

CORS(app)
mongo = PyMongo(app)

db = mongo.db.users


@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for user in db.find():
        users.append({
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "password": user["password"],
        })
    return jsonify(users)


@app.route("/user/<id>", methods=["GET"])
def get_user(id):
    user = db.find_one({"_id": ObjectId(id)})
    if user is not None:
        user["_id"] = str(user["_id"])
    else:
        user = {}
    return jsonify(user=user)


@app.route("/user", methods=["POST"])
def create_user():
    user = db.insert_one({
        "name": request.json["name"],
        "email": request.json["email"],
        "password": request.json["password"],
    })
    return jsonify(id=str(user.inserted_id), message="user created sucessfully.")


@app.route("/user/<id>", methods=["DELETE"])
def delete_user(id: str):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify(message="user deleted", id=id)


@app.route("/user/<id>", methods=["PUT"])
def update_user(id: str):
    db.update_one({'_id': ObjectId(id)}, {
        "$set" : {
            'name': request.json["name"],
            'email': request.json["email"],
            'password': request.json["password"]
        }
    })
    return jsonify(message="user updated", id=id)


if __name__ == "__main__":
    app.run(debug=True)
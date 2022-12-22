from flask import Flask, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from config import config


app = Flask(__name__)
app.config["MONGO_URI"] = config["MONGO_URI"]
mongo = PyMongo(app)
db = mongo.db.users


@app.route("/users", methods=["GET"])
def get_users():
    return "received"


@app.route("/users/<id>", methods=["GET"])
def get_user():
    return "received"


@app.route("/users", methods=["POST"])
def create_user():
    # id = db.insert({
    #     "name": request.json["name"],
    #     "email": request.json["email"],
    #     "password": request.json["password"],
    # })
    # print("id: ", str(ObjectId(id)))
    print("db: ", db)
    return "received"


@app.route("/users", methods=["DELETE"])
def delete_user():
    return "received"


@app.route("/users/<id>", methods=["PUT"])
def update_user():
    return "received"


if __name__ == "__main__":
    app.run(debug=True)
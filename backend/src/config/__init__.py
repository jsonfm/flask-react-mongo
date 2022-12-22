from dotenv import load_dotenv
import os
load_dotenv()  # take environment variables from .env.


config = os.environ
DB_NAME = config.get("DB_NAME", "")
DB_PORT = config.get("DB_PORT", 27017)
DB_HOST = config.get("DB_HOST", "localhost")
config["MONGO_URI"] = f"mongodb://${DB_HOST}:{DB_PORT}/{DB_NAME}"

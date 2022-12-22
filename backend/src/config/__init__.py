from dotenv import load_dotenv
import os
load_dotenv()  # take environment variables from .env.


config = os.environ
DB_NAME = config.get("DB_NAME", "")
DB_PORT = config.get("DB_PORT", 27017)
DB_HOST = config.get("DB_HOST", "localhost")
DB_USER = config.get("MONGO_USERNAME", "")
DB_PASSWORD = config.get("MONGO_PASSWORD", "")
config["MONGO_URI"] = f"mongodb://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?authSource=admin"

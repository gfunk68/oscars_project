import os
import pandas as pd
import sys
sys.path.insert(1, './')
sys.path.insert(1, './')
from merger import allwinners
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

allwinners_df = allwinners()












app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/oscars_db"
mongo = PyMongo(app)
winners= mongo.db.winners
winners.drop()

df_to_dict = json.loads(allwinners_df.T.to_json()).values()

winners.insert_many(df_to_dict)
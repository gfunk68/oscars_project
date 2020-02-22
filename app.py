import os
import pandas as pd
import sys
import json
sys.path.insert(1, './')
from merger import allwinners

# Dependencies for Flask module and MongoDb 
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


#Converts python.cursor.Cursor object to serializable/JSON object

from bson.json_util import dumps

# storing the concatenated dataframe in "allwinners_df"

#allwinners_df = allwinners()


# MongoDb connection and Database set up

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/oscars_db"
mongo = PyMongo(app)

# collection "winners" created in "oscars_db" after the insertion of first record
winners= mongo.db.winners
#winners.drop()   # drops the collection "winners" if it already exists


# converts the concatenated dataframe to json format to store in "MongoDb"

#df_to_dict = json.loads(allwinners_df.T.to_json()).values()

#Inserting the json data to "winners" collection
#winners.insert_many(df_to_dict)


# flask set up

app = Flask(__name__)

#Flask Home route

@app.route("/")
def home_route():
    """Listing all available routes."""

    return(
        f"Following routes has oscar Winners - Demographic information<br/><br/>"
        f"/api/v1.0/all_winners_data<br/>"
        f"/api/v1.0/best_actors<br/>"
        f"/api/v1.0/best_actresses<br/>"
        f"/api/v1.0/best_directors<br/>"
        f"/api/v1.0/best_supporting_actors<br/>"
        f"/api/v1.0/best_supporting_actresses<br/>"
    )


@app.route("/api/v1.0/all_winners_data")
def all_winners():
    """All Winners Data"""

    #Use dumps from bson.json_util:
    all_winners_data = dumps(mongo.db.winners.find())
    #print(all_winners_data)
    return all_winners_data



@app.route("/api/v1.0/best_actors")
def best_actor():
    """Best Actor Data"""
    # Find  data by matching "Category"- "Best Actor".
    best_actor= dumps(mongo.db.winners.find({"Category":"Best Actor"}))
    return best_actor


@app.route("/api/v1.0/best_actresses")
def best_actress():
    """Best Actress Data"""

    # Find all "Best_Actress" data

    best_actress = dumps(mongo.db.winners.find({"Category":"Best Actress"}))
    return best_actress

@app.route("/api/v1.0/best_directors")
def best_director():
    """Best Director Data"""

    # Find all "Directors" data

    director = dumps(mongo.db.winners.find({"Category":"Best Director"}))
    return director


@app.route("/api/v1.0/best_supporting_actors")
def best_supporting_actor():
    """Best Supporting Actor"""

    # Find all "Supporting Actors" data
    
    supporting_actors = dumps(mongo.db.winners.find({"Category":"Best Supporting Actor"}))
    return supporting_actors


@app.route("/api/v1.0/best_supporting_actresses")
def best_supporting_actress():

    #Find all "Supporting Actresses" data

    supporting_actress = dumps(mongo.db.winners.find({"Category":"Best Supporting Actress"}))
    return supporting_actress


if __name__ == "__main__":
    app.run(debug=True)


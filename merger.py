import os
import pandas as pd
import sys
import json
import requests
from pprint import pprint
sys.path.insert(1, './')
from scraper import director,supporting_actor,supporting_actress,best_actor,best_actress
from geopy import geocoders
from pymongo import MongoClient

def allwinners(): 
    try:
        director_df = director()
    except: 
        print("Oops!",sys.exc_info()[0],"occured, using bestdirector.csv instead")
        director_df = pd.Dataframe.read_csv("bestdirector.csv")

    try:
        bestactor_df = best_actor()
    except: 
        print("Oops!",sys.exc_info()[0],"occured, using bestactor.csv instead")
        bestactor_df = pd.Dataframe.read_csv("bestactor.csv")

    try:
        bestactress_df = best_actress()
    except: 
        print("Oops!",sys.exc_info()[0],"occured, using bestactress.csv instead")
        bestactress_df = pd.Dataframe.read_csv("bestactress.csv")

    try:
        bestsupportingactor_df = supporting_actor()
    except: 
        print("Oops!",sys.exc_info()[0],"occured, using bestsupportingactor.csv instead")
        bestsupportingactor_df = pd.Dataframe.read_csv("bestsupportingactor.csv")

    try:
        bestsupportingactress_df = supporting_actress()
    except: 
        print("Oops!",sys.exc_info()[0],"occured, using bestsupportingactress.csv instead")
        bestsupportingactress_df = pd.Dataframe.read_csv("bestsupportingactress.csv")

    allwinners_df = pd.concat([bestactress_df,bestactor_df,bestsupportingactor_df,bestsupportingactress_df,director_df], ignore_index=True)

    
    gn = geocoders.GeoNames(username='gfunk68')

    lat=[]
    lon=[]

    # base url by city name search
    #https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    # dictionary to store query parameters
    params={'appid':'f8b18b19cd1f9ce64f8f35d652b57a5f'}
    

    for x in allwinners_df['Birthplace']:
        if x != 'Unknown':
            try:
                params['q']=x
                response = requests.get(base_url,params = params).json()
                lon.append(response['coord']['lon'])
                lat.append(response['coord']['lat'])
            except:
                try:
                    y = gn.geocode(x)
                    lat.append(y.latitude)
                    lon.append(y.longitude)
                except:
                    lat.append('Unknown')
                    lon.append('Unknown')

        else:
            lat.append('Unknown')
            lon.append('Unknown')

    allwinners_df['Birthplace Latitude'] = lat
    allwinners_df['Birthplace Longitude'] = lon

    client=MongoClient('mongodb://localhost:27017/')
    db = client.oscars_db
    collection = db.winners
    collection.drop()
    df_to_dict = json.loads(allwinners_df.T.to_json()).values()
    collection.insert_many(df_to_dict)

    return allwinners_df

import os
import pandas as pd
import sys
import json
import requests
from pprint import pprint
sys.path.insert(1, './')
from scraper import director,supporting_actor,supporting_actress,best_actor,best_actress

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

    return allwinners_df

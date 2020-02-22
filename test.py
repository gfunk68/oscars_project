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

test_df = best_actor()
print(test_df)
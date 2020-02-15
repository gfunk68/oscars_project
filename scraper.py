import pandas as pd
import re
from bs4 import BeautifulSoup as bs
import requests
import sys
import os

def director():
    years = []
    director=[]
    film=[]
    directors = []
    directors_clean =[]
    url=[]
    birthplace =[]
    birthyear=[]

    
    raw_df = pd.read_html("https://en.wikipedia.org/wiki/Academy_Award_for_Best_Director")[2]
    director_df = raw_df[raw_df["Year"]!=raw_df["Film"]]
    list_of_years = director_df.Year.unique()
    
    for x in list_of_years:
        years.append(director_df[director_df["Year"]==x].iloc[0]["Year"])
        director.append(director_df[director_df["Year"]==x].iloc[0]["Director(s)"])
        film.append(director_df[director_df["Year"]==x].iloc[0]["Film"])
    for i in director:
        directors.append(i.split("&"))
    for i in directors:
        directors_clean.append(i[0])
    for i in range(len(directors_clean)):
        directors_clean[i] = re.sub("[\(\[].*?[\)\]]", "", directors_clean[i])
    for i in directors_clean:
        url.append(f"https://en.wikipedia.org/wiki/{i}")
    bestdirector_df = pd.DataFrame({"Years": years, "Winner Name":directors_clean, "Film": film, "Category":"Best Director", "Wiki URL":url})
    for x in url:
        response = requests.get(x)
        soup = bs(response.text, 'html.parser')
        try:
            birthplace_result = soup.find_all('div', class_='birthplace')[0].text
            birthplace.append(birthplace_result)
        except: 
            print("Oops!",sys.exc_info()[0],"occured")
            birthplace.append('Unknown')
        try:
            birthyear_result = soup.find_all('span', class_='bday')[0].text[:4]
            birthyear.append(birthyear_result)
        except:
            print("Oops!",sys.exc_info()[0],"occured")
            birthyear.append('Unknown')
    bestdirector_df['Birthplace']=birthplace
    bestdirector_df["Birth Year"]=birthyear
    bestdirector_df.to_csv("bestdirector.csv",index=False)
    
    return bestdirector_df
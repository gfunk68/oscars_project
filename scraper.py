import pandas as pd
import re
from bs4 import BeautifulSoup as bs
import requests
import sys
import os

scrape_info = [["Director","https://en.wikipedia.org/wiki/Academy_Award_for_Best_Director"],["Actor","https://en.wikipedia.org/wiki/Academy_Award_for_Best_Actor"]]

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
    bestdirector_df[["Year","Oscar Year"]] = bestdirector_df.Years.str.split("(",expand=True)
    bestdirector_df["Oscar Year"] = bestdirector_df["Oscar Year"].str.replace(r"[\(\[].*?[\)\]]","")
    bestdirector_df["Oscar Year"] = bestdirector_df["Oscar Year"].str.replace(")","")
    bestdirector_df = bestdirector_df[['Year','Oscar Year','Winner Name','Film', "Category",'Wiki URL']]
    
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

def supporting_actor():
    years = []
    supporting_actor=[]
    film=[]
    birthplace =[]
    birthyear=[]
    url=[]

    raw_df = pd.read_html("https://en.wikipedia.org/wiki/Academy_Award_for_Best_Supporting_Actor")[2]
    list_of_years = raw_df.Year.unique()


    for x in list_of_years:
        years.append(raw_df[raw_df["Year"]==x].iloc[0]["Year"])
        supporting_actor.append(raw_df[raw_df["Year"]==x].iloc[0]["Actor"])
        film.append(raw_df[raw_df["Year"]==x].iloc[0]["Film"])
    for i in supporting_actor:
        url.append(f"https://en.wikipedia.org/wiki/{i}")

    bestsupportingactor_df = pd.DataFrame({"Years": years, "Winner Name":supporting_actor, "Film": film,"Category":"Best Supporting Actor","Wiki URL":url})
    bestsupportingactor_df[["Year","Oscar Year"]] = bestsupportingactor_df.Years.str.split("(",expand=True)
    bestsupportingactor_df["Oscar Year"] = bestsupportingactor_df["Oscar Year"].str.replace(r"[\(\[].*?[\)\]]","")
    bestsupportingactor_df["Oscar Year"] = bestsupportingactor_df["Oscar Year"].str.replace(")","")
    bestsupportingactor_df = bestsupportingactor_df[['Year','Oscar Year','Winner Name','Film', "Category",'Wiki URL']]

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
    
    bestsupportingactor_df['Birthplace']=birthplace
    bestsupportingactor_df["Birth Year"]=birthyear
    bestsupportingactor_df.to_csv("bestsupportingactor.csv",index=False)

    return bestsupportingactor_df

def supporting_actress():
    years = []
    supporting_actress=[]
    film=[]
    birthplace =[]
    birthyear=[]
    url=[]

    raw_df = pd.read_html("https://en.wikipedia.org/wiki/Academy_Award_for_Best_Supporting_Actress")[2]
    list_of_years = raw_df.Year.unique()


    for x in list_of_years:
        years.append(raw_df[raw_df["Year"]==x].iloc[0]["Year"])
        supporting_actress.append(raw_df[raw_df["Year"]==x].iloc[0]["Actress"])
        film.append(raw_df[raw_df["Year"]==x].iloc[0]["Film"])
    for i in supporting_actress:
        url.append(f"https://en.wikipedia.org/wiki/{i}")

    bestsupportingactress_df = pd.DataFrame({"Years": years, "Winner Name":supporting_actress, "Film": film,"Category":"Best Supporting Actress","Wiki URL":url})
    bestsupportingactress_df[["Year","Oscar Year"]] = bestsupportingactress_df.Years.str.split("(",expand=True)
    bestsupportingactress_df["Oscar Year"] = bestsupportingactress_df["Oscar Year"].str.replace(r"[\(\[].*?[\)\]]","")
    bestsupportingactress_df["Oscar Year"] = bestsupportingactress_df["Oscar Year"].str.replace(")","")
    bestsupportingactress_df = bestsupportingactress_df[['Year','Oscar Year','Winner Name','Film', "Category",'Wiki URL']]

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

    bestsupportingactress_df['Birthplace']=birthplace
    bestsupportingactress_df["Birth Year"]=birthyear
    bestsupportingactress_df.to_csv("bestsupportingactress.csv",index=False)

    return bestsupportingactress_df

def best_actor():
    actors_list =[]
    films_list = []
    years_list = []
    tie_index = []
    actor_url = []
    birthplace =[]
    birthyear=[]

    url = "https://en.wikipedia.org/wiki/Academy_Award_for_Best_Actor"

    res = requests.get(url)

    soup = bs(res.text,'html.parser')

    table = soup.find(class_= "wikitable sortable").find("tbody")

    year_data = table.find_all(scope = "row")

    back_ground_yellow = table.find_all(style="background:#FAEB86;")

    for i in (range(len(year_data))):
        years_list.append(year_data[i].text.strip())  # total number of unique years are added to years_list

    for i in (range(len(back_ground_yellow))):
        #print(i)
        if (i%3 == 0): # All first column elemnets in the table(actor names) are added to actors_list
        
            actor = back_ground_yellow[i].find_all("b")[0].find("span").find("a").text
            actors_list.append(actor)
     
            ind = int(i/3) # to get indexes for "year data" [0-92] 
            # print(ind)
        
            if(back_ground_yellow[i].find("small")):  # if "Tie-up" winners are found, add indexes to "tie_index"
                #print(ind)
                #print("d")
                tie_index.append(ind)  
                if (len(tie_index)==2):  # Assuming 2 "Tie-up" winners in a year
                    if (tie_index[-1]-1) == tie_index[-2]: # checking for last index and second last index
                        years_list.insert(tie_index[-1],years_list[tie_index[-2]])  #insert the "Year" value for the second "Tie-up" winner
                        tie_index.clear()  # Clear the list for the next scenario of 2 "Tie-up" winners 
                     

        if (i%3 == 2): # All third column elemnets in the table(Film names) are added to films_list
        
            films_list.append(back_ground_yellow[i].find("b").text)

    bestactor_df = pd.DataFrame({"Years": years_list, "WinnersName": actors_list, "Film": films_list,"Category":"Best Actor"})
    #actor_df.head(10)

    actor_url = []
    for i in actors_list:
        #print(i)
        actor_url.append((f"https://en.wikipedia.org/wiki/{i}"))
    
    bestactor_df["Wiki URL"] = actor_url

    for url in actor_url:
        response = requests.get(url)
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


    bestactor_df["Birthplace"] = birthplace
    bestactor_df["Birth Year"] = birthyear
    
    bestactor_df.to_csv("best_actor.csv",index=False)

    return bestactor_df

def best_actress():
    actress_list =[]
    films_list = []
    years_list = []
    tie_index = []
    actress_url = []
    birthplace =[]
    birthyear=[]

    url = "https://en.wikipedia.org/wiki/Academy_Award_for_Best_Actress"

    res = requests.get(url)

    soup = bs(res.text,'html.parser')

    table = soup.find(class_= "wikitable sortable").find("tbody")

    year_data = table.find_all(scope = "row")

    back_ground_yellow = table.find_all(style="background:#FAEB86;")

    for i in (range(len(year_data))):
        years_list.append(year_data[i].text.strip())  # total number of unique years are added to years_list

    for i in (range(len(back_ground_yellow))):
        #print(i)
        if (i%3 == 0): # All first column elemnets in the table(actress names) are added to actress_list
        
            actress = back_ground_yellow[i].find_all("b")[0].find("span").find("a").text
            actress_list.append(actress)
     
            ind = int(i/3) # to get indexes for "year data" [0-92] 
            # print(ind)
        
            if(back_ground_yellow[i].find("small")):  # if "Tie-up" winners are found, add indexes to "tie_index"
                #print(ind)
                #print("d")
                tie_index.append(ind)  
                if (len(tie_index)==2):  # Assuming 2 "Tie-up" winners in a year
                    if (tie_index[-1]-1) == tie_index[-2]: # checking for last index and second last index
                        years_list.insert(tie_index[-1],years_list[tie_index[-2]])  #insert the "Year" value for the second "Tie-up" winner
                        tie_index.clear()  # Clear the list for the next scenario of 2 "Tie-up" winners 
                     

        if (i%3 == 2): # All third column elemnets in the table(Film names) are added to films_list
        
            films_list.append(back_ground_yellow[i].find("b").text)

    bestactress_df = pd.DataFrame({"Years": years_list, "WinnersName": actress_list, "Film": films_list,"Category":"Best Actress"})
    #actor_df.head(10)

    actress_url = []
    for i in actress_list:
        #print(i)
        actress_url.append((f"https://en.wikipedia.org/wiki/{i}"))
    
    bestactress_df["Wiki URL"] = actress_url

    for url in actress_url:
        response = requests.get(url)
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


    bestactress_df["Birthplace"] = birthplace
    bestactress_df["Birth Year"] = birthyear
    
    bestactress_df.to_csv("best_actress.csv",index=False)

    return bestactress_df






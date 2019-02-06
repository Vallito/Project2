#!/usr/bin/env python
# coding: utf-8

# In[1]:


#import libraries
from bs4 import BeautifulSoup as bs
import pandas as pd 
import numpy as np
import requests
from splinter import Browser
import codecs
import pymongo
#set path to use splinter
executable_path = {'executable_path': 'chromedriver.exe'}

browser = Browser('chrome', **executable_path, headless=False)

#declare url and parser
url = "https://en.wikipedia.org/wiki/Lists_of_shipwrecks"
browser.visit(url)
html = browser.html
soup = bs(html,'html.parser')

url = []
#find desired data
for i in soup.find('ul').findAll('a'):
    url.append(i['href'])


    #click link to go to country
   # browser.click_link_by_partial_href(i['href'])
   # browser.back()

    #obtain new page html and parse
    #html_country = browser.html
    #soup_country = bs(html_country,"html.parser")

    #find all tables
    #wikitables = soup.findAll("table", class_ ='wikitable').findall()
    #pd.read_html("https://en.wikipedia.org" + i["href"])
    #if i > 1:
    #     break
tables = []
for i in url:
    tables.append(pd.read_html("https://en.wikipedia.org" + i))

#shipwreck_df = pd.DataFrame(tables)

# df = tables[0][0]
# df.columns = ['ship','sunk_date','notes','coordinates']
# print(df.head())

df = tables[0][2]
#df.columns = ['ship','sunk_date','notes','coordinates']
#print(df.head())
#df = df.reindex(df.index.drop(0)).reset_index(drop=True)
df
print(df)

unpacklist = [x for table in tables for x in table]
new_unpacklist = unpacklist.remove(unpacklist[0])
new_df = pd.concat(unpacklist)
#new_df = pd.DataFrame(unpacklist)
#new_df.columns = ['ship','sunk_date','notes','coordinates']
#new_df= df.reindex(df.index.drop(0)).reset_index(drop=True)

ship_wreck_data = new_df.drop(columns = [4,5,6,7,8])
ship_wreck_data = ship_wreck_data.dropna()
ship_wreck_data.columns= ['ship','sunk_date','notes','coordinates']
#ship_wreck_data = df.reindex(df.index.drop(0)).reset_index(drop=True)


ship_wreck_data = ship_wreck_data.drop_duplicates()
ship_wreck_data = ship_wreck_data.drop([0])


# In[ ]:


ship_wreck_data = ship_wreck_data.reset_index(drop=True)
#test = ship_wreck_data['coordinates'].str.encode("utf-8")
#test  = test.str.decode("utf-8")
#test 

#ship_wreck_data['coordinates'] = test


# In[ ]:


true_coordinates = []
#ship_wreck_data1 = ship_wreck_data.drop([0,74])

for coordinate in ship_wreck_data['coordinates']:
    if coordinate.find('/')==-1:
        print(coordinate)
    else:
        latlong = coordinate.split('/')[1]
        new_latlong = latlong.replace("°","").strip()
        lat = new_latlong.split()[0]
        long = new_latlong.split()[1]
        lat = lat[1:]
    
        #print(lat[:len(lat)-2])
        if lat[len(lat)-1] == 'S':
            lat = 0-float(lat[:len(lat)-2])
           # print(lat)
        else:
            lat = lat.strip("N")
            #print(lat)
        if long[len(long)-1] == 'W':
            long = 0-float(long[:len(long)-2])
            #print(long)
        else:
            long = long.strip("E")
        #print(long)
    clean_coordinates = [lat,long]
    print(clean_coordinates)
    true_coordinates.append(clean_coordinates)


# In[ ]:


#convert coordinates into dataframe to clean data
true_coordinates_df = pd.DataFrame(true_coordinates)
true_coordinates_df.columns = ['Latitude', 'Longitude']

#drop duplicate values
true_coordinates_df =true_coordinates_df.drop_duplicates()

#convert true_coordinates_df to a list then into a series so both values will be in one column as coordinates
coordinate = true_coordinates_df.values.tolist()
coordinate_series = pd.Series(coordinate)

#append coordinate_series to coordinate column and drop Nan values
ship_wreck_df = ship_wreck_data
ship_wreck_df['coordinates'] = coordinate_series
ship_wreck_df =ship_wreck_df.dropna()
ship_wreck_df


# In[ ]:


#convert dataframe to json
import json
ship_wreck_json = ship_wreck_df.to_json(orient='records')
json_format = json.loads(ship_wreck_json)


# In[ ]:


import pymongo
#create mongo database
myclient = pymongo.MongoClient('mongodb://localhost:27017/')

db = myclient['ship_wreck_db']


# In[ ]:


json_data = db.shipwreckData
json_data.drop()
json_data.insert_many(json_format)


# In[ ]:


ship_wreck_df.loc[ship_wreck_df['ship'] == 'HMS Matabele']


# In[ ]:





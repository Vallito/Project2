#import libraries
from bs4 import BeautifulSoup as bs
import pandas as pd 
import numpy as np
import requests
from splinter import Browser

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

print(ship_wreck_data)
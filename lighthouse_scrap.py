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

print(len(tables))
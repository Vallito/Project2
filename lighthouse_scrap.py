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

#find desired data
for i in soup.find('ul').findAll('a'):
    print (i['href'])
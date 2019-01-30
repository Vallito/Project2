#import libraries
from bs4 import BeautifulSoup
import pandas as pd 
import numpy as np
import requests

website_url = requests.get("https://en.wikipedia.org/wiki/Lists_of_shipwrecks").text

soup = BeautifulSoup(website_url,'lxml')


for i in soup.find('div',{'class':'hatnote navigation-not-searchable'}).findAll('a'):
    print (i['href'])
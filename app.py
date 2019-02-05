from flask import Flask, render_template
from flask.json import jsonify
import json
import pymongo
from bson import json_util
from bson.json_util import dumps


app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.ship_wreck_db
LightHouses = db.lighthouses
ShipWrecks = db.shipwreckData 



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    # write a statement that finds all the items in the db and sets it to a variable
    lighthouses = list(LightHouses.find())
    # print(lighthouses)

    shipwreckData = list(ShipWrecks.find())
    print(f'ships: {shipwreckData}')
    # render an index.html template and pass it the data you retrieved from the database
    appData = []
    for data in lighthouses:
        # print(data)
        appData.append({'lighthouses':[data]})
    # for ships in shipwreckData:
    appData.append({'shipwrecks':shipwreckData})
    appData = json.dumps(appData, default=json_util.default)
    print(appData)
    return  appData


if __name__ == "__main__":
    app.run(debug=True)

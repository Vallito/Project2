import pymongo

# Setup connection to mongodb
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)



# Select database and collection to use
db = client.ship_wreck_db
LightHouses = db.lighthouses

#Drop old collections
LightHouses.drop()

LightHouses.insert_one(
    {"type": "FeatureCollection", "features": [{"type":"Feature","geometry":{"type":"Point","coordinates":[-75.528817,35.250533]},"properties":{"name":"Cape Hatteras Light","lat":35.250533,"lng":-75.528817,"location":"North Carolina USA","cartodb_id":1,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-75.90647,37.12292]},"properties":{"name":"Cape Charles Light","lat":37.12292,"lng":-75.90647,"location":"Virginia USA","cartodb_id":2,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-80.928017,29.080617]},"properties":{"name":"Ponce de Leon Inlet Light","lat":29.080617,"lng":-80.928017,"location":"Florida USA","cartodb_id":3,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-74.11083,39.751944]},"properties":{"name":"Barnegat Lighthouse","lat":39.751944,"lng":-74.11083,"location":"New Jersey USA","cartodb_id":4,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-76.536111,34.605278]},"properties":{"name":"Cape Lookout Lighthouse","lat":34.605278,"lng":-76.536111,"location":"North Carolina USA","cartodb_id":5,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-74.414167,40.63244]},"properties":{"name":"Absecon Light","lat":40.63244,"lng":-74.414167,"location":"New Jersey USA","cartodb_id":6,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.218583,40.632444]},"properties":{"name":"Fire Island Light","lat":40.632444,"lng":-73.218583,"location":"New York USA","cartodb_id":7,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-81.288611,29.885556]},"properties":{"name":"St. Augustine Light","year":1886,"lat":29.885556,"lng":-81.288611,"location":"Florida USA","cartodb_id":8,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-76.008333,36.925556]},"properties":{"name":"Cape Henry Light","lat":36.925556,"lng":-76.008333,"location":"Virginia USA","cartodb_id":9,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-75.010833,18.400278]},"properties":{"name":"Navassa Island Light","lat":18.400278,"lng":-75.010833,"location":"Navassa Island HT","cartodb_id":10,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.883611,32.695278]},"properties":{"name":"Morris Island Light","lat":32.695278,"lng":-79.883611,"location":"South Carolina USA","cartodb_id":11,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-75.830833,36.376667]},"properties":{"name":"Currituck Beach Light","lat":36.376667,"lng":-75.830833,"location":"North Carolina USA","cartodb_id":12,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-75.56351,35.81864]},"properties":{"name":"Bodie Island Lighthouse","lat":35.81864,"lng":-75.56351,"location":"North Carolina USA","cartodb_id":13,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-74.96034,38.93297]},"properties":{"name":"Cape May Light","lat":38.93297,"lng":-74.96034,"location":"New Jersey USA","cartodb_id":14,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-82.920544,24.633339]},"properties":{"name":"Dry Tortugas Light","lat":24.633339,"lng":-82.920544,"location":"Florida USA","cartodb_id":15,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-80.853578,32.022614]},"properties":{"name":"Tybee Island Light","lat":32.022614,"lng":-80.853578,"location":"Georgia USA","cartodb_id":16,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-80.54345,28.46035]},"properties":{"name":"Cape Canaveral Light","lat":28.46035,"lng":-80.54345,"location":"Florida USA","cartodb_id":17,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-87.308056,30.346389]},"properties":{"name":"Pensacola Light","year":1915,"lat":30.346389,"lng":-87.308056,"location":"Florida USA","cartodb_id":18,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-79.373611,33.018889]},"properties":{"name":"Cape Romain Lighthouses","lat":33.018889,"lng":-79.373611,"location":"South Carolina USA","cartodb_id":19,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-78.034377,33.892931]},"properties":{"name":"Oak Island Light","lat":33.892931,"lng":-78.034377,"location":"North Carolina USA","cartodb_id":20,"created_at":"2015-01-20T20:51:23Z","updated_at":"2015-01-20T20:51:23Z"}}]}

    
    )

print("Lighthouses Uploaded!")
# print(list(db.LightHouses.find()))

ShipWrecks = db.shipwreckData
#Drop old collections
ShipWrecks.drop()

ShipWrecks.insert_many(
    [{'ship': 'Globe Star',
  'sunk_date': '27 April 1973',
  'notes': 'A cargo ship that ran aground off Mombasa.[1]',
  'coordinates': [-4.081, '39.72']},
 {'ship': 'HMS Gulland',
  'sunk_date': '13 April 1951',
  'notes': 'A 545-ton Isles-class trawler built for World War II. It ran aground three miles (4.8\xa0km) north of Mombasa.',
  'coordinates': [-4.0472, '39.73250']}]
)

print("Shipwrecks Uploaded!")

print(list(ShipWrecks.find()))
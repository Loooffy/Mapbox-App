import json
import random

from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bus_locations = None

with open('./data/bus.geojson') as f:
    bus_locations = json.loads(f.read())

def genMarkers(latitude, longitude, amount):
    markerList = {
        'type': 'FeatureCollection',
        'features': []
    }
    for i in range(amount):
        randomLat = random.random() * i * pow(-1, i) * 0.0001
        randomLng = random.random() * i * pow(-1, i) * 0.0001
        latitude = latitude + randomLat
        longitude = longitude + randomLng
        markerList['features'].append(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [longitude, latitude],
            },
            'properties': {
              'name': str(i)
            }
          }
        )

    return markerList

def genStores():
    storeList = []
    randAmt = random.randint(1, 10)
    for i in range(randAmt):
        storeList.append({
            'name': '好吃水餃',
            'isOpen': '營業中',
            'distance': randAmt * 100,
            'priceRange': '100 ~ 500',
        })

    return storeList

@app.route("/background")
def getBackground():
    return json.dumps(bus_locations)

@app.route("/markers")
def getMarkers():
    latitude=float(request.args.get('latitude'))
    longitude=float(request.args.get('longitude'))
    amount=int(request.args.get('amount'))
    markerList = genMarkers(latitude, longitude, amount)
    return json.dumps(markerList)

@app.route("/stores")
def getStores():
    markerList = genStores()
    return json.dumps(markerList)

app.run(host='0.0.0.0', port=5000)

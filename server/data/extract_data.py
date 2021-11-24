import json
import ijson
from decimal import Decimal

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

data = None

i = 0
count = 0

geo_json = {
    "type":"FeatureCollection",
    "features":[]
}

feature = ijson.items

f = open('./taipei_taiwan.geojson')
features = ijson.items(f, 'features.item')
    
for feature in features:
    if feature['properties'].get('bus'):
        geo_json['features'].append(feature)

bus_locations = geo_json.get('features')

f.close()

with open('./bus.geojson', 'w') as output_file:
    json.dump(geo_json, output_file, ensure_ascii=False, default=default)

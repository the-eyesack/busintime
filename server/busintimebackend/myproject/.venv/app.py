from flask import Flask
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

# gets stops and stop names
@app.route("/<route>")
def bus_route(route):
    
    response = requests.get("https://bustime.mta.info/api/where/stops-for-route/MTA%20NYCT_" + route + ".json?key=2d71d639-6a7a-43b5-8132-4fc609bf5bec&includePolylines=false&version=2")
    if response.status_code != 200:
        return {"error": "Unable to retrieve bus route."}, 500
    data = json.loads(response.text);
    
    packet = {"route": route, "directions": [{"destination": data['data']['entry']['stopGroupings'][0]['stopGroups'][0]['name']['name'], "ids": data['data']['entry']['stopGroupings'][0]['stopGroups'][0]['stopIds'], "stops": {}},
                                             {"destination": data['data']['entry']['stopGroupings'][0]['stopGroups'][1]['name']['name'], "id": data['data']['entry']['stopGroupings'][0]['stopGroups'][1]['stopIds'], "stops": {}}]}

    # gets the name of each stop
    for dir in range(2):
        for i in data['data']['entry']['stopGroupings'][0]['stopGroups'][dir]['stopIds']:
            # print (i)
            for j in data['data']['references']['stops']:
                if i == j['id']:
                    packet['directions'][dir]['stops'][i] = j['name']
                    print (j['name'])

    return packet
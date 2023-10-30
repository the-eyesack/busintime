from flask import Flask
from flask_cors import CORS
import requests
import json
import os
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("MTA_KEY")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "192.168.1.161:3000"])

# gets stops and stop names
@app.route("/<route>")
def bus_route(route):
    
    response = requests.get("https://bustime.mta.info/api/where/stops-for-route/MTA%20NYCT_" + quote(route) + ".json?key=" + key + "&includePolylines=false&version=2")
    if response.status_code != 200:
        return {"error": "Unable to retrieve bus route."}, 500
    data = json.loads(response.text);
    packet = {"route": route, "directions": [{"destination": data['data']['entry']['stopGroupings'][0]['stopGroups'][0]['name']['name'], "ids": data['data']['entry']['stopGroupings'][0]['stopGroups'][0]['stopIds'], "stops": []},
                                             {"destination": data['data']['entry']['stopGroupings'][0]['stopGroups'][1]['name']['name'], "ids": data['data']['entry']['stopGroupings'][0]['stopGroups'][1]['stopIds'], "stops": []}], "currentStops": []}

    # gets the name of each stop
    for dir in range(2):
        for i in reversed(data['data']['entry']['stopGroupings'][0]['stopGroups'][dir]['stopIds']):
            # print (i)
            for j in data['data']['references']['stops']:
                if i == j['id']:
                    packet['directions'][dir]['stops'].append(j['name'])

    response2 = requests.get("http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?key=" + key +"&version=2&LineRef=MTA%20NYCT_" + route)
    if response2.status_code != 200:
        return {"error": "Unable to retrieve bus route."}, 500
    data2 = json.loads(response2.text);

    # gets the location of each bus
    currentStops = {0: [], 1: []}
    for bus in data2["Siri"]["ServiceDelivery"]["VehicleMonitoringDelivery"][0]["VehicleActivity"]:
        # print(bus)
        if(bus["MonitoredVehicleJourney"]["DirectionRef"]) == "0":
            currentStops[0].append(bus["MonitoredVehicleJourney"]["MonitoredCall"]["StopPointName"][0])
        else:
            currentStops[1].append(bus["MonitoredVehicleJourney"]["MonitoredCall"]["StopPointName"][0])
    packet["currentStops"] = currentStops

    return packet

@app.route("/<route>/<path:stop>")
def get_stop_info(stop, route):
    # can add a function that also gets the other routes at the stop
    response = requests.get('https://bustime.mta.info/api/siri/stop-monitoring.json?key=' + key + '&version=2&MonitoringRef=' + stop + '&LineRef=MTA%20NYCT_' + quote(route))
    if response.status_code != 200:
        return {"error": "Unable to retrieve bus route."}, 500
    data = json.loads(response.text);
    packet = {"route": route,
              "stop": stop,
              "buses": [],
              "stop_name": data["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"][0]["MonitoredVehicleJourney"]["MonitoredCall"]["StopPointName"][0]}
    for bus in data["Siri"]["ServiceDelivery"]["StopMonitoringDelivery"][0]["MonitoredStopVisit"]:
        # packet["buses"].append(bus["MonitoredVehicleJourney"]["MonitoredCall"]["ArrivalProximityText"])
        MonitoredCall = bus["MonitoredVehicleJourney"]["MonitoredCall"]
        print(MonitoredCall)
        obj = {"proximity": MonitoredCall["ArrivalProximityText"], "route": bus["MonitoredVehicleJourney"]["LineRef"], "arrival_time": MonitoredCall.get("ExpectedArrivalTime")}
        if "Extensions" in MonitoredCall:
            obj["passengers"] = MonitoredCall["Extensions"]["Capacities"]["EstimatedPassengerCount"]
        else:
            obj["passengers"] = None
        packet["buses"].append(obj)

    
    return packet
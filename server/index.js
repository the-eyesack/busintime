require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {response} = require("express");
const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.get('/route/:routeName', cors(corsOptions), function (req, res, next) {
    let masterData = {}
    masterData = {0: {buses : []}, 1: {buses : []}, serviceAlert: [], stops: [[],[]]}
    const routeName = req.params.routeName.toUpperCase().replace('SBS', '+').replace(' ', '')
    console.log(routeName)
    fetch('http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?key=' + process.env.MTA_KEY + '&LineRef=' + encodeURIComponent(routeName)) 
    .then(response => {
        return response.json()
    })
    .then(data => {

        // check for valid bus route
        if(data.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].ErrorCondition) {
            res.status(404)
            next(new Error('Invalid bus route.'))
            res.send('Error: Invalid Bus Route')
            next(server.close(() => {console.log('Server closed due to invalid bus route.')}))
        } else

        // //check for service error
        if(data.Siri.ServiceDelivery.SituationExchangeDelivery) {
            masterData.serviceAlert = data.Siri.ServiceDelivery.SituationExchangeDelivery[0].Situations.PtSituationElement
        }

        masterData.routeName = routeName
        //get buses respective to direction
        const busData = data.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity
        for(let bus in busData) {
            // console.log(busData[bus].MonitoredVehicleJourney.DirectionRef)
            switch (busData[bus].MonitoredVehicleJourney.DirectionRef) {
                case '0': {
                    masterData[0].buses.push({busCode : busData[bus].MonitoredVehicleJourney.VehicleRef,
                        currentStop : busData[bus].MonitoredVehicleJourney.MonitoredCall.StopPointName})
                    if(!masterData[0].destination) {
                        masterData[0].destination = busData[bus].MonitoredVehicleJourney.DestinationName
                    }
                    break;
                }
                case '1': {
                    masterData[1].buses.push({busCode : busData[bus].MonitoredVehicleJourney.VehicleRef,
                        currentStop : busData[bus].MonitoredVehicleJourney.MonitoredCall.StopPointName})
                    if(!masterData[1].destination) {
                        masterData[1].destination = busData[bus].MonitoredVehicleJourney.DestinationName
                    }
                    break;
                }

            }
        }

    })
    .then(() => {
        fetch(`https://bustime.mta.info/api/where/stops-for-route/MTA%20NYCT_${routeName}.json?key=${process.env.MTA_KEY}&includePolylines=false&version=2`)
            .then(response => {
                if (!response.ok) {
                    switch(response.status) {
                        case 400:
                        case 401:
                        case 404:
                        case 500: {
                            res.send('Error: ' + response.status)
                            break;
                        }
                    }
                }
                return response.json()}
            )
            .then(data => {
                function getStopName(stopId) {
                    return data.data.references.stops.find(s => s.id === stopId).name
                }
                masterData.stops[0] = data.data.entry.stopGroupings[0].stopGroups[0].stopIds.map(stop => getStopName(stop))
                masterData.stops[1] = data.data.entry.stopGroupings[0].stopGroups[1].stopIds.map(stop => getStopName(stop))
            })
            .then(() => res.send(masterData))

        }
    )
})


const server = app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`))
// console.log(process.env.MTA_KEY)
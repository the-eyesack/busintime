'use client'

import {useState} from "react";
import BusDataDisplay from "@/app/components/busDataDisplay";
import ServiceAlert from "@/app/components/serviceAlert";
export default function BusForm() {

    const [busName, setBusName] = useState('') //for form
    const [busData, setBusData] = useState({}) //for api response
    const [validRoute, setValidRoute] = useState(false)
    const [serviceAlert, setServiceAlert] = useState(false)
    const [serviceData, setServiceData] = useState([])
    async function handleSubmit(e) {
        e.preventDefault()
        setServiceAlert(false)
        setValidRoute(false)
        function checkForSBS(bus) {
            switch(true) {
                case bus.includes('SBS'): return bus.replace('SBS', '').replace('-', '').replace(' ', '') + '+';
                default: return bus
            }
        }

        let data = {};

        fetch('/vehicleMonitoring?key=2d71d639-6a7a-43b5-8132-4fc609bf5bec&LineRef=MTA%20NYCT_' + encodeURIComponent(checkForSBS(busName)))
            .then(response => {
                if (!response.ok) {
                    switch(response.status) {
                        case 400:
                        case 401:
                        case 404:
                        case 500: {
                            alert(response.status)
                            break;
                        }
                    }
                }
                return response.json()
            })
            .then(data => {
                // console.log(data)
                setBusData((data['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]))

                console.log(data['Siri']['ServiceDelivery'])

                //check for errors
                const error = data['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['ErrorCondition']

                if (error) {
                    console.log(error)
                    alert('Something went wrong! Please check the bus route and try again. If you are trying to find an SBS bus, add SBS to the end of the route name.')
                } else {
                    setValidRoute(true)

                    if(data['Siri']['ServiceDelivery']['SituationExchangeDelivery']) {
                        // console.log(data['Siri']['ServiceDelivery']['SituationExchangeDelivery'])
                        setServiceData(data['Siri']['ServiceDelivery']['SituationExchangeDelivery'])
                        setServiceAlert(true)
                    }
                }
            }
            )}



    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="busName">Bus Name</label>
                <input className={"border-2"} value={busName.toUpperCase()} onChange={(e)=> {setBusName(e.target.value)}}/>
                <button>Search</button>
            </form>
            <div>
                {validRoute ? <BusDataDisplay route={busName} data={busData['VehicleActivity']}/> : <p>Enter a bus route to see its location!</p>}
                {/*TODO: fix this*/}
                {serviceAlert ? <ServiceAlert alerts={serviceData} /> : <p>No service alerts at this time.</p>}
            </div>
        </section>

    )
}
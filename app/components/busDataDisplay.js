import TESTbusRoutes from "@/app/test/TESTbusroutes";
import {useEffect} from "react";

export default function BusDataDisplay(props) {

    //to proper case
    String.prototype.toProperCase = function()
    {
        return this.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
    }

    async function fetchData() {
        await fetch('/stopInformation/MTA NYCT_'+ props.route + '.json?key=2d71d639-6a7a-43b5-8132-4fc609bf5bec&includePolylines=false&version=2')
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
    }

    console.log(fetchData())

    let destination1 = []
    for(let bus in props.data) {
        // console.log(props.data[bus]['MonitoredVehicleJourney'])
        destination1.push(props.data[bus]['MonitoredVehicleJourney']['DestinationName'])
    }
    let destination2 = destination1.sort()[destination1.length - 1]
    destination1 = destination1.sort()[0]
    console.log(destination1, " ---------- ", destination2)

    let [dest1buses, dest2buses] = [[], []]
    let couldNotFindBus = false;
    for(let bus in props.data) {
        if(props.data[bus]['MonitoredVehicleJourney']['MonitoredCall']) {
            switch (props.data[bus]['MonitoredVehicleJourney']['DestinationName']) {
                case destination1:
                    dest1buses.push(<p key={bus}
                                       className={"text-pink-600"}>{props.data[bus]['MonitoredVehicleJourney']['MonitoredCall']['StopPointName'].toProperCase()}</p>)
                    break;
                case destination2:
                    dest2buses.push(<p key={bus}
                                       className={"text-blue-600"}>{props.data[bus]['MonitoredVehicleJourney']['MonitoredCall']['StopPointName'].toProperCase()}</p>)
                    break;
            }
        } else couldNotFindBus = true;
    }

    if(couldNotFindBus) {
        alert('One or more buses could not be located. Please try again. We apologize for the inconvenience.')
    }



    return (
        <div>
            {/*<TESTbusRoutes/>*/}
            <table>
                <tbody>
                <tr className={"flex border-2 justify-evenly"}>
                    <td>{destination1.toProperCase()}</td>
                    <td>{destination2.toProperCase()}</td>
                </tr>
                </tbody>
                <tbody>
                <tr className={"flex border-2"}>
                    <td>{dest1buses.map((el)=> {return el})}</td>
                    <td className={"flex flex-col"}>{dest2buses.map((el)=> {return el})}</td>
                </tr>
                </tbody>

            </table>
        </div>
    )
}
'use client'

import {useState} from "react";
import BusDataDisplay from "@/app/components/busDataDisplay";
import ServiceAlert from "@/app/components/serviceAlert";
export default function BusForm() {

    const [busName, setBusName] = useState('') //for form

    const [data, setData] = useState({})
    const [routeName, setRouteName] = useState('');
    const [stops, setStops] = useState([[],[]])
    const [destinations, setDestinations] = useState([])
    const [buses, setBuses] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await fetch(`http://localhost:3001/route/${busName}`)
                .then(async response => {
                    if(!response.ok) {
                        switch (response.status) {
                            case 400:
                            case 401:
                            case 404:
                            case 500: {
                                alert(response.status)
                                break;
                            }
                        }
                    return;
                    }
                    const d = await response.json()
                    setData(d)
                    setRouteName(d.routeName)
                    setStops(d.stops)
                    setDestinations([d[0].destination, d[1].destination])
                    setBuses([d[0].buses, d[1].buses])

                })
        } catch (e) {
            console.log(e)
        }


    }

    return (
        <section className={'m-4'}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="busName"></label>
                <input placeholder={'Search for a bus here...'} className={"border-2 p-2 rounded-md"} value={busName.toUpperCase()} onChange={(e)=> {setBusName(e.target.value)}}/>
                <button className={'border-2 rounded-md p-2 mx-2'}>Search</button>
            </form>

            <BusDataDisplay routeName={routeName} stops={stops} data={data} destinations={destinations} buses={buses}/>
        </section>

    )
}
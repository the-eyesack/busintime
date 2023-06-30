'use client'

import {useState} from "react";

export default function BusForm() {

    const [busName, setBusName] = useState('')
    let busData
    async function handleSubmit(e) {
        e.preventDefault()

        const response =await fetch(`/api?key=2d71d639-6a7a-43b5-8132-4fc609bf5bec&LineRef=MTA%20NYCT_${busName}`)
        const data = await response.json()
        busData = data
        console.log(busData['Siri']['ServiceDelivery'])
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="busName">Bus Name</label>
                <input className={"border-2"} value={busName} onChange={(e)=> {setBusName(e.target.value)}}/>
                <button>Search</button>
            </form>
            <div>

            </div>
        </section>

    )
}
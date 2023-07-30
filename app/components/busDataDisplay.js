import {useEffect, useState} from "react";

export default function BusDataDisplay(props) {
    useEffect(() => {
        const busList = props.buses.flat(Infinity)
        for (let bus in busList) {
            document.getElementById(busList[bus].currentStop).style.backgroundColor = 'green'
        }

    }, [props.buses]);


    return (
        <div>
            <h1 className={'font-display'}>{props.routeName}</h1>

            <div className={'flex flex-col md:flex-row justify-between'}>
            {props.stops.map((dir, index) => {
                return <div key={`div+${index}`}>
                    <h2>{props.destinations[index]}</h2>
                    <ul key={'direction'+index}>
                        {dir.map((stop, index) => {
                            return <li key={`${stop}+${index}`} id={stop}>{stop}</li>
                        })}
                    </ul>
                </div>
            })}
            </div>
        </div>
    )
}
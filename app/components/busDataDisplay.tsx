import {useEffect, useState} from "react";

export default function BusDataDisplay(props) {

    console.log(props.busData)
    const [busData, setBusData] = useState(props.busData)
    return (
        <div>
            <h1 className={'font-display'}>{props.busData.route}</h1>
            <ul>
                {busData.directions[0].map((bus:string, index:number) => {return <li key={index}>{bus}</li>})}
            </ul>
        </div>
    )
}
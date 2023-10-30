'use client'
import {useEffect, useState} from 'react';
import moment from 'moment'
import Loading from '../../components/loading';

export default function BusStop({params}:{params: {route: string, busStop: string}}) {
	const [loading, setLoading] = useState<boolean>(true)
  	const id = params.busStop.replace('MTA_', '')
	const [stopName, setStopName] = useState<string>()
	const [buses, setBuses] = useState([])
	useEffect(() => {
		fetch(`http://localhost:5000/${params.route}/${id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setStopName(data['stop_name'])
				setBuses(data['buses'])
			})
			.then(() => setLoading(false))
			.catch(err => console.log(err))
	}, []);

	return (
	<div>
	  <h1 className={'inline-block'}>{params.route}</h1> {stopName}
		<h2>Stop Code <span className={'text-red-500'}>{id}</span></h2>
		<ul>
			{loading ? <Loading/> : buses.map((bus, i) => {
				if(moment(bus['arrival_time']).format() !== 'Invalid date') return <li className={'border-2 flex flex-col w-40 text-center'} key={i}>
					<span>{bus['proximity']}</span>
					<p>{moment().to(bus['arrival_time'])} ({moment(bus['arrival_time']).format('h:mm a')})</p>
				</li>
			})}
		</ul>
	</div>
  )
}
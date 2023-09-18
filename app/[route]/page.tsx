'use client'
import {useEffect, useState} from 'react';

export default function BusDataDisplay({params}: {params: {route: string}}, props) {

	const [dir1, setDir1] = useState([])
	const [dir2, setDir2] = useState([])

	const [destination1, setDestination1] = useState<string>('')
	const [destination2, setDestination2] = useState<string>('')


	useEffect(() => {
		fetch(`http://localhost:5000/${params.route}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setDir1(data.directions[0].stops)
				setDir2(data.directions[1].stops)
				setDestination1(data.directions[0].destination)
				setDestination2(data.directions[1].destination)

			})
	}, []);


	return (
		<div>
			<h1 className={'font-display'}>{params.route}</h1>
			<h2>{destination1}</h2>
			<ul>
				{dir1.map((stop, i) => {return <li>{stop}</li>})}
			</ul>

			<h2>{destination2}</h2>
			<ul>
				{dir2.map((stop, i) => {return <li>{stop}</li>})}
			</ul>
		</div>
	)
}
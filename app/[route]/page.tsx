'use client'
import {useEffect, useState} from 'react';
import StopListing from '../components/StopListing';
import Loading from '../components/loading';
import BusForm from '../components/busForm';
import RouteDisplay from '../components/RouteDisplay';

export default function BusDataDisplay({params}: {params: {route: string}}, props) {

	const [loading, setLoading] = useState<boolean>(true)

	const [stops, setStops] = useState([])
	const [ids, setIds] = useState([])

	const [destinations, setDestinations] = useState<string[]>([])
	const [currentStops, setCurrentStops] = useState({})

	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const [activatedDestination, setActivatedDestination] = useState<number>(0) //true=0, false=1

	useEffect(() => {
		fetch(`http://localhost:5000/${params.route.toUpperCase()}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if(data.error) setErrorMessage(data.error)
				setCurrentStops(data.currentStops)
				setStops([data.directions[0].stops, data.directions[1].stops])
				setIds([data.directions[0].ids, data.directions[1].ids])

				setDestinations([data.directions[0].destination, data.directions[1].destination])

			})
			.then(() => setLoading(false))
			.catch(err => {
				setError(true);
				setLoading(false);
			})
	}, []);

	function changeActivated(bool) {
		const selectedProperties = ['text-xl', 'font-bold', 'transition-all', 'delay-75']
		switch (bool) {
			case true: {
				setActivatedDestination(0);
				document.getElementById('dest1').classList.add(...selectedProperties)
				document.getElementById('dest2').classList.remove(...selectedProperties)
				break
			}
			case false: {
				setActivatedDestination(1);
				document.getElementById('dest2').classList.add(...selectedProperties)
				document.getElementById('dest1').classList.remove(...selectedProperties)
				break
			}
		}
	}

	useEffect(() => {
		changeActivated(true)
	}, []);

	return (
		<section>
			<div className={'flex flex-col mb-4'}>
				<div className={'flex w-min'}>
					<h1 className={'font-display inline-block'}>{params.route.replace('%2B', '+')}</h1>
					<BusForm/>
				</div>
				<div className={'flex justify-center flex-col border-b-2 pb-2 transition-all'}>
					<button id={'dest1'} onClick={()=>changeActivated(true)}>{destinations[0]}</button>
					<button id={'dest2'} onClick={()=>changeActivated(false)}>{destinations[1]}</button>
				</div>


			</div>
			{error ? <p>{errorMessage}</p> : <div className={'flex justify-evenly'}>
				<div className={'flex flex-col gap-y-10 lg:flex-row'}>

					{loading ? <Loading/> : <RouteDisplay key={activatedDestination} destination={destinations[activatedDestination]} dir={stops[activatedDestination]} currentStops={currentStops} i={activatedDestination}
														  route={params.route} ids={ids}/>}

				</div>

			</div>}



		</section>
	)
}
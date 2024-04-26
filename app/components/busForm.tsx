'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



import {useState} from "react";
import BusDataDisplay from "./busDataDisplay";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import ServiceAlert from "";
export default function BusForm() {
	const [busName, setBusName] = useState('') //for form

	function translateSBS(route) {
		if(route == "") {return 'M1'}
		return route.replace(' ', '').replace('SBS', '%2B').toUpperCase()
	}

	return (
		<section className={'mx-4 inline-block'}>
			<form action={`/${(translateSBS(busName))}`} className={'flex'}>
				<label htmlFor="busName"></label>
				<input placeholder={'Search for a bus here...'} className={"border-2 p-2 rounded-md w-48"} value={busName.toUpperCase()} onChange={(e)=> {setBusName(translateSBS(e.target.value))}}/>
				<button className={'border-2 rounded-md p-2 mx-2'}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
			</form>

		</section>

	)
}
'use client'

import {useState} from "react";
import BusDataDisplay from "./busDataDisplay";
// import ServiceAlert from "";
export default function BusForm() {

	const [busName, setBusName] = useState('') //for form

	const [data, setData] = useState({})

	return (
		<section className={'m-4'}>
			<form>
				<label htmlFor="busName"></label>
				<input placeholder={'Search for a bus here...'} className={"border-2 p-2 rounded-md"} value={busName.toUpperCase()} onChange={(e)=> {setBusName(e.target.value)}}/>
				<a className={'border-2 rounded-md p-2 mx-2'} href={`/${busName}`}>Search</a>
			</form>

		</section>

	)
}
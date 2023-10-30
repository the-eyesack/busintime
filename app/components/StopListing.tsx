import {useEffect} from 'react';

export default function StopListing(props) {
	return (
		<a key={props.index} href={props.href} className={`block ${props.mods}`}>{props.stop}</a>
	)
}
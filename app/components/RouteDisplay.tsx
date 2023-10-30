import StopListing from './StopListing';
import {useState} from 'react';

export default function RouteDisplay(props) {
	const [one, setOne] = useState(true);
	const [two, setTwo] = useState(false);

	return <div>
		<div className={'flex flex-col gap-y-2'}>
			{props.dir.map((stop : string, index : number) => {
				if (props.currentStops[props.i].includes(stop)) {
					return 	<StopListing key={index} mods={'bg-red-400'} href={`/${props.route}/${props.ids[props.i][index]}`} stop={stop}/>
				} else return <StopListing key={index} href={`/${props.route}/${props.ids[props.i][index]}`} stop={stop}/>
			})}
		</div>
	</div>
}

export default function BusStop({params}:{params: {busStop: string}}) {
  return (
	<div>
	  <h1>Bus Stop: {params.busStop}</h1>
	</div>
  )
}
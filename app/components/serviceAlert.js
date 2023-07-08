//doesnt work rn lol
export default function ServiceAlert(props) {
    props.alerts.map((alert, i) => {
        return (
            <div key={i} className={"rounded-md"}>
                <h2>Service Alert</h2>
                {alert['Situations']['PtSituationElement'][0]['Severity'] !== "undefined" ? <p>{alert['Situations']['PtSituationElement'][0]['Severity']}</p> : <p>Severity: Unknown</p>}
                <p>{alert['Situations']['PtSituationElement'][0]["Summary"]}</p>
            </div>
        )
    })
}
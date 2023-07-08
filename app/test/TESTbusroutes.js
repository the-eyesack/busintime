import {useEffect} from "react";

export default function TESTbusRoutes(props) {

    useEffect(() => {
            fetch('/stopInformation/MTA NYCT_Q28.json?key=2d71d639-6a7a-43b5-8132-4fc609bf5bec&includePolylines=false&version=2')
                .then(response => {
                    if (!response.ok) {
                        switch(response.status) {
                            case 400:
                            case 401:
                            case 404:
                            case 500: {
                                alert(response.status)
                                break;
                            }
                        }
                    }
                    console.log(response.json())
                    return response.json()
        })
    }, []);


    return (
        <div>TESTbusRoutes</div>
    )
}
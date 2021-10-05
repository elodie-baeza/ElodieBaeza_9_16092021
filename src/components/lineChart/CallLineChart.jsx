import React, {useState, useEffect} from 'react'
import API from 'data/API';
import LineChart from './LineChart';

export default function CallGroupedBarChart(props) {
    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        API.getSessionDuration(props.userId)
            .then((response) => {
                // console.log(response.data.data.sessions)
                setSessions(response.data.data.sessions)
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });        
    }, [props.userId]);

    if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div>Erreur</div>;
    } else {
        return (
            <LineChart data={sessions} />
        );
    }
}
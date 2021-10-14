import React, {useState, useEffect} from 'react'
import apiProvider from 'data/apiProvider';
import LineChart from './LineChart';
import PropTypes from 'prop-types';
/**
 * Perform a user average-sessions request to API and display line bar chart with data response
 * 
 * @component
 */
function CallLineChart(props) {
    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        apiProvider.getSessionDuration(props.userId)
            .then((response) => {
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
        return <div>Erreur get average-sessions</div>;
    } else {
        return (
            <LineChart data={sessions} />
        );
    }
}

CallLineChart.propTypes = {
    /**
     * userId is an integer
     */
    userId: PropTypes.number.isRequired
};

export default CallLineChart

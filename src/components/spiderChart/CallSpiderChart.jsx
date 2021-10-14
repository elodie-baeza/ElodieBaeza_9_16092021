import React, {useState, useEffect} from 'react'
import apiProvider from 'data/apiProvider';
import SpiderChart from './SpiderChart';
import PropTypes from 'prop-types';
import formatData from 'data/formatData';

/**
 * Perform a user performance request to API and display spider bar chart with data response
 * 
 * @component 
 */
function CallSpiderChart(props) {
    const [performance, setPerformance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        apiProvider.getSessionIntensity(props.userId)
            .then((response) => {
                setPerformance(formatData.formatUserPerformance(response.data.data))
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
        return <div>Erreur get performance</div>;
    } else {
        return (
            <SpiderChart data={performance} />
        );
    }
}

CallSpiderChart.propTypes = {
    /**
     * userId is an integer
     */
    userId: PropTypes.number.isRequired
};

export default CallSpiderChart

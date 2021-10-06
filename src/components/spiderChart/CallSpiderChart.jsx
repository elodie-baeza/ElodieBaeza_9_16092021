import React, {useState, useEffect} from 'react'
import API from 'data/API';
import SpiderChart from './SpiderChart';
import PropTypes from 'prop-types';

export default function CallSpiderChart(props) {
    const [performance, setPerformance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        API.getSessionIntensity(props.userId)
            .then((response) => {
                // console.log(response.data.data)
                setPerformance(response.data.data)
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
            <SpiderChart data={performance} />
        );
    }
}

CallSpiderChart.propTypes = {

    userId: PropTypes.number.isRequired

};
  
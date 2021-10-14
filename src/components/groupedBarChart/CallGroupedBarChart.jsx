import React, {useState, useEffect} from 'react'
import apiProvider from 'data/apiProvider';
import GroupedBarChart from './GroupedBarChart';
import PropTypes from 'prop-types';
/**
 * Perform a user activity request to API and display grouped bar chart with data response
 * 
 * @component
 */
function CallGroupedBarChart(props) {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        apiProvider.getActivity(props.userId)
            .then((response) => {
                setActivity(response.data.data.sessions)
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
        return <div>Erreur get activity</div>;
    } else {
        return (
            <GroupedBarChart data={activity} />
        );
    }
}

CallGroupedBarChart.propTypes = {
    /**
     * userId is an integer
     */
    userId: PropTypes.number.isRequired
};

export default CallGroupedBarChart

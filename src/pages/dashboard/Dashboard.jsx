import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'
import CallGroupedBarChart from 'components/groupedBarChart/CallGroupedBarChart'
import CallLineChart from 'components/lineChart/CallLineChart'
import CallSpiderChart from 'components/spiderChart/CallSpiderChart'
import DonutChart from 'components/donutChart/DonutChart'
import API from 'data/API'
import formatData from 'data/formatData'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

/**
 * Perform user main data request to API and display user dashboard with data response
 * @component
 */
function Dashboard(){
    const [userSelect, setUserSelect] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let { id } = useParams()

    useEffect(() => {
        id === undefined && API.getUserById(userSelect)
            .then((response) => {
                setUserSelect(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
        id !== undefined && API.getUserById(id)
            .then((response) => {
                setUserSelect(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div>Erreur</div>;
    } else {
        return(
            <main className='dashboard'>
                <DashboardHeader name={userSelect.userInfos.firstName}/>
                <section className='chartsContainer'>
                    <CallGroupedBarChart userId={userSelect.id}/>
                    <CallLineChart userId={userSelect.id}/>
                    <CallSpiderChart userId={userSelect.id}/>
                    <DonutChart value={userSelect.score*100}/>
                </section>
                <section className='userMainData'>
                    <CardInfos value={formatData.calTokCal(userSelect.keyData.calorieCount)} type='Calories' unit='kCal'/>
                    <CardInfos value={userSelect.keyData.proteinCount} type='Proteines' unit='g'/>
                    <CardInfos value={userSelect.keyData.carbohydrateCount} type='Glucides' unit='g'/>
                    <CardInfos value={userSelect.keyData.lipidCount} type='Lipides' unit='g'/>
                </section>
            </main>
        )
    }
}

export default Dashboard

import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'
import CallGroupedBarChart from 'components/groupedBarChart/CallGroupedBarChart'
import LineChart from 'components/lineChart/LineChart'
import SpiderChart from 'components/spiderChart/SpiderChart'
import DonutChart from 'components/donutChart/DonutChart'
import data from 'data/data.js'
import API from 'data/API'
import formatData from 'data/formatData'

export default function Dashboard(){
    const [userSelect, setUserSelect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getInitialUser()
            .then((response) => {
                console.log(response.data.data)
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
                    <LineChart data={data.USER_AVERAGE_SESSIONS[0].sessions} x={'day'} y={'sessionLength'}/>
                    <SpiderChart data={data.USER_PERFORMANCE[0]}/>
                    <DonutChart data={userSelect.todayScore*100}/>
                </section>
                <section className='userMainData'>
                    <CardInfos data={formatData.calTokCal(userSelect.keyData.calorieCount)} type='Calories' unit='kCal'/>
                    <CardInfos data={userSelect.keyData.proteinCount} type='Proteines' unit='g'/>
                    <CardInfos data={userSelect.keyData.carbohydrateCount} type='Glucides' unit='g'/>
                    <CardInfos data={userSelect.keyData.lipidCount} type='Lipides' unit='g'/>
                </section>
            </main>
        )
    }
}
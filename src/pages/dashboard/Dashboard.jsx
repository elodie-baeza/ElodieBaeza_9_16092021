import React from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'
import GroupedBarChart from 'components/groupedBarChart/GroupedBarChart'
import LineChart from 'components/lineChart/LineChart'
import RadarChart from 'components/radarChart/RadarChart'
import DonutChart from 'components/donutChart/DonutChart'
import data from 'data/data.js'


export default function Dashboard(){
    return(
        <main className='dashboard'>
            <DashboardHeader name='Thomas'/>
            <section>
                <GroupedBarChart data={data.USER_ACTIVITY[0].sessions}/>
                <LineChart data={data.USER_AVERAGE_SESSIONS[0].sessions} x={'day'} y={'sessionLength'}/>
                <RadarChart data={data.USER_PERFORMANCE[0]}/>
                <DonutChart data={data.USER_MAIN_DATA[0].todayScore}/>
                <article>
                    <CardInfos data='1,930' type='Calories' unit='kCal'/>
                    <CardInfos data='155' type='Proteines' unit='g'/>
                    <CardInfos data='290' type='Glucides' unit='g'/>
                    <CardInfos data='50' type='Lipides' unit='g'/>
                </article>
            </section>
        </main>
    )
}
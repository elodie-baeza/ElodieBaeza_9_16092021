import React from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'
import GroupedBarChart from 'components/groupedBarChart/GroupedBarChart'
import DurationChart from 'components/durationChart/DurationChart'
import TypeActivityChart from 'components/typeActivityChart/TypeActivityChart'
import ScoreChart from 'components/scoreChart/ScoreChart'

const USER_ACTIVITY = [
    {
        day: '2020-07-01',
        kilogram: 80,
        calories: 240
    },
    {
        day: '2020-07-02',
        kilogram: 80,
        calories: 220
    },
    {
        day: '2020-07-03',
        kilogram: 81,
        calories: 280
    },
    {
        day: '2020-07-04',
        kilogram: 81,
        calories: 290
    },
    {
        day: '2020-07-05',
        kilogram: 80,
        calories: 160
    },
    {
        day: '2020-07-06',
        kilogram: 78,
        calories: 162
    },
    {
        day: '2020-07-07',
        kilogram: 76,
        calories: 390
    }
]


export default function Dashboard(){
    return(
        <main className='dashboard'>
            <DashboardHeader name='Thomas'/>
            <section>
                <GroupedBarChart data={USER_ACTIVITY}/>
                <DurationChart />
                <TypeActivityChart />
                <ScoreChart />
                <CardInfos data='1,930' type='Calories' unit='kCal'/>
                <CardInfos data='155' type='Proteines' unit='g'/>
                <CardInfos data='290' type='Glucides' unit='g'/>
                <CardInfos data='50' type='Lipides' unit='g'/>
            </section>
        </main>
    )
}
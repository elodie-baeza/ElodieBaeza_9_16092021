import React from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'

export default function Dashboard(){
    return(
        <main className='dashboard'>
            <DashboardHeader name='Thomas'/>
            <section>
                {/* <BarChart /> */}
                {/* <LineChart /> */}
                {/* <RadarChart /> */}
                {/* <DonutChart /> */}
                <CardInfos data='1,930' type='Calories' unit='kCal'/>
                <CardInfos data='155' type='Proteines' unit='g'/>
                <CardInfos data='290' type='Glucides' unit='g'/>
                <CardInfos data='50' type='Lipides' unit='g'/>
            </section>
        </main>
    )
}
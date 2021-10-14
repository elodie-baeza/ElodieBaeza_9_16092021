import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import DashboardHeader from 'components/dashboardHeader/DashboardHeader'
import CardInfos from 'components/cardInfos/CardInfos'
import CallGroupedBarChart from 'components/groupedBarChart/CallGroupedBarChart'
import CallLineChart from 'components/lineChart/CallLineChart'
import CallSpiderChart from 'components/spiderChart/CallSpiderChart'
import DonutChart from 'components/donutChart/DonutChart'
import apiProvider from 'data/apiProvider'
import { useParams } from 'react-router-dom'

/**
 * Perform user main data request to API and display user dashboard with data response
 * @component
 */
function Dashboard(){
    const [userSelect, setUserSelect] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let { id } = useParams()

    useEffect(() => {
        // call API user 12 par défault avec path '/'
        id === undefined && apiProvider.getUserById(12)
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
        //  call API avec récupération de id dans url si path '/user/18' 
        id !== undefined && apiProvider.getUserById(id)
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
    }, [id]);

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
                    <CardInfos 
                        value={userSelect.keyData.calorieCount/1000}
                        type='Calories'
                        unit='kCal'
                    />
                    <CardInfos 
                        value={userSelect.keyData.proteinCount} 
                        type='Proteines' 
                        unit='g'
                    />
                    <CardInfos 
                        value={userSelect.keyData.carbohydrateCount} 
                        type='Glucides' 
                        unit='g'
                    />
                    <CardInfos 
                        value={userSelect.keyData.lipidCount} 
                        type='Lipides' 
                        unit='g'
                    />
                </section>
            </main>
        )
    }
}

export default Dashboard

import React from 'react'
import './DashboardHeader.css'

export default function DashboardHeader(props){
    return(
        <header className='hello'>
            <h2>Bonjour <span className='name'>{props.name}</span></h2>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </header>
    )
}
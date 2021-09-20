import React from 'react'
import './Hello.css'

export default function Hello(props){
    return(
        <header className='hello'>
            <h2>Bonjour <span className='name'>{props.name}</span></h2>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </header>
    )
}
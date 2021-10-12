import React from 'react'
import './DashboardHeader.css'
import PropTypes from 'prop-types'

/**
 * Display user name in message on top of dashboard
 * 
 * @component
 */
function DashboardHeader(props){
    return(
        <header className='hello'>
            <h2>Bonjour <span className='name'>{props.name}</span></h2>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </header>
    )
}

DashboardHeader.propTypes = {
    /**
     * name of user
     */
    name: PropTypes.string.isRequired
}

export default DashboardHeader
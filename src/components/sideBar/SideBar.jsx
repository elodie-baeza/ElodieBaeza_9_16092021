import yogaIcon from 'assets/icon_yoga.png'
import swimIcon from 'assets/icon_swim.png'
import bikeIcon from 'assets/icon_bike.png'
import fitIcon from 'assets/icon_fit.png'
import React from 'react'
import './SideBar.css'

/**
 * @component
 * @return transversal side bar with nav link
 */
function SideBar(){
    return(
        <nav className='sideBar'>
            <ul>
                <li>
                    <a href="*">
                        <img className='yogaIcon' src={yogaIcon} alt="logo" />
                    </a>
                </li>
                <li>
                    <a href="*">
                        <img className='swimIcon' src={swimIcon} alt="logo" />
                    </a>
                </li>
                <li>
                    <a href="*">
                        <img className='bikeIcon' src={bikeIcon} alt="logo" />
                    </a>
                </li>
                <li>
                    <a href="*">
                        <img className='fitIcon' src={fitIcon} alt="logo" />
                    </a>
                </li>
            </ul>
            <p>Copiryght, SportSee {new Date().getFullYear()}</p>
        </nav>
    )
}

export default SideBar
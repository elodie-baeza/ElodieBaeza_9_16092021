import yogaIcon from 'assets/icon_yoga.png'
import swimIcon from 'assets/icon_swim.png'
import bikeIcon from 'assets/icon_bike.png'
import fitIcon from 'assets/icon_fit.png'
import React from 'react'
import './TransNav.css'

export default function TransNav(){
    return(
        <nav className='transNav'>
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
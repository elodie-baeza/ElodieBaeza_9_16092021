import logo from 'assets/logo.png'
import logoTitle from 'assets/logo_title.png'
import React from 'react'
import './Header.css'
/**
 * Return header page
 * 
 * @component
 */
function Header(){
    return(
        <header className='headerNav'>
            <a href="*" className='logo'>
                <img className='logoIcon' src={logo} alt="logo" />
                <img src={logoTitle} alt="logo" />
            </a>
            <nav>
                <a href="*">Accueil</a>
                <a href="*">Profil</a>
                <a href="*">Réglage</a>
                <a href="*">Communauté</a>
            </nav>
        </header>
    )
}

export default Header
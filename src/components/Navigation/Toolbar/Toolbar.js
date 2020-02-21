import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return(
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo height="80%"></Logo>
        <nav className={classes.DesktopOnly}>
            <NavigationItems ></NavigationItems>
        </nav>
    </header>
    )
}

export default Toolbar;

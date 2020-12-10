import React from "react";
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems(props) {
    return (
        <ul className={classes.navigationItems}>
            <NavigationItem exact link="/" active>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> :
                <NavigationItem link="/auth">Authenticate</NavigationItem>}

        </ul>
    );
}

export default NavigationItems;

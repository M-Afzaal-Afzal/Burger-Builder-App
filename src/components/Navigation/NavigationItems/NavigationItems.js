import React from "react";
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems() {
    return (
        <ul className={classes.navigationItems}>
            <NavigationItem exact link = "/" active>Burger Builder</NavigationItem>
            <NavigationItem link = "/Orders">Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;

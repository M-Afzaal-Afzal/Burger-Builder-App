import React from "react";
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems() {
    return (
        <ul className={classes.navigationItems}>
            <NavigationItem link = "#" active>Burger Builder</NavigationItem>
            <NavigationItem link = "#">Checkout</NavigationItem>
        </ul>
    );
}

export default NavigationItems;

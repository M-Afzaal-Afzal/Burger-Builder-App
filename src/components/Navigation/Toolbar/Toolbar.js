import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToogle/DrawerToggle";

function Toolbar(props) {
    return (
        <div className={classes.Toolbar}>
            <DrawerToggle toggle={props.clicked}/>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.desktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </div>
    );
}

export default Toolbar;

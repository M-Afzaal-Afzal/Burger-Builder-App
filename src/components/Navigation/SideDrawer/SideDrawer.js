import React from 'react'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'


function SideDrawer(props) {
    let classesAttached = [classes.sideDrawer,props.show ? classes.open: classes.close];

    return (
        <Auxiliary >
            <Backdrop show = {props.show} clicked = {props.clicked}/>
            <div className={classesAttached.join(' ')} onClick={props.clicked}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={ props.isAuthenticated}/>
                </nav>
            </div>
        </Auxiliary>
    )
}

export default SideDrawer;

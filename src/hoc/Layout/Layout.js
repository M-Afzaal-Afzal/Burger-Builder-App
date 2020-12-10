import React, {useState} from 'react';
import {connect} from "react-redux";

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

    const [state,setState] = useState({show: false});

    const showHandler = () => {
        setState((prevState) => {
            return {
                show: !prevState.show
            }
        })
    }


    return (
        <Auxiliary>
            <Toolbar isAuthenticated={props.isAuth} clicked={showHandler} show={state.show}/>
            <SideDrawer isAuthenticated={props.isAuth} show={state.show} clicked={showHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps, null)(Layout);
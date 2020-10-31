import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class layout extends Component {

    state = {
        show: false
    }

    showHandler = () => {
        this.setState((prevState) => {
            return {
                show: !prevState.show
            }
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar clicked={this.showHandler} show={this.state.show}/>
                <SideDrawer show={this.state.show} clicked={this.showHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

export default layout;
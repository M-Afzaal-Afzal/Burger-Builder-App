import React, {useEffect, lazy, Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import * as actions from './store/actions/index';
import {withRouter} from 'react-router-dom';
// import {} from "react-router-dom";
import {connect} from "react-redux";

// import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Logout from "./containers/Auth/Logout/Logout";

const BurgerBuilder = lazy(() => {
    return import('./containers/BurgerBuilder/BurgerBuilder');
})

const Layout = lazy(() => {
    return import('./hoc/Layout/Layout');
})

const Checkout = lazy(() => {
    return import('./containers/Checkout/Checkout');
})

const Orders = lazy(() => {
    return import('./containers/Orders/Orders');
})

const Logout = lazy(() => {
    return import('./containers/Auth/Logout/Logout');
})

const App = (props) => {

    const {onTryAutoSignup} = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);


    let routes = (
        <Switch>
            <Route path='/auth'>
                <Auth/>
            </Route>
            <Route path='/'>
                <BurgerBuilder/>
            </Route>
        </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/checkout'>
                    <Checkout/>
                </Route>
                <Route path='/orders'>
                    <Orders/>
                </Route>
                <Route path='/logout'>
                    <Logout/>
                </Route>
                <Route path='/auth'>
                    <Auth/>
                </Route>
                <Route path='/'>
                    <BurgerBuilder/>
                </Route>
            </Switch>
        )
    }

    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <Layout>
                    {routes}
                </Layout>
            </Suspense>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

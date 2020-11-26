import React, {Component} from 'react';
import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {
    // state = {
    //     ingredients: {},
    //     totalPrice: 0,
    // }


    // componentWillMount() {
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //
    //     for (const [key, value] of query.entries()) {
    //         // ["salad","1"]
    //         if (key === 'price') {
    //             price = +value;
    //         } else {
    //             ingredients[key] = +value;
    //         }
    //     }
    //
    //     console.log(ingredients);
    //
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     });
    // }


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary checkoutContinued={this.checkoutContinueHandler}
                                 checkoutCanceled={this.checkoutCancelHandler}
                                 ingredients={this.props.ings}/>

                <Route path={this.props.match.path + '/contact-data'}>
                    <ContactData {...this.props} ingredients={this.props.ings}
                                 totalPrice={this.props.price}/>
                </Route>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);
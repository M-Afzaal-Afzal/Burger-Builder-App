import CheckoutSummary from "../../components/order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

const Checkout = (props) => {
    // state = {
    //     ingredients: {},
    //     totalPrice: 0,
    // }


    // componentWillMount() {
        // console.log(this.props);
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        //
        // for (const [key, value] of query.entries()) {
        //     // ["salad","1"]
        //     if (key === 'price') {
        //         price = +value;
        //     } else {
        //         ingredients[key] = +value;
        //     }
        // }
        //
        // console.log(ingredients);
        //
        // this.setState({
        //     ingredients: ingredients,
        //     totalPrice: price
        // });
    // }


    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }


        let summary = (<Redirect to='/'/>)

        const purchasedRedirect = props.purchased ? <Redirect to='/'/> : null;

        if (props.ings) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary checkoutContinued={checkoutContinueHandler}
                                     checkoutCanceled={checkoutCancelHandler}
                                     ingredients={props.ings}/>
                    <Route path={props.match.path + '/contact-data'}>
                        <ContactData {...props} />
                    </Route>
                </div>)
        }

        return (
            <div>
                {summary}
            </div>
        );

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));
import React, {useState, useEffect} from 'react';
import axios from '../../axios-orders'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
// import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/index'
import {withRouter} from 'react-router-dom'

const BurgerBuilder = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    // state = {
    //     purchasing: false,
    // }

    const [state,setState] = useState({
        purchasing: false
    })

    useEffect(()=> {
        props.onInitIngredients();

    },[])

    // componentDidMount() {
    //     this.props.onInitIngredients();
        // axios.get('https://burgerbuilder-c8cc2.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //         return response;
        //     }).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        //
        // })
    // }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = (oldPrice + priceAddition);
    //     this.setState({totalPrice: +(newPrice).toFixed(2), ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setState({purchasing: true});
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

   const purchaseCancelHandler = () => {
        setState({purchasing: false});
    }

    const purchaseContinueHandler = () => {

        // const queryParams = [];
        //
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }
        //
        // queryParams.push('price=' + this.state.price);
        //
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        props.onInitPurchase();
        // console.log(this.props);
        props.history.push('/checkout');
    }


        const disabledInfo = {
            ...props.ings
        };
        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
        }

        let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        let orderSummary = null;

        if (props.ings) {
            burger = (<Auxiliary>
                    <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}
                        price={props.price}/>
                </Auxiliary>
            )

            orderSummary = (<OrderSummary
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>);
        }

        // if (this.state.loading) {
        //     orderSummary = (<Spinner/>)
        // }

        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
                <Modal show={state.purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));
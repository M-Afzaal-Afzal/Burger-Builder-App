import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from '../../../store/actions/index'
import {updateObject} from "../../../shared/utility";
import {checkValidity} from "../../../shared/utility";

const ContactData = (props) => {
    const [state, setState] = useState({
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code',
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail',
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your City',
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'fastest'},
                            {value: 'cheapest', displayValue: 'cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                },
            },
            formIsValid: false
        }
    )
   const orderHandler = (event) => {
        event.preventDefault();

        // this.setState({
        //     loading: true,
        // });

        const formData = {};

        for (let orderFormEl in state.orderForm) {
            formData[orderFormEl] = state.orderForm[orderFormEl].value;
        }

        const orders = {
            ingredients: props.ings,
            price: props.price.toFixed(2),
            FormData: formData,
            userId: props.userId,
        }

        props.onOrderBurger(orders, props.token);


        // axios.post('/orders.json', orders)
        //     .then(responseConfig => {
        //         this.setState({loading: false,})
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({
        //             loading: false,
        //         })
        //     });
    }


   const inputChangedHandler = (event, inputType) => {
        const updatedOrderForm = {
            ...state.orderForm
        }

        const updatedformElement = updateObject(updatedOrderForm[inputType], {
            touched: true,
            value: event.target.value,
            valid: false
        })


        updatedformElement.valid = checkValidity(updatedformElement.value, updatedformElement.validation)

        updatedOrderForm[inputType] = updatedformElement;

        let isValid = true;

        // debugger;

        for (let elementIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[elementIdentifier].valid && isValid;
        }

        // console.log(isValid)


        setState({
            ...state,
            orderForm: updatedOrderForm,
            formIsValid: isValid
        })

    }


    const formElementsArray = [];

    for (const key in state.orderForm) {
        formElementsArray.push({
            id: key,
            ...state.orderForm[key],
        })
    }

    let form = null;

    if (props.loading) {
        form = <Spinner/>
    } else {
        form = (
            <form onSubmit={orderHandler}>
                {/*<Input elementType='' elementConfig='...' value=''/>*/}
                {formElementsArray.map((formElement) => {
                    return (
                        <Input
                            touched={formElement.touched}
                            changed={(event) => (inputChangedHandler(event, formElement.id))}
                            invalid={!formElement.valid}
                            shouldValidate={formElement.validation}
                            key={formElement.id}
                            elementType={formElement.elementType}
                            elementConfig={formElement.elementConfig}
                            value={formElement.value}
                        />
                    )
                })}

                <Button disabled={!state.formIsValid} clicked={orderHandler}
                        btnType='Success'>ORDER</Button>
            </form>
        )
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
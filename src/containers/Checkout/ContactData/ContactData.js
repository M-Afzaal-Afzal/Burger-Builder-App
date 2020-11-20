import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
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
                    required: true
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
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
        });

        const formData = {};

        for (let orderFormEl in this.state.orderForm) {
            formData[orderFormEl] = this.state.orderForm[orderFormEl].value;
        }

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            FormData: formData,
        }

        axios.post('/orders.json', orders)
            .then(responseConfig => {
                this.setState({loading: false,})
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                })
            });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

            if (!rules) {
                return true;
            }

            if (rules.required && isValid) {
                isValid = value.trim() !== '';
            }

            if (rules.maxLength && isValid) {
                isValid = value.trim().length <= rules.maxLength;
            }

            if (rules.minLength && isValid) {
                isValid = value.trim().length >= rules.minLength;
            }

        return isValid;
    }

    inputChangedHandler = (event, inputType) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedformElement = {
            ...this.state.orderForm[inputType],
        }

        updatedformElement.touched = true;

        updatedformElement.valid = this.checkValidity(updatedformElement.value, updatedformElement.validation)

        updatedformElement.value = event.target.value;



        updatedformElement.valid = this.checkValidity(updatedformElement.value, updatedformElement.validation)


        // console.log(updatedformElement);

        updatedOrderForm[inputType] = updatedformElement;

        let isValid = true;

        // debugger;

        for (let elementIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[elementIdentifier].valid && isValid;
        }

        // console.log(isValid)


        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: isValid
        })

    }


    render() {
        const formElementsArray = [];

        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                ...this.state.orderForm[key],
            })
        }

        let form = null;

        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {/*<Input elementType='' elementConfig='...' value=''/>*/}
                    {formElementsArray.map((formElement) => {
                        return (
                            <Input
                                touched={formElement.touched}
                                changed={(event) => (this.inputChangedHandler(event, formElement.id))}
                                invalid={!formElement.valid}
                                shouldValidate={formElement.validation}
                                key={formElement.id}
                                elementType={formElement.elementType}
                                elementConfig={formElement.elementConfig}
                                value={formElement.value}
                            />
                        )
                    })}

                    <Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType='Success'>ORDER</Button>
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
}

export default ContactData;
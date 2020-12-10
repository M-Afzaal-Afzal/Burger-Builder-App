import React, {useEffect, useState} from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom';
import {checkValidity} from "../../shared/utility";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

const Auth = (props) => {

    const [state, setState] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-MAIL',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true,

    })

    // debugger;

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    },[])

    // componentDidMount()
    // {
    //     if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
    //         this.props.onSetAuthRedirectPath();
    //     }
    // }

   const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...state.controls,
            [controlName]: {
                ...state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, state.controls[controlName].validation),
                touched: true
            }
        }

        setState({
            ...state,
            controls: updatedControls
        })

    }

   const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(state.controls.email.value, state.controls.password.value, state.isSignUp);
    }

    const switchAuthModeHandler = () => {
        setState((prevState) => {
            return {
                ...state,
                isSignUp: !prevState.isSignUp
            }
        })
    }



        const formElementsArray = [];

        for (const key in state.controls) {
            formElementsArray.push({
                id: key,
                ...state.controls[key],
            })
        }

        let form = formElementsArray.map((formElement) => {
            return (
                <Input key={formElement.id}
                       touched={formElement.touched}
                       changed={(event) => (inputChangedHandler(event, formElement.id))}
                       invalid={!formElement.valid}
                       shouldValidate={formElement.validation}
                       elementType={formElement.elementType}
                       elementConfig={formElement.elementConfig}
                       value={formElement.value}
                />
            )
        })

        if (props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        if (props.error) {
            errorMessage = (
                <p>{props.error.message}</p>
            )
        }


        return (
            <div className={classes.Auth}>
                {props.isAuthenticated ? <Redirect to={props.authRedirectPath}/> : null}
                <div>{errorMessage}</div>
                <form action="#" onSubmit={submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button clicked={switchAuthModeHandler} btnType='Danger'>SWITCH
                    TO {!state.isSignUp ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        );

}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUP) => dispatch(actions.auth(email, password, isSignUP)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
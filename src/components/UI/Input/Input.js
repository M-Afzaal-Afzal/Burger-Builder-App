import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'): {
            inputElement = <input
                required
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        }

        case ('textarea'): {
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        }

        case ('select'): {
            inputElement = (
                <select onChange={props.changed} value={props.value} className={inputClasses.join(' ')} name={props.elementConfig.id} id={props.elementConfig.id}>

                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}> {option.displayValue}</option>
                    })}

                </select>
            )
            break;
        }

        default : {
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
        }
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;

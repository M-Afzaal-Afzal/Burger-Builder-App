import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {

    const ingredients = [];

    for (const ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            value: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #eee',
            padding: '5px'
        }}>{ingredient.name} {ingredient.value}</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
};

export default Order;

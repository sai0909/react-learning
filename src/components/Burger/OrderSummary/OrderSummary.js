import React from 'react';
import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button'
const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
                                .map((igKey)=>{
                                return <li key={igKey}><span style={{textTransform:"uppercase"}}>{igKey}</span> : {props.ingredients[igKey]}</li>
                                })

    return (
       <Auxillary>
        <h3>YOur Order</h3>
        <p>A Delicious Burger with following ingredients:</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p><strong>Total Price : {props.totalprice}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={props.PurchaseCancelled} btnType="Danger">Cancel</Button>
        <Button clicked={props.PurchaseContinue} btnType="Success">Continue</Button>
       </Auxillary>
    )
}

export default OrderSummary;
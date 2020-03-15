import React,{Component} from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button'
import { render } from '@testing-library/react';
class OrderSummary extends Component {
        componentWillUpdate(){
            console.log('[order summary] wil update')
        }
    
        render(){

            const ingredientsSummary = Object.keys(this.props.ingredients)
                                .map((igKey)=>{
                                return <li key={igKey}><span style={{textTransform:"uppercase"}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
                                })

            return (

            <Auxillary>
                    <h3>YOur Order</h3>
                    <p>A Delicious Burger with following ingredients:</p>
                    <ul>
                        {ingredientsSummary}
                    </ul>
                    <p><strong>Total Price : {this.props.totalprice}</strong></p>
                    <p>Continue to checkout?</p>
                    <Button clicked={this.props.PurchaseCancelled} btnType="Danger">Cancel</Button>
                    <Button clicked={this.props.PurchaseContinue} btnType="Success">Continue</Button>
            </Auxillary>
            )
        }
}

export default OrderSummary;
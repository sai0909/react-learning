import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.4
}

class BurgerBuilder extends Component{

    state={
        ingredients: {
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        totalPrice:0,
        purchasable:false,
        purchasing:false,
    }

    addIngredientHandler = (type) =>{
        console.log(type);
        const oldCount = this.state.ingredients[type];
        console.log('OLD COUNT',oldCount);
        const updateCount = oldCount + 1 ;
        console.log('UPDATE COUNT',updateCount);
        const updateIngredients = {
            ...this.state.ingredients
        };
        console.log(updateIngredients);
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        console.log('PriceAddition',priceAddition);
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        console.log('updatedPrice',updatedPrice);
        this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
        this.updatePurchaseStatus(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        console.log(type);
        
        const oldCount = this.state.ingredients[type];
        console.log('OLD COUNT',oldCount);
        if(oldCount <=0){
            return;
        }
        const updateCount = oldCount - 1 ;
        console.log('UPDATE COUNT',updateCount);
        const updateIngredients = {
            ...this.state.ingredients
        };
        console.log(updateIngredients);
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        console.log('priceDeduction',priceDeduction);
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        console.log('updatedPrice',updatedPrice);
        this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
        this.updatePurchaseStatus(updateIngredients)
    }

    updatePurchaseStatus = (ingredients) => {
            const sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey]})
            .reduce((sum,el)=>{return sum+el},0)
            console.log('sum',sum)
            this.setState({purchasable:sum>0})
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchasecancelHandler =() => {

        this.setState({
            purchasing:false
        })
    }

    purchaseContinueHandler = () => {
       alert('please Continue')
    }

    render(){

        const disableInfo = {...this.state.ingredients};
        
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
           
        }
        

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchasecancelHandler}><OrderSummary totalprice={this.state.totalPrice} ingredients={this.state.ingredients} PurchaseCancelled={this.purchasecancelHandler} PurchaseContinue={this.purchaseContinueHandler}></OrderSummary></Modal>
                <Burger 
                ingredients = {this.state.ingredients}/>
                <BuildControls 
                totalprice={this.state.totalPrice}
                ingredientsAdded = {this.addIngredientHandler}
                ingredientsDeleted = {this.removeIngredientHandler}
                purchasable = {this.state.purchasable}
                disabled = {disableInfo}
                ordered={this.purchaseHandler}/>
            </Auxillary>
        );        
    }
}

export default BurgerBuilder;
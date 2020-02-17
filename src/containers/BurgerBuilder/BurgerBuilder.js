import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            cheese:1,
            meat:1,
            bacon:1
        },
        totalPrice:0
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
    }


    render(){

        const disableInfo = {...this.state.ingredients};
        console.log(disableInfo);
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
            console.log('disbaled info',disableInfo[key])
        }


        return(
            <Auxillary>
                <Burger 
                ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientsAdded = {this.addIngredientHandler}
                ingredientsDeleted = {this.removeIngredientHandler}
                disableStatus = {this.disableInfo}/>
            </Auxillary>
        );        
    }
}

export default BurgerBuilder;
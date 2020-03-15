import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.4
}

class BurgerBuilder extends Component{

    state={
        ingredients: null,
        totalPrice:0,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-burger-d91d0.firebaseio.com/ingredients.json')
        .then(res=>{
            console.log(res)
            this.setState({ingredients:res.data})
        })
        .catch(error=>{
            this.setState({error:true})
        })
        
    }


    addIngredientHandler = (type) =>{
        //console.log(type);
        const oldCount = this.state.ingredients[type];
        //console.log('OLD COUNT',oldCount);
        const updateCount = oldCount + 1 ;
        //console.log('UPDATE COUNT',updateCount);
        const updateIngredients = {
            ...this.state.ingredients
        };
        //console.log(updateIngredients);
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICE[type];
        //console.log('PriceAddition',priceAddition);
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        // console.log('updatedPrice',updatedPrice);
        this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
        this.updatePurchaseStatus(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        // console.log(type);
        
        const oldCount = this.state.ingredients[type];
        // console.log('OLD COUNT',oldCount);
        if(oldCount <=0){
            return;
        }
        const updateCount = oldCount - 1 ;
        // console.log('UPDATE COUNT',updateCount);
        const updateIngredients = {
            ...this.state.ingredients
        };
        // console.log(updateIngredients);
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        // console.log('priceDeduction',priceDeduction);
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        // console.log('updatedPrice',updatedPrice);
        this.setState({totalPrice:updatedPrice,ingredients:updateIngredients});
        this.updatePurchaseStatus(updateIngredients)
    }

    updatePurchaseStatus = (ingredients) => {
            const sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey]})
            .reduce((sum,el)=>{return sum+el},0)
            // console.log('sum',sum)
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
       //alert('please Continue')
       this.setState({loading:true})
       const order = {
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer:{
               name:'max',
               address: {
                   street: 'TestStreet 1',
                   zipcode: '43221'
               },
               email:'test@test.com'
           },
           deliveryMethod:'fastest'
       }

       axios.post('/orders.json',order)
            .then((response)=>{
                this.setState({loading:false,purchasing:false})
                console.log(response);
            })
            .catch(error=>{
                this.setState({loading:false,purchasing:false})
                console.log(error);
            });
    }

    
    render(){

        const disableInfo = {...this.state.ingredients};
        
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
           
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients not able to be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
           burger = ( 
            <Auxillary>
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
           )

           orderSummary = <OrderSummary totalprice={this.state.totalPrice} ingredients={this.state.ingredients} PurchaseCancelled={this.purchasecancelHandler} PurchaseContinue={this.purchaseContinueHandler}></OrderSummary>

        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchasecancelHandler}>{orderSummary}</Modal>
                {burger}
            </Auxillary>
        );        
    }
}

export default withErrorHandler(BurgerBuilder,axios);
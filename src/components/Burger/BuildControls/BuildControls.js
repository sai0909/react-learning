import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const BuildControls = (props) =>{
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalprice.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>{

                console.log('type',props.disabled[ctrl.type])

               return  <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientsAdded(ctrl.type)}
                removed={()=>props.ingredientsDeleted(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            })}
            <button onClick={props.ordered} disabled={!props.purchasable} className={classes.OrderButton}>Order</button>
        </div>
    )
}

export default BuildControls;
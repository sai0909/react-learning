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
            {controls.map((ctrl)=>{
               return  <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientsAdded(ctrl.type)}
                removed={()=>props.ingredientsDeleted(ctrl.type)}
                disabled={()=>props.disableStatus[ctrl.type]}
                />
            })}
        </div>
    )
}

export default BuildControls;
import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component  {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('Modal will update changes')
    }
    render(){
        return (
            <Auxillary>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
            <div style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }} className={classes.Modal}>{this.props.children}</div>

            </Auxillary>
            )
    }
}


export default Modal;
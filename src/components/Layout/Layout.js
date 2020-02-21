import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state ={
        showSideDrawer : true
    }
    SideDrawerClosedHandler =() =>{
        this.setState({showSideDrawer:false})
    }

    render(){
        return(
            <Auxillary>        
                <Toolbar></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
    
}

export default Layout;
import React,{Component} from 'react';
import Auxillary from '../Auxillary/Auxillary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    SideDrawerClosedHandler =() =>{
        this.setState({showSideDrawer:false})
    }   

    MenuClickedHandler = () => {
        this.setState((prevState)=> {
           return { showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Auxillary>        
                <Toolbar openSideDrawer={this.MenuClickedHandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
    
}

export default Layout;
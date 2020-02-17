import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.module.css'

const Layout = (props) => {
    return(
        <Auxillary>        
            <div >
                Toolbat,sidebar
            </div>
            <main className={classes.Content}> 
                {props.children}
            </main>
        </Auxillary>
    )
}

export default Layout;
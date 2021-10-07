import React from "react";
import Search from "./Search";
import Nav from './Nav'

import './index.css'
const Header =(props)=>{
    return(
        <div >
            <Search onSearch={props.onSearch}/>
            <Nav/>
            
        </div>
    )
}

export default Header;
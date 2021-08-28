import React, {Component} from 'react'
import '../css/style.css'
import NavBar from '../NavBar/NavBar'

class Slide extends Component{

    render(){
        return(
            <div>
                <NavBar/>
                <div id="MainContent">
                    Slide Page
                </div>
            </div>
            
        )
    }
}

export default NavBar


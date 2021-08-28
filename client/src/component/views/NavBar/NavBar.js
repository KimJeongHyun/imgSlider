import React, {Component} from 'react'
import '../css/style.css'

class NavBar extends Component{

    render(){
        return(
            <div id="nav-container">
                <nav>
                    <ul>
                        <li id="nav-item">
                            <a href="/" id="linkName">Home</a>
                        </li>
                        <li id="nav-item">
                            <a href="/fileUpload" id="linkName">Upload</a>
                        </li>
                        <li id="nav-item">
                            Slide
                        </li>
                    </ul>
                </nav>
            </div>
            
        )
    }
}

export default NavBar


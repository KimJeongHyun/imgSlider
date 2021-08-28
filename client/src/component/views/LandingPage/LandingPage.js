import React, {Component} from 'react'
import '../css/style.css'
import NavBar from '../NavBar/NavBar';


class LandingPage extends Component{
    render(){
        return (
            <div>
                <NavBar/>
                <div id="MainContent">
                    Slide!
                    <br/>
                    <br/>
                    You can upload your images and slide them!
                </div>
            </div>

            
        )
    }
}

export default LandingPage;
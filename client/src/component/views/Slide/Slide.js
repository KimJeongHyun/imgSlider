import React, {Component} from 'react'
import '../css/style.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import ReactDOM from 'react-dom'

class Slide extends Component{
    constructor(props){
        super(props);
        this.state={
            FileMap:'',
            startKey:0,
            nowLoc:0,
            length:''
        }
    }
    componentDidMount(){
        axios.get('/api/getFile')
        .then(response=>{
            let cnt = 0;
            this.setState({
                FileMap:response.data.fileMap
            })
            for (let key in this.state.FileMap){
                if (cnt==0){
                    this.setState({
                        startKey:key,
                        nowLoc:key
                    })
                }
                cnt++;
            }
            this.setState({
                length:cnt
            })
        })
    }
    
    componentDidUpdate(prevProps){
        const result = [];
        if (this.state.length!='' && this.state.nowLoc==this.state.startKey){
            const str = this.state.FileMap[this.state.startKey].substring(14);
            result.push(
                <img src={str} style={{width:'90%'}}/>
            )
            ReactDOM.render(result,document.getElementById('imgContainer'))
        }
        if (this.state.length!='' && this.state.nowLoc!=this.state.startKey){
            const str = this.state.FileMap[this.state.nowLoc].substring(14);
            result.push(
                <img src={str} style={{width:'90%'}}/>
            )
            ReactDOM.render(result,document.getElementById('imgContainer'))
        }
    }

    prevOnClick = () =>{
        if (this.state.nowLoc==this.state.startKey){
            alert('첫번째 이미지입니다.');
        }else{
            const locVar = parseInt(this.state.nowLoc);
            this.setState({
                nowLoc:locVar-1
            })
            
        }
    }

    nextOnClick = () =>{
        if (this.state.nowLoc == this.state.length-1){
            alert('마지막 이미지입니다.');
        }else{
            const locVar = parseInt(this.state.nowLoc);
            this.setState({
                nowLoc:locVar+1
            })
        }
    }



    render(){
        return(
            <div>
                <NavBar/>
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems: 'center',
            width:'100%',height:'100vh', marginTop:'10vh', position:'relative'}}>
                <button onClick={this.prevOnClick}>prev</button>
                <button onClick={this.nextOnClick}>next</button>
                <div id="imgContainer" style={{border:'0.2rem solid', width:'40%', height:'70%',textAlign:'center', display:'flex',justifyContent:'center',alignItems:'center'}}>

                </div>   
            </div>
            </div>
            
        )
    }
}

export default Slide


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
            length:'',
            interval:''
        }
    }
    componentDidMount(){
        const imgContainerID = document.getElementById('imgContainer');
        setTimeout(function(){
            imgContainerID.classList.add('active');
        },1000)

        const work1 = async () =>{
            await axios.get('/api/getFile')
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
        work1();
        const intervalWork = async () =>{
            if (this.state.nowLoc<this.state.length){
                if (this.state.nowLoc!=this.state.length-1){
                    this.setState({
                        nowLoc:parseInt(this.state.nowLoc)+1
                    })
                }else{
                    this.setState({
                        nowLoc:0
                    })
                }
            }
            
        }
        this.state.interval = setInterval(async function(){
            await intervalWork();
        },2000);

        
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }
    
    componentDidUpdate(prevProps){
        const imgContainerID = document.getElementById('imgContainer');
        imgContainerID.classList.add('active');
        const result = [];
        if (this.state.length!='' && this.state.nowLoc==this.state.startKey){
            const str = this.state.FileMap[this.state.startKey].substring(14);
            result.push(
                <img src={str} style={{width:'90%',height:'100%'}}/>
            )
            ReactDOM.render(result,document.getElementById('imgContainer'))
        }
        if (this.state.length!='' && this.state.nowLoc!=this.state.startKey){
            const str = this.state.FileMap[this.state.nowLoc].substring(14);
            result.push(
                <img src={str} style={{width:'90%',height:'100%'}}/>
            )
            ReactDOM.render(result,document.getElementById('imgContainer'))
        }
        setTimeout(function(){
            imgContainerID.classList.remove('active');
        },1000)
    }

    prevOnClick = () =>{
        if (this.state.nowLoc==this.state.startKey){
            alert('????????? ??????????????????.');
        }else{
            const locVar = parseInt(this.state.nowLoc);
            this.setState({
                nowLoc:locVar-1
            })
            
        }
    }

    nextOnClick = () =>{
        if (this.state.nowLoc == this.state.length-1){
            alert('????????? ??????????????????.');
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
                <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'center', alignItems:'center'}}>
                    <div id="imgContainer" style={{border:'0.2rem solid', width:'50%', height:'100%',textAlign:'center', display:'flex',justifyContent:'center',alignItems:'center'}}>

                    </div>   
                </div>

                
            </div>
            </div>
            
        )
    }
}

export default Slide


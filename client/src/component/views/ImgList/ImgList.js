import React, {Component} from 'react'
import '../css/style.css'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import ReactDOM from 'react-dom'

class ImgList extends Component{
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
        console.log(prevProps);
        const result = [];
        if (this.state.length!='' && this.state.nowLoc==this.state.startKey){
            for (let i=this.state.startKey; i<this.state.length; i++){
                const str = this.state.FileMap[i].substring(14);
                result.push(
                    <div style={{border:'0.2rem solid', marginRight:'10px'}}>
                        <img src={str} style={{width:'300px', height:'300px'}}/>
                        <button onClick={function(e){
                            e.preventDefault();
                            axios.get('/api/delete/'+i)
                            .then(response=>{
                                const responseClear = async()=>{
                                    console.log(response);
                                }
                                const pageReload = async()=>{
                                    window.location.reload();
                                }
                                const worker = async () =>{
                                    await responseClear();
                                    await pageReload();
                                }
                                worker();
                            })
                        }}>삭제</button>
                    </div>
                    
                )
            }
            ReactDOM.render(result,document.getElementById('imgContainer'))
        }
        
    }


    render(){
        return(
            <div>
                <NavBar/>
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems: 'center',
            width:'100%',height:'100vh', marginTop:'10vh', position:'relative'}}>
                <div id="imgContainer" style={{width:'50%', height:'30%',textAlign:'center', display:'flex',justifyContent:'center',alignItems:'center'}}>

                </div>   
            </div>
            </div>
            
        )
    }
}

export default ImgList


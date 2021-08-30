import React, {Component} from 'react'
import PopUp from '../Modal/Modal'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';

class FileUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            Seen : false,
            File : '',
            FileName:'',
            FilePath:''
        }
    }
    
    onSeenHandler = () =>{
        this.setState({
            Seen : !(this.state.Seen)
        })
    }

    onFileHandler = (event) =>{
        event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>{
            this.setState({
                File:file,
                FileName:event.target.value.split('\\')[2],
                FilePath:reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    onFileNameHandler = (event) =>{
        this.setState({
            FileName:event.currentTarget.value
        })
    }

    submitFile = () =>{
        const formData = new FormData;
        formData.append('img',this.state.File);
        axios.post('/api/upload',formData)
        .then(response=>{
            if (response.data.uploadSuccess){
                alert('업로드 성공!');
            }
        })
    }

    render(){
        let {FilePath} = this.state;
        let $imagePreview = null;
        return (
            <div>
                <NavBar/>
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems: 'center',
            width:'100%',height:'100vh', marginTop:'10vh', position:'relative'}}>
                <div style={{border:'0.2rem solid', width:'40%', height:'70%',textAlign:'center', display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {!$imagePreview && <img src={FilePath} style={{width:'80%', maxHeight:'400px'}}/>}
                </div>
                <br/>
                <input type="button" defaultValue="파일 업로드" onClick={this.onSeenHandler}/>
                <br/>
                {this.state.Seen ? <PopUp toggle={this.onSeenHandler} fileHandler={this.onFileHandler}/> : null}
                <input type="text" value={this.state.FileName} onChange={this.onFileNameHandler}></input>
                <br/>
                <button onClick={this.submitFile}>제출</button>             
            </div>
            </div>
            
        )
    }
}

export default FileUpload;
import React, {Component} from 'react'
class Modal extends Component{

    handleClick = () =>{
        this.props.toggle();
    }

    render(){
        return(
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <h3>File Upload</h3>
                    <input type="file" name="img" id="imgFile" accept=".gif, .jpg, .png" onChange={this.props.fileHandler}/>
                    <br />
                    <br />
                    <button onClick={this.handleClick}>닫기</button>
                </div>
            </div>
            
        )
    }
}

export default Modal;



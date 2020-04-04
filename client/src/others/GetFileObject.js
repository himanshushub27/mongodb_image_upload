import React,{ Component } from 'react';
import axios from "axios";
import history from './history';


class GetFileObject extends Component {

    getFiles = ()=> {
        // console.log('getFiles Clicked');
        axios.get('/files')
            .then((res)=> {
                console.log(res.data);
                history.push();
                /*0:
                    _id: "5c4c7e1c36ae0154bc41b760"
                    chunkSize: 261120
                    contentType: "image/png"
                    filename: "d40a9073db5d4a3e0001e33d66221ee0.PNG"
                    length: 97871
                    md5: "e183f495aa2ef19c74f1276ca7770939"
                    uploadDate: "2019-01-26T15:34:53.977Z"
                    <prototype>: Object { … }
                */
            });
    }
    
    render(){
        return(
            <div>
                <button onClick={this.getFiles}>
                    Get Files as Object
                </button>
            </div>
        )
       
    }
}

export default GetFileObject;

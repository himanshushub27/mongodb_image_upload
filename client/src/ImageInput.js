import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import history from './others/history';

 
class ImageInput extends React.Component {
 
    constructor(props) {
        super(props);
        this.y = 0;// we can create a varible in constructor like this and can access in any of the function like "this.y"
        this.state = { pictures: [], i: 0 };
        this.onDrop = this.onDrop.bind(this);
    }
    
    onDrop(picture) { // picture is array of images 
        this.setState({
            i : this.state.i + 1,
            // pictures: picture // this will also work since "picture" is an array
            pictures: this.state.pictures.concat(picture[this.state.i])//Here the value of "i" will be 0 
                //on first execution because "i" is defined in the state, after setState() execution is finished
                // the value of i will be 1 in first execution
        },()=> {
            console.log(this.state.pictures[this.state.i - 1].name);// Here the value of 'i' will be 1 on first execution but hte array starts from 0 that is why we have to subastract 1
            // console.log(this.state.pictures);
            // console.log(picture[this.state.i - 1]);
        });
    }

    uploadImage  = () => {
        // console.log("upload clicked");
        var imgnum = this.state.i - 1; //which element of the "pictures" array we have to pass to backend
        const fd = new FormData();
        fd.append('imageFromReact1', this.state.pictures[imgnum], this.state.pictures[imgnum].name);
        // console.log(this);
        axios.post('/imageupload', fd).then((res)=>{
            console.log(res.data.file);
            history.push('/redirect');
        });
    }


    render() {
        
        return (
            <div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                    maxFileSize={5242880}
                />
                <button onClick={this.uploadImage}>Upload</button>
            </div>
        );


    }
}

export default ImageInput;
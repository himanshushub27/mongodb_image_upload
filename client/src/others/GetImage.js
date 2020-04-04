import React, { Component } from "react";
import axios from "axios";
import ImageLoader from "react-image-file";
import history from "./history";

class GetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageName: "Put the name of image",
      ImageFromDB: "",
      BlobImage: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ImageName: event.target.value });
  }

  handleSubmit(event) {
    var ImageSearchName = this.state.ImageName;
    axios.post("/image", { ImageSearchName }).then((res) => {
      // console.log(res);
      // alert('A name was submitted: ' + this.state.ImageName);
      this.setState(
        {
          ImageFromDB: "http://localhost:4000/image/" + ImageSearchName,
        },
        () => {
          // console.log(this.state.ImageFromDB);
        }
      );
    });
    event.preventDefault();
  }

  // // Tried using ImageLoader
  // // DOnt know how to get the binary data from backend or as a blob
  // handleSubmit(event) {
  //     var ImageSearchName = this.state.ImageName;
  //     axios({
  //         method: "GET",
  //         url: '/image/?filename='+ ImageSearchName,
  //         responseType: "blob"
  //       }).then((res)=> {
  //             console.log(res);
  //             // alert('A name was submitted: ' + this.state.ImageName);
  //             this.setState({
  //                 ImageFromDB: 'http://localhost:4000/image/' + ImageSearchName,
  //                 BlobImage: res.data.Blob
  //             },() => {
  //                 // console.log(this.state.ImageFromDB);
  //         })
  //     })
  //     event.preventDefault();
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              placeholder={this.state.ImageName}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <img src={this.state.ImageFromDB} />
        {/* <ImageLoader src= {this.state.BlobImage} alt ="cant display image" /> */}
      </div>
    );
  }
}

export default GetImage;

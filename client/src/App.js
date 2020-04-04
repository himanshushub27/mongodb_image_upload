import React, { Component } from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import ImageInput from './ImageInput';
import RedirectUpload from './RedirectUpload';
import GetFileObject from './others/GetFileObject';
import GetImage from './others/GetImage';
import history from './others/history';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            {/* <ImageInput/> */}
            <Route exact path="/" component={ImageInput} />
            <Route exact path = "/redirect" component={RedirectUpload} />
            <GetFileObject/>
            <GetImage/>

            
           {/* <header className="App-header">

              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

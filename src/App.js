import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import axios from 'axios';

window.axios = axios;
axios.defaults.baseURL = 'http://localhost:3001/api'

class App extends Component {
  render() {
    return (
       <Navbar></Navbar>
    );
  }
}

export default App;

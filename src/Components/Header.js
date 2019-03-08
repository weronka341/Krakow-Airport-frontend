import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Navbar from './Navbar';
import {MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import './../App.css';
import logo from './logo.png';


class Header extends Component {
    render() {
      return (
        <div>
          <Navbar></Navbar>
          <MDBContainer fluid className="Header">
            <MDBRow>
              <MDBCol>
                <img src={logo} className="float-righ" alt=""/>
              </MDBCol>
              <MDBCol size="6" className="Col">
                <h1>Kraków Airport im.Jana Pawła II</h1>
              </MDBCol>
              <MDBCol className="Col">
                <Clock className="Time" format={'HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }
  }
  
  export default Header;
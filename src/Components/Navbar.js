import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, NavItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'mdbreact';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DeparturesPage from './DeparturesPage';
import Clock from 'react-live-clock';
import ArrivalsPage from './ArrivalsPage';
import Airlines from './Airlines';
import Airports from './Airports';
import LogIn from './LogIn';
import AddFlight from './AddFlight';
import AddAirport from './AddAirport';
import AddAirline from './AddAirline';
import AddAirplane from './AddAirplane';
import Payments from './Payments';
import './../App.css';


class NavigationHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      loggedIn: false,
      message: ''
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  componentWillMount() {
    const token = localStorage.getItem('token')

    if(token) {
      this.setState({message: 'Wyloguj', loggedIn: true})
    }
    else {
      this.setState({message: 'Zaloguj', loggedIn: false})
    }

  }


  handleLogging() {
    if(this.state.loggedIn && localStorage.getItem('token')){
      localStorage.removeItem('token')
      this.setState({loggedIn: false, message: 'Zaloguj'})
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
              <MDBNavbar color="default-color" dark expand="md" className="Navbar"> 
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem>
                      <MDBNavLink to="/">Strona głowna</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/przyloty">Przyloty</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/odloty">Odloty</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/linie">Linie lotniczne</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/oplaty">Opłaty</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="/lotniska">Lotniska</MDBNavLink>
                    </MDBNavItem>
                    <NavItem>
                      <Dropdown>
                        <DropdownToggle nav caret>
                          <div className="d-none d-md-inline">DODAJ</div>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href="/dodajLot">Lot</DropdownItem>
                          <DropdownItem href="/dodajSamolot">Samolot</DropdownItem>
                          <DropdownItem href="/dodajLotnisko">Lotnisko</DropdownItem>
                          <DropdownItem href="/dodajLinie">Linię</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </NavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right> 
                    <MDBNavItem>
                      <MDBNavLink  className="Link" onClick={ () => this.handleLogging() } to="/zaloguj">{this.state.message}</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBNavbar>
              
              <MDBContainer fluid className="Header">
                <MDBRow>
                  <MDBCol className="TextCentered">
                    <Clock className="Time" date="" format={'DD-MM-YYYY'} />
                  </MDBCol>
                  <MDBCol size="6" className="Col">
                    <MDBRow className="TextCentered">
                      <MDBCol size="2">
                      </MDBCol>
                    
                      <img src='/logo.png' className="float-righ" alt=""/>
                      <h1>Kraków Airport im.Jana Pawła II</h1>
                
                    </MDBRow> 
                  </MDBCol>
                  <MDBCol className="Col">
                    <Clock className="Time" format={'HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
                  </MDBCol>
                </MDBRow>
            </MDBContainer>     
          <Route path="/" exact component={HomePage} />
          <Route path="/przyloty" component={ArrivalsPage} />
          <Route path="/odloty" component={DeparturesPage} />
          <Route path="/linie" component={Airlines} />
          <Route path="/lotniska" component={Airports} />
          <Route path="/zaloguj" component={LogIn} />
          <Route path="/dodajLot" component={AddFlight} />
          <Route path="/dodajLotnisko" component={AddAirport} />
          <Route path="/dodajLinie" component={AddAirline} />
          <Route path="/dodajSamolot" component={AddAirplane} />
          <Route path="/oplaty" component={Payments} />
          </div>
        </Router>  
    </div>
    );
  }
}

export default NavigationHeader;
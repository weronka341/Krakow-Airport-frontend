import React, { Component } from "react";
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBIcon, MDBCardHeader, MDBBtn, MDBInput} from "mdbreact";
import './../App.css';

class LogIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id_managera: '',
      haslo: '',
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')

    if(token) {
      this.props.history.replace('/')
    }
  }

  logIn(e) {
    e.preventDefault()
    Axios
    .post('/zaloguj/',
      {
        id_managera: this.state.id_managera,
        haslo: this.state.haslo
      })
      .then(res => {
        localStorage.setItem('token', res.data.token)   
        window.location.reload('/')
      })
      .catch(err => {
        this.setState({id_managera: '', haslo: ''})

        console.log(err.response.data.wiadomosc)
        
      })



      
  }

  handleInputChange(event) {
    const newState = Object.assign({}, this.state)
    newState[event.target.name] = event.target.value
    this.setState(newState)
    console.log(this.state[event.target.name])
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol></MDBCol>
          <MDBCol size="6">
            <MDBCard className="FormHeader">
              <MDBCardHeader className="form-header blue-gradient rounded" >
                  <h3 className="my-3">
                  <MDBIcon icon="lock"/> Zaloguj się jako Manager Lotniska
                  </h3>
                </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Podaj swoje id"
                      name="id_managera"
                      value={this.state.id_managera}
                      icon="envelope"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={(event) => this.handleInputChange(event)}
                    />
                    <MDBInput
                      label="Podaj hasło"
                      name="haslo"
                      value={this.state.haslo}
                      icon="lock"
                      group
                      type="password"
                      validate
                      onChange={(event) => this.handleInputChange(event)}
                    />
                  </div>

                <div className="text-center mt-4">
                  <MDBBtn
                    className="mb-3"
                    type="submit"
                    onClick={ (e) => this.logIn(e) }
                  >
                    Zaloguj
                  </MDBBtn>
                </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light TextCentered">
                    <p>Tylko jako zalogowany użytkownik aplikacji do zarządzania lotniskiem Kraków Airport masz dostęp do jej funkcjonalności.</p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
      </MDBContainer>   
    );
  }
}

export default LogIn;
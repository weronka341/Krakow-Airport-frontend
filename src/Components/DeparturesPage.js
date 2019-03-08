import React, { Component } from 'react';
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import './../App.css';
import AllDepartures from './AllDepartures';

class DeparturesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoModalVisible: false,
            flightInfo: {},
        }
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')       
        }
    }

    toggleInfo = () => {
        this.setState({
          infoModalVisible: !this.state.infoModalVisible
        });
    }

    showModal(e) {
        const id = e.target.id
        Axios.get(`/lot/${id}`)
        .then( response => {
            this.setState({ flightInfo: response.data.lot })
            this.setState({ infoModalVisible: true })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteFlight(e) {
        const token = localStorage.getItem('token')
        const id = e.target.id
        Axios.delete(`/lot/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        .then( response => {
            alert(response.data.wiadomosc )
        })
        .catch((err) => {
            console.log(err)
            if(err.response.data.wiadomosc && err.response.data.wskazowka){
                alert(err.response.data.wiadomosc + '\n' + err.response.data.wskazowka)
            }
            else if(err.response.data.wiadomosc) {
                alert(err.response.data.wiadomosc)
            }
            else {
                alert(err)
            }
        })
    }

    render() {
      return (
        <div className="DeparturesPage">
            <MDBContainer fluid >
            <Modal isOpen={this.state.infoModalVisible} toggle={this.toggleInfo} centered > 
                <ModalHeader toggle={this.toggleInfo}>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol className="TextCentered Highlighted">
                            <h2>{this.state.flightInfo.nazwa_linii}</h2>
                        </MDBCol>
                        <MDBCol className="TextCentered">
                            <p>Nr rejsu:</p>
                            <h2>{this.state.flightInfo.nr_lotu}</h2>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </ModalHeader>
                <ModalBody className="TextCentered">
                    <h2 className="Highlighted">{this.state.flightInfo.kierunek}</h2>
                    <h4 className="Highlighted"> {this.state.flightInfo.nazwa_lotniska}</h4>
                    <span></span>
                    <h5>Czas rozkładowy</h5>
                    <table className="FlightModal">           
                        <tbody>
                            <tr>
                                <th>
                                    Data i godzina wylotu: 
                                </th>
                                <td>
                                    {this.state.flightInfo.data_wylotu}         
                                    
                                </td>
                                <td>
                                    <strong>{this.state.flightInfo.godzina_wylotu}</strong>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Data i godzina przylotu: 
                                </th>
                                <td>
                                    {this.state.flightInfo.data_przylotu}                                    
                                </td>
                                <td>
                                <strong>{this.state.flightInfo.godzina_przylotu}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>Statek powietrzny</h5>
                    <table className="FlightModal">
                        <tbody>
                            <tr>
                                <th>
                                    Model: 
                                </th>
                                <td>
                                    {this.state.flightInfo.nazwa_samolotu}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Nr rejestracyjny: 
                                </th>
                                <td>
                                    {this.state.flightInfo.nr_rejestracyjny}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Pasażerowie na pokładzie: 
                                </th>
                                <td>
                                    {this.state.flightInfo.liczba_miejsc}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
            </MDBContainer> 
            <MDBContainer fluid>           
                <AllDepartures showModal={this.showModal.bind(this)} 
                    deleteFlight={this.deleteFlight.bind(this)}>
                </AllDepartures>
           </MDBContainer>     
        </div>
      );
    }
  }
  
  export default DeparturesPage;
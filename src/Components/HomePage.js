import React, { Component } from 'react';
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import './../App.css';
import ArrivalsToday from './ArrivalsToday';
import DeparturesToday from './DeparturesToday';
import Panel from './Panel';


class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            flightInfo: {},
            modalAirportVisible: false,
            airportInfo: {}
        }
    }

    toggleFlight = () => {
        this.setState({
          modalVisible: !this.state.modalVisible
        });
    }

    toggleAirport = () => {
        this.setState({
          modalAirportVisible: !this.state.modalAirportVisible
        });
    }

    showModal(e) {
        const id = e.target.id
        Axios.get(`/lot/${id}`)
        .then( response => {
            this.setState({ flightInfo: response.data.lot })
            this.setState({ modalVisible: true })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    showAirportModal(e) {
        const id = e.target.id
        Axios.get(`/lotniska/${id}`)
        .then( response => {
            this.setState({ airportInfo: response.data.lotnisko })
            this.setState({ modalAirportVisible: true })
        })
        .catch((error) => {
            console.log(error)
        })
    }


    render() {
      return (
        <div className="HomePage">
            <MDBContainer fluid >
                <Modal isOpen={this.state.modalVisible} toggle={this.toggleFlight} centered > 
                    <ModalHeader toggle={this.toggleFlight}>
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

                <Modal isOpen={this.state.modalAirportVisible} toggle={this.toggleAirport} centered > 
                    <ModalHeader toggle={this.toggleAirport}>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <h3 className="Highlighted" >{this.state.airportInfo.nazwa}</h3>
                                </MDBCol>
                             </MDBRow>
                        </MDBContainer>
                    </ModalHeader>
                    <ModalBody className="TextCentered">
                        <table className="FlightModal">           
                            <tbody>
                                <tr>
                                    <th>
                                        Miasto: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.miasto}         
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Kraj: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.kraj}                                    
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        IATA: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.iata}                                    
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        ICAO: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.icao}                                    
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Szerokość geogr.: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.szer_geograficzna}                                    
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                       Długość geogr.: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.dl_geograficzna}                                    
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                       Strefa czasowa: 
                                    </th>
                                    <td>
                                        {this.state.airportInfo.strefa_czasowa}                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>

                <MDBRow>
                    <MDBCol size="6">
                    <ArrivalsToday showModal={this.showModal.bind(this)} showAirportModal={this.showAirportModal.bind(this)}></ArrivalsToday>
                    </MDBCol>
                    <MDBCol size="6">
                        <DeparturesToday 
                            showModal={this.showModal.bind(this)} 
                            showAirportModal={this.showAirportModal.bind(this)}
                        >
                        </DeparturesToday>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {localStorage.getItem('token') &&
                <Panel></Panel>  
            }
        </div>
      );
    }
  }
  
  export default HomePage;
import React, { Component } from 'react';
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, ModalBody, Modal, ModalHeader, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from 'mdbreact';
import { Button, Grid, Icon } from 'semantic-ui-react'
import './../App.css';
import AirlinesTable from './AirlinesTable'

class Airlines extends Component {

    constructor(props) {
        super(props);
        this.state = {

            airlines: [],
            airplanes: [],
            filtered: [],
            pageNumber: 1,
            fleetModalVisible: false,

        };
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')
              
        }

        Axios.get(`/linie`)
        .then((response) => {
            this.setState({
                airlines: 
                response.data.wszystkieLinie,
                filtered: this.state.airlines.slice(0, 20)
            })
        })

        Axios.get(`/samoloty/linie/1`)
        .then((response) => {
            this.setState({
                airplanes: 
                response.data.wszystkieSamoloty
            })
        })
    }

    componentDidUpdate() {
        Axios.get(`/linie`)
        .then((response) => {
            this.setState({
                airlines: 
                response.data.wszystkieLinie,
                filtered: this.state.airlines.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20))
            })
        })
    }

    toggleFleet = () => {
        this.setState({
          fleetModalVisible: !this.state.fleetModalVisible
        });
    }

    deleteLine(e) {
        const token = localStorage.getItem('token')
        const id = e.target.id

        Axios.delete(`/linie/${id}`, {
        headers: {
            'x-access-token': token
        }
        })
        .then( response => {
            alert(response.data.wiadomosc)
        })
        .catch((error) => {
            if(error.response.data.wiadomosc && error.response.data.wskazowka){
                alert(error.response.data.wiadomosc + '\n' + error.response.data.wskazowka)
            }
            else if(error.response.data.wiadomosc) {
                alert(error.response.data.wiadomosc)
            }
            else {
                alert(error)
            }
           
        })
    }

    showFleet(e) {
        const id = e.target.id

        Axios.get(`/samoloty/linie/${id}`)
        .then( response => {
            this.setState({ airplanes: response.data.wszystkieSamoloty })
            this.setState({ fleetModalVisible: true })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    filterFlights() {
        this.setState({
            filtered: this.state.airlines.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20)),
        })
    }

    nextPage () {
        this.setState({pageNumber: this.state.pageNumber + 1})
        this.filterFlights(this.state.pageNumber)
    }

    previousPage () {
        if(this.state.pageNumber > 1) {
            this.setState({pageNumber: this.state.pageNumber - 1})
            this.filterFlights(this.state.pageNumber)
        }
    }

    render() {

        const airplanes = this.state.airplanes.map(
            (airplane) => {
                return (
                    <tr key={airplane.id_samolotu}>
                        <td>{airplane.model}</td>
                        <td>{airplane.nazwa}</td>
                        <td>{airplane.nr_rejestracyjny}</td>
                        <td>{airplane.liczba_miejsc}</td>
                        <td>{airplane.masa_startowa}</td>
                    </tr>
                )
            })
    
        return(
            <div>
                <MDBContainer fluid >
                    <Modal isOpen={this.state.fleetModalVisible} toggle={this.toggleFleet} centered > 
                        <ModalHeader toggle={this.toggleFleet}>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol className="TextCentered Highlighted">
                                        <h2>Flota powietrzna</h2>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </ModalHeader>
                        <ModalBody className="TextCentered">
                            <table className="FlightModal">           
                                <thead>
                                    <tr>
                                        <th>
                                            Model: 
                                        </th>
                                        <th>
                                            Nazwa:
                                        </th>
                                        <th>
                                            Nr rejestracyjny:
                                        </th>
                                        <th>
                                            Liczba miejsc:
                                        </th>
                                        <th>
                                            Masa startowa:
                                        </th>   
                                    </tr>
                                </thead>
                                <tbody>
                                    {airplanes}
                                </tbody>
                            </table>
                        </ModalBody>
                    </Modal>
                </MDBContainer>
                <MDBCard narrow>
                    <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3" style={{'marginTop': '-0.75rem'}}>
                    <h3 className="white-text mx-3">Linie lotnicze</h3>
                    <div>
                        <MDBBtn outline rounded size="sm" color="white" className="px-2">
                        <i className="fa fa-plane mt-0"></i>
                        </MDBBtn>
                    </div>
                    </MDBCardHeader>
                    <MDBCardBody cascade>
                        <MDBContainer fluid>
                        <MDBRow>
                            <AirlinesTable 
                                rows={this.state.filtered} 
                                showFleet={this.showFleet.bind(this)} 
                                filterFlights={this.filterFlights.bind(this)}
                                deleteLine={this.deleteLine.bind(this)}
                            >
                            </AirlinesTable>
                        </MDBRow>
                        <Grid divided='vertically' padded='vertically'>
                            <Grid.Row columns={3}>
                                <Grid.Column textAlign='left'>
                                    <Button onClick={this.previousPage.bind(this)}>
                                        <Icon name='angle double left'/>
                                    </Button>
                                </Grid.Column>
                            
                                <Grid.Column textAlign='center'>
                                    <Button circular >{this.state.pageNumber}</Button>
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <Button onClick={this.nextPage.bind(this)}>
                                        <Icon name='angle double right'/>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
  };
}
  
export default Airlines;
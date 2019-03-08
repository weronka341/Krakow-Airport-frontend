import React, { Component } from 'react';
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from 'mdbreact';
import { Button, Grid, Icon } from 'semantic-ui-react'
import './../App.css';
import AirportsTable from './AirportsTable'

class Airports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airports: [],
            filtered: [],
            pageNumber: 1,
        };
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')     
        }
        
        Axios.get(`/lotniska`)
        .then((response) => {
            this.setState({
                airports: 
                response.data.wszystkieLotniska,
                filtered: this.state.airports.slice(0, 20)
            })
        })
    }

    componentDidUpdate() {
        Axios.get(`/lotniska`)
        .then((response) => {
            this.setState({
                airports: 
                response.data.wszystkieLotniska,
                filtered: this.state.airports.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20))
            })
        })
    }

    deleteAirport(e) {

        const token = localStorage.getItem('token')
        const id = e.target.id

        Axios.delete(`/lotniska/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        .then( response => {
            alert(response.data.wiadomosc)
        })
        .catch((err) => {
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

    filterFlights() {
        this.setState({
            filtered: this.state.airports.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20)),
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
       
        return(
            <div>
                <MDBCard narrow>
                    <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3" style={{'marginTop': '-0.75rem'}}>
                    <h3 className="white-text mx-3">Zarejestrowane Lotniska</h3>
                    <div>
                        <MDBBtn outline rounded size="sm" color="white" className="px-2">
                        <i className="fa fa-plane mt-0"></i>
                        </MDBBtn>
                    </div>
                    </MDBCardHeader>
                    <MDBCardBody cascade>
                    <MDBContainer fluid>
                        <MDBRow>
                            <AirportsTable 
                                rows={this.state.filtered} 
                                filterFlights={this.filterFlights.bind(this)}
                                deleteAirport={this.deleteAirport.bind(this)}
                            >
                            </AirportsTable>
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
  
export default Airports;
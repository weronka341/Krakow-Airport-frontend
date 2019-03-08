import React, { Component } from 'react';
import Axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBContainer, MDBRow } from 'mdbreact';
import { Button, Grid, Icon } from 'semantic-ui-react'
import './../App.css';
import moment from 'moment';
import { openDb, deleteDb } from 'idb'
import TodayFlightsTable from './TodayFlightsTable'


// Ọffline 
deleteDb('departures-store')

const departuresDataBase = openDb('departures-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('departures')
})
const idbDepartures = {
    async getAllDepartures() {
        const db = await departuresDataBase
        return db.transaction('departures').objectStore('departures').getAll()
    },
    async getDeparture(id) {
        const db = await departuresDataBase
        return db.transaction('departures').objectStore('departures').get(id)
    },
    async setDeparture(key, val) {
        const db = await departuresDataBase
        const tx = db.transaction('departures', 'readwrite')
        tx.objectStore('departures').put(val, key)
        return tx.complete
    },
    async keys() {
        const db = await departuresDataBase
        return db.transaction('departures').objectStore('departures').getAllKeys('id_lotu')
    },
}



class DeparturesToday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            filtered: [],
            pageNumber: 1
        };
    }

    async componentWillMount() {
        const date = moment().format('YYYYMMDD')
        Axios.get(`/odloty/${date}`)
        .then(async response => {
            response.data.wszystkieOdloty.map(async flight => {
                await idbDepartures.setDeparture(flight.id_lotu, flight)
            })
        })

        this.setState({
            departures: await idbDepartures.getAllDepartures(),
            filtered: this.state.departures.slice(0, 10)
        })
    }

    async componentDidUpdate() {
        this.setState({
            departures: await idbDepartures.getAllDepartures(),
            filtered: this.state.departures.slice(((this.state.pageNumber - 1) * 10), (this.state.pageNumber * 10))
        })
    }

    showModal(e) {
        this.props.showModal(e)
    }

    showAirportModal(e) {
        this.props.showAirportModal(e)
    }

    filterFlights() {
        console.log(this.state.pageNumber)
        this.setState({
            filtered: this.state.departures.slice(((this.state.pageNumber - 1) * 10), (this.state.pageNumber * 10)),
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
            <MDBCard narrow>
                <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3" style={{'marginTop': '-0.75rem'}}>
                <h3 className="white-text mx-3">Odloty - dzisiaj {moment().format('DD-MM')}</h3>
                <div>
                    <MDBBtn outline rounded size="sm" color="white" className="px-2">
                    <i className="fa fa-plane mt-0"></i>
                    </MDBBtn>
                </div>
                </MDBCardHeader>
                <MDBCardBody cascade>
                    <MDBContainer>
                            <MDBRow>
                                <TodayFlightsTable 
                                    rows={this.state.filtered} 
                                    showModal={this.showModal.bind(this)} 
                                    showAirportModal={this.showAirportModal.bind(this)}
                                    filterFlights={this.filterFlights.bind(this)}
                                >
                                </TodayFlightsTable>
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
        );
    };
}
  
export default DeparturesToday;
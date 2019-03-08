import React, { Component } from 'react';
import Axios from 'axios';
import { MDBCol, MDBRow, MDBContainer, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from 'mdbreact';
import { Button, Grid, Icon } from 'semantic-ui-react'
import './../App.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AllFlightsTable from './AllFlightsTable';


class AllDepartures extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            filtered: [],
            pageNumber: 1,
            dateFromDatePicker: new Date()
        };
    }

    componentWillMount() {
        const date = moment(this.state.dateFromDatePicker).format('YYYYMMDD')
        Axios.get(`/odloty/${date}`)
        .then((response) => {
            this.setState({
                departures: response.data.wszystkieOdloty,
                filtered: this.state.departures.slice(0, 10)
            })
        })
    }

    componentDidUpdate() {
        const date = moment(this.state.dateFromDatePicker).format('YYYYMMDD')
        Axios.get(`/odloty/${date}`)
        .then((response) => {
            this.setState({
                departures: 
                response.data.wszystkieOdloty,
                filtered: this.state.departures.slice(((this.state.pageNumber - 1) * 10), (this.state.pageNumber * 10))
            })
        })
    }

    getDatePickerValue = (value) => {
        
        this.setState({ 
            dateFromDatePicker: value 
        });
    }

    showModal(e) {
        this.props.showModal(e)
    }

    deleteFlight(e) {
        this.props.deleteFlight(e)
    }

    filterFlights() {
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
                <h3 className="white-text mx-3">Odloty</h3>
                <div>
                    <MDBBtn outline rounded size="sm" color="white" className="px-2">
                    <i className="fa fa-plane mt-0"></i>
                    </MDBBtn>
                </div>
                </MDBCardHeader>
                <MDBCardBody cascade>
                <MDBContainer className="DatePicker">
                    <MDBRow>
                        <MDBCol></MDBCol>
                        <MDBCol style={{'textAlign': 'center'}}>
                            <h3>Wybierz date:</h3>
                            <DatePicker 
                                selected={this.state.dateFromDatePicker}
                                onChange={this.getDatePickerValue}>
                            </DatePicker>
                        </MDBCol>
                        <MDBCol></MDBCol>
                        </MDBRow>
                </MDBContainer>
                <MDBContainer fluid>
                        <MDBRow>
                            <AllFlightsTable 
                                rows={this.state.filtered} 
                                showModal={this.showModal.bind(this)} 
                                filterFlights={this.filterFlights.bind(this)}
                                deleteFlight={this.deleteFlight.bind(this)}
                            >
                            </AllFlightsTable>
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
  
export default AllDepartures;
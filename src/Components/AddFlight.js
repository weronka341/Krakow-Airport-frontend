import React, {Component} from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardHeader } from 'mdbreact';
import './../App.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Axios from 'axios';


class AddFlight extends Component {

    constructor(props) {
        super(props)

        this.state = {

            currentLineID: '',

            airlines: [],
            airports: [],
            airplanes: [],

            newFlightData: {

                dane_samolotu: {
                    id_samolotu: ''
                },

                przylot: {
                    nr_lotu: '',
                    czas_wylotu: '',
                    czas_przylotu: '',
                    skad: ''
                },

                odlot: {
                    nr_lotu: '',
                    czas_wylotu: '',
                    czas_przylotu: '',
                    dokad: ''
                }
            },

            arrivals_start_date: new Date(),
            arrivals_finish_date: new Date(),
            departures_start_date: new Date(),
            departures_finish_date: new Date(),
        }
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')      
        }
        
        Axios.get(`/linie`)
        .then((response) => {
            this.setState({
                airlines: response.data.wszystkieLinie
            })
        })

        Axios.get(`/lotniska`)
        .then((response) => {
            this.setState({
                airports: response.data.wszystkieLotniska.slice(1)
            })
        })
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state)
        newState.newFlightData[event.target.name].nr_lotu = event.target.value
        this.setState(newState)
    }

    handleAirlineChange(id) {
        const newState = Object.assign({}, this.state)
        newState.currentLineID = id
        newState.newFlightData.dane_samolotu.id_samolotu = null
        this.setState(newState)

        Axios.get(`/samoloty/linie/${id}`)
        .then((response) => {
            this.setState({
                airplanes: response.data.wszystkieSamoloty
            })
        })
    }

    handleAirplaneChange(id) {
        const newState = Object.assign({}, this.state)
        newState.newFlightData.dane_samolotu.id_samolotu = id
        this.setState(newState)
    }

    handleArrivalAirportChange(id) {
        const newState = Object.assign({}, this.state)
        newState.newFlightData.przylot.skad = id
        this.setState(newState)
    }

    handleDepartureAirportChange(id) {
        const newState = Object.assign({}, this.state)
        newState.newFlightData.odlot.dokad = id  
        this.setState(newState)
    }

    handleArrivalStartDatePickerChange(value) {        
        const validDate = moment(value).format('YYYY-MM-DD HH:mm')

        const newState = Object.assign({}, this.state)
        newState.newFlightData.przylot.czas_wylotu = validDate
        newState.arrivals_start_date = value
        this.setState(newState)
    }

    handleArrivalFinishDatePickerChange(value) {     
        const validDate = moment(value).format('YYYY-MM-DD HH:mm')

        const newState = Object.assign({}, this.state)
        newState.newFlightData.przylot.czas_przylotu = validDate
        newState.arrivals_finish_date = value    
        this.setState(newState)
    }

    handleDepartureStartDatePickerChange(value) {    
        const validDate = moment(value).format('YYYY-MM-DD HH:mm')

        const newState = Object.assign({}, this.state)
        newState.newFlightData.odlot.czas_wylotu = validDate   
        newState.departures_start_date = value   
        
        this.setState(newState)
        
    }

    handleDepartureFinishDatePickerChange(value) {    
        const validDate = moment(value).format('YYYY-MM-DD HH:mm')

        const newState = Object.assign({}, this.state)
        newState.newFlightData.odlot.czas_przylotu = validDate 
        newState.departures_finish_date = value  

        this.setState(newState)
    }

    addFlight(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')

        Axios.post('/loty', {
            // newFlightData
            dane_samolotu: this.state.newFlightData.dane_samolotu,
            przylot: this.state.newFlightData.przylot,
            odlot: this.state.newFlightData.odlot
        },
        {
            headers: {
                'x-access-token': token
            }
        })
        .then(res => {
            alert(res.data.wiadomosc)
        })
        .catch(err => {
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

        let airlinesOptions = this.state.airlines.map(
            (airline) => {
                return(
                <MDBDropdownItem 
                    key={airline.id_linii} 
                    id={airline.id_linii} 
                    onClick={ () => this.handleAirlineChange(airline.id_linii) }
                >
                    {airline.nazwa}
                </MDBDropdownItem>
                )               
                }
            )

        let airplanes = this.state.airplanes

        let airplanesOptions = airplanes.map(
            (airplane) => { 
                return(
                <MDBDropdownItem 
                    key={airplane.id_samolotu} 
                    id={airplane.id_samolotu}
                    onClick={ () => this.handleAirplaneChange(airplane.id_samolotu) }
                >
                    {airplane.nr_rejestracyjny}
                </MDBDropdownItem>
                )
            }
        )

        let airportsArrivals = this.state.airports.map(
            (airport) => {
                return (
                    <MDBDropdownItem
                        key={airport.id_lotniska}
                        id={airport.id_lotniska}
                        onClick={ () => this.handleArrivalAirportChange(airport.id_lotniska) }
                    >
                        {airport.nazwa}
                    </MDBDropdownItem>
                )
            }
        )

        let airportsDepartures = this.state.airports.map(
            (airport) => {
                return (
                    <MDBDropdownItem
                        key={airport.id_lotniska}
                        id={airport.id_lotniska}
                        onClick={ () => this.handleDepartureAirportChange(airport.id_lotniska) }
                    >
                        {airport.nazwa}
                    </MDBDropdownItem>
                )
            }
        )
                
        
        return (

            <MDBContainer className="FormRow">
                <MDBRow className="FormRow">
                    <MDBCol>
                        <MDBCard className="TextCentered">
                            <MDBCardHeader className="form-header blue-gradient rounded">
                                <h1 className="my-3 White">Dodaj loty</h1>
                                <h5>Aby dodać lot, musisz wybrać linię lotniczą oraz samolot, a także uzupełnić formularz przylotu i odlotu wybranego samolotu na/z lotnisko/-ska Kraków Airport im. Jana Pawła II.</h5>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <form>
                                <MDBRow className="FormRow">
                                <MDBCol></MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBDropdown>
                                            <MDBDropdownToggle caret color="primary">
                                                Linia lotnicza
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic>
                                             {airlinesOptions}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        {this.state.currentLineID ? 
                                            this.state.airlines.find(line => line.id_linii === this.state.currentLineID).nazwa
                                            : 'nie wybrano'
                                        }
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBDropdown>
                                            <MDBDropdownToggle caret color="primary">
                                               Samolot
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic>
                                                {airplanesOptions}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        {this.state.newFlightData.dane_samolotu.id_samolotu ? 
                                            this.state.airplanes.find(airplane => 
                                                airplane.id_samolotu === this.state.newFlightData.dane_samolotu.id_samolotu).nr_rejestracyjny
                                            : 'nie wybrano'
                                        }
                                    </MDBCol>
                                    <MDBCol></MDBCol>
                                </MDBRow>
                                <MDBRow className="FormRow ArrivalBackground">
                                    <MDBCol className="TextCentered">
                                    <h4 className="White">Uzupełnij formularz przylotu.</h4>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="FormRow">
                                    <MDBCol className="TextCentered">
                                        <MDBDropdown>
                                            <h6>Skąd:</h6>
                                            <MDBDropdownToggle caret color="primary">
                                               Lotnisko
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic>
                                                {airportsArrivals}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        {this.state.newFlightData.przylot.skad ? 
                                            this.state.airports.find(airport => 
                                                airport.id_lotniska === this.state.newFlightData.przylot.skad).nazwa
                                            : 'nie wybrano'
                                        }
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nr lotu"
                                            name="przylot"
                                            type="text"
                                            value={this.state.newFlightData.przylot.nr_lotu}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <h6>Data i godzina wylotu:</h6>
                                        <DatePicker 
                                            selected={this.state.arrivals_start_date}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="dd-MM-YYY HH:mm"
                                            timeCaption="time"
                                            onChange={ (e) => this.handleArrivalStartDatePickerChange(e) }
                                        >
                                        </DatePicker>
                                    </MDBCol>
                                    
                                    <MDBCol className="TextCentered">
                                        <h6>Data i godzina przylotu:</h6>
                                        <DatePicker 
                                            selected={this.state.arrivals_finish_date}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="dd-MM-YYY HH:mm"
                                            timeCaption="time"
                                            onChange={ (e) => this.handleArrivalFinishDatePickerChange(e) }
                                        >
                                        </DatePicker>
                                    </MDBCol>             
                                </MDBRow>
                                <MDBRow className="FormRow DepartureBackground">
                                    <MDBCol className="TextCentered">
                                    <h4 className="White">Uzupełnij formularz odlotu.</h4>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="FormRow">
                                    <MDBCol className="TextCentered">
                                        <h6>Dokąd:</h6>
                                        <MDBDropdown>
                                            <MDBDropdownToggle caret color="primary">
                                               Lotnisko
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu >
                                                {airportsDepartures}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        {this.state.newFlightData.odlot.dokad ? 
                                            this.state.airports.find(airport => 
                                                airport.id_lotniska === this.state.newFlightData.odlot.dokad).nazwa
                                            : 'nie wybrano'
                                        }
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nr lotu"
                                            name="odlot"
                                            type="text"
                                            value={this.state.newFlightData.odlot.nr_lotu}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <h6>Data i godzina wylotu:</h6>
                                        <DatePicker 
                                            selected={this.state.departures_start_date}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="dd-MM-YYY HH:mm"
                                            timeCaption="time"
                                            onChange={ (e) => this.handleDepartureStartDatePickerChange(e) }
                                        >
                                        </DatePicker>
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <h6>Data i godzina wylotu:</h6>
                                        <DatePicker 
                                            selected={this.state.departures_finish_date}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="dd-MM-YYY HH:mm"
                                            timeCaption="time"
                                            onChange={ (e) => this.handleDepartureFinishDatePickerChange(e) }
                                        >
                                        </DatePicker>
                                    </MDBCol>
                                </MDBRow>
        
                                <div className="text-center mt-4">
                                    <MDBBtn
                                    className="mb-3"
                                    type="submit"
                                    onClick={ (e) => this.addFlight(e) }
                                    >
                                    Dodaj lot
                                    </MDBBtn>
                                </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    };
}

export default AddFlight;

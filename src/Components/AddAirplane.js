import React, {Component} from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardHeader,} from 'mdbreact';
import './../App.css';
import Axios from 'axios';

class AddAirplane extends Component {

    constructor(props) {
        super(props)

        this.state = {

            airlines: [],

            newAirplane: {

                id_linii: '',
                model: '',
                nazwa: '',
                nr_rejestracyjny: '',
                liczba_miejsc: '',
                masa_startowa: ''
            }

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
    }

    handleAirlineChange(id) {
        const newState = Object.assign({}, this.state)
        newState.newAirplane.id_linii = id
        this.setState(newState)
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state)
        newState.newAirplane[event.target.name] = event.target.value
        this.setState(newState)
    }

    addAirplane(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        Axios.post('/samoloty', {
            
            id_linii: this.state.newAirplane.id_linii,
            model: this.state.newAirplane.model,
            nazwa: this.state.newAirplane.nazwa,
            nr_rejestracyjny: this.state.newAirplane.nr_rejestracyjny,
            liczba_miejsc: this.state.newAirplane.liczba_miejsc,
            masa_startowa: this.state.newAirplane.masa_startowa
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
        
        return (
            <MDBContainer className="FormRow">
                <MDBRow className="FormRow">
                    <MDBCol>
                        <MDBCard className="TextCentered">
                            <MDBCardHeader className="form-header blue-gradient rounded">
                                <h1 className="my-3 White">Dodaj samolot</h1>
                                <h5>Aby zarejestrować samolot, musisz wypełnić wszystkie pola poniższego formularza.</h5>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <form>
                                <MDBRow className="FormRow">
                                    <MDBCol className="TextCentered">
                                        <MDBDropdown>
                                            <MDBDropdownToggle caret color="primary">
                                                Linia lotnicza
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic>
                                             {airlinesOptions}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        {/* tutaj nazwa lini lotniczej  */}
                                        {this.state.newAirplane.id_linii ? 
                                            this.state.airlines.find(line => line.id_linii === this.state.newAirplane.id_linii).nazwa
                                            : 'nie wybrano'
                                        }
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Model"
                                            name="model"
                                            type="text"
                                            value={this.state.newAirplane.model}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nazwa"
                                            name="nazwa"
                                            type="text"
                                            value={this.state.newAirplane.nazwa}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nr rejestracyjny"
                                            name="nr_rejestracyjny"
                                            type="text"
                                            value={this.state.newAirplane.nr_rejestracyjny}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Liczba miejsc"
                                            name="liczba_miejsc"
                                            type="number"
                                            value={this.state.newAirplane.liczba_miejsc}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Masa startowa"
                                            name="masa_startowa"
                                            type="number"
                                            value={this.state.newAirplane.masa_startowa}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <div className="text-center mt-4">
                                    <MDBBtn
                                    className="mb-3"
                                    type="submit"
                                    onClick={(e) => this.addAirplane(e)}
                                    >
                                    Dodaj
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

export default AddAirplane;
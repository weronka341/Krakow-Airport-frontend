import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardHeader } from 'mdbreact';
import './../App.css';
import Axios from 'axios';

class AddAirport extends Component {

    constructor(props) {
        super(props)

        this.state = {

            newAirport: {

                nazwa: '',
                miasto: '', 
                kraj: '',
                IATA: '',
                ICAO: '',
                szer_geograficzna: '',
                dl_geograficzna: '',
                strefa_czasowa: ''
            }

        }
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')      
        }
    }

    handleInputChange(event) {
        const newState = Object.assign({}, this.state)
        newState.newAirport[event.target.name] = event.target.value
        this.setState(newState)
        console.log(this.state.newAirport[event.target.name])
    }

    addAirport(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        Axios.post('/lotniska', {
            
            nazwa: this.state.newAirport.nazwa,
            miasto: this.state.newAirport.miasto,
            kraj: this.state.newAirport.kraj,
            IATA: this.state.newAirport.IATA,
            ICAO: this.state.newAirport.ICAO,
            szer_geograficzna: this.state.newAirport.szer_geograficzna,
            dl_geograficzna: this.state.newAirport.dl_geograficzna,
            strefa_czasowa: this.state.newAirport.strefa_czasowa
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
        
        return (
            <MDBContainer className="FormRow">
                <MDBRow className="FormRow">
                    <MDBCol>
                        <MDBCard className="TextCentered">
                            <MDBCardHeader className="form-header blue-gradient rounded">
                                <h1 className="my-3 White">Dodaj lotnisko</h1>
                                <h5>Aby zarejestrować lotnisko, musisz wypełnić wszystkie pola poniższego formularza.</h5>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <form>
                                <MDBRow className="FormRow">
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nazwa"
                                            name="nazwa"
                                            type="text"
                                            value={this.state.newAirport.nazwa}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Miasto"
                                            name="miasto"
                                            type="text"
                                            value={this.state.newAirport.miasto}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Kraj"
                                            name="kraj"
                                            type="text"
                                            value={this.state.newAirport.kraj}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="IATA"
                                            name="IATA"
                                            type="text"
                                            value={this.state.newAirport.IATA}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="ICAO"
                                            name="ICAO"
                                            type="text"
                                            value={this.state.newAirport.ICAO}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Szer. geograficzna"
                                            name="szer_geograficzna"
                                            type="number"
                                            value={this.state.newAirport.szer_geograficzna}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Dł. geograficzna"
                                            name="dl_geograficzna"
                                            type="number"
                                            value={this.state.newAirport.dl_geograficzna}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Strefa czasowa"
                                            name="strefa_czasowa"
                                            type="text"
                                            value={this.state.newAirport.strefa_czasowa}
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
                                    onClick={ (e) => this.addAirport(e) }
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

export default AddAirport;
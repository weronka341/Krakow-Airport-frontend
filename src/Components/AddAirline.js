import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardHeader } from 'mdbreact';
import './../App.css';
import Axios from 'axios';

class AddAirline extends Component {

    constructor(props) {
        super(props)

        this.state = {

            newAirline: {

                nazwa: '',
                IATA: '',
                ICAO: '',
                znak_wywolawczy: '',
                kraj: ''
            }

        }
    }

    componentWillMount() {
        if(!localStorage.getItem('token')){
           
            this.props.history.replace('/zaloguj')      
        }
    }

    handleInputChange(e) {
        const newState = Object.assign({}, this.state)
        newState.newAirline[e.target.name] = e.target.value
        this.setState(newState)
        console.log(this.state.newAirline[e.target.name])
    }

    addAirline(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        Axios.post('/linie', {
            
            nazwa: this.state.newAirline.nazwa,
            IATA: this.state.newAirline.IATA,
            ICAO: this.state.newAirline.ICAO,
            znak_wywolawczy: this.state.newAirline.znak_wywolawczy,
            kraj: this.state.newAirline.kraj,
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
                                <h1 className="my-3 White">Dodaj linię lotniczą</h1>
                                <h5>Aby dodać linię, musisz wypełnić wszystkie pola poniższego formularza.</h5>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <form>
                                <MDBRow className="FormRow">
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Nazwa"
                                            name="nazwa"
                                            type="text"
                                            value={this.state.newAirline.nazwa}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="IATA"
                                            name="IATA"
                                            type="text"
                                            value={this.state.newAirline.IATA}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="ICAO"
                                            name="ICAO"
                                            type="text"
                                            value={this.state.newAirline.IACO}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Znak wywoławczy"
                                            name="znak_wywolawczy"
                                            type="text"
                                            value={this.state.newAirline.znak_wywolawczy}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                    <MDBCol className="TextCentered">
                                        <MDBInput
                                            label="Kraj"
                                            name="kraj"
                                            type="text"
                                            value={this.state.newAirline.kraj}
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(e) => this.handleInputChange(e)}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <div className="text-center mt-4">
                                    <MDBBtn
                                    className="mb-3"
                                    type="submit"
                                    onClick={(e) => this.addAirline(e)}
                                    >
                                    Dodaj linię
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

export default AddAirline;
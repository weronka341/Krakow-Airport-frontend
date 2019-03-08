import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBBtn } from "mdbreact";
import { Link } from 'react-router-dom';

import './../App.css';

class Panel extends Component {

    render() {
        return (
            <div>
                <MDBContainer className="PanelSpace"> 
                    <MDBCard className="card-body TextCentered" style={{ width: "100%"}}>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">
                            <Link to="/dodajLot">
                                <button type="button" className="AddFlightButton" >
                                    Dodaj nowy lot
                                </button>
                            </Link>
                            </MDBCardTitle>
                            <MDBCardText>
                                W tym miejscu możesz dodać nowy lot - czyli zamówić przylot i odlot samolotu wybranej linii na lotnisko Kraków Airport.
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
                <MDBContainer className="PanelSpace">
                    <MDBCardGroup deck>
                        <MDBCard className="TextCentered">
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">
                                    <MDBBtn color="primary" href="/dodajSamolot"> Dodaj nowy samolot </MDBBtn>
                                </MDBCardTitle>
                                <MDBCardText>
                                    Jeśli chcesz dodać lot, który odbywa się nowym samolotem danej linii lotniczej, musisz najpierw zarejestrować go w bazie.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="TextCentered">
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">
                                    <MDBBtn color="primary" href="/dodajLinie"> Dodaj nową linię </MDBBtn>
                                </MDBCardTitle>
                                <MDBCardText>
                                    W tym miejscu możesz dodać do bazy nową linię lotniczą, która rozpoczęła współpracę z lotniskiem Kraków Airport.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                        <MDBCard className="TextCentered">
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">
                                    <MDBBtn color="primary" href="/dodajLotnisko"> Dodaj nowe lotnisko </MDBBtn>
                                </MDBCardTitle>
                                <MDBCardText>
                                    Jeśli chcesz wprowadzić lot do/z miejsca dotychczas nieobsługiwanego przez linie lotnicze współpracujące z Kraków Airport, musisz najpierw zarejestrować nowe lotnisko w bazie.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCardGroup>
                </MDBContainer>
            </div>
        );
    };
}

export default Panel;


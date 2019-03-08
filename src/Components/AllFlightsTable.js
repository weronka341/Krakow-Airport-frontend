import React, {Component} from 'react';
import { Button } from 'mdbreact';
import { Table } from 'semantic-ui-react'

class TodayFlightsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    showModal(e) {
        this.props.showModal(e)
    }

    deleteFlight(e) {
        this.props.deleteFlight(e)
    }

    render(){

        return(
            <Table celled striped textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Czas_rozkł.
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Kierunek
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Rejs
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Pas
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Więcej
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Usuń
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.rows.map(
                        (flight) => {
                            return (
                                <Table.Row key={flight.id_lotu}>
                                    <Table.Cell>
                                        {flight.godzina_przylotu}
                                    </Table.Cell>
                                    <Table.Cell id={flight.id_lotniska}>
                                        {flight.kierunek}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {flight.nr_lotu}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {flight.id_pasu_startowego}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button className="Button" id={flight.id_lotu} onClick={(e) => this.showModal(e)}>></Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button className="Button" color="red" id={flight.id_lotu} onClick={(e) => this.deleteFlight(e)}>x</Button>
                                    </Table.Cell>
                                </Table.Row>                             
                            )
                        })
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default TodayFlightsTable
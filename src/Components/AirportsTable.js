import React, {Component} from 'react';
import { Button } from 'mdbreact';
import { Table } from 'semantic-ui-react'

class AirportsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    deleteAirport(e) {
        this.props.deleteAirport(e)
    }

    render(){

        return(
            <Table celled striped textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Nazwa
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Miasto
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Kraj
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            IATA
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            ICAO
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Szerokość geograficzna
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Długość geograficzna
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Strefa czasowa
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Usuń
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.rows.map(
                        (airport) => {
                            return (
                                <Table.Row key={airport.id_lotniska}>
                                    <Table.Cell>
                                        {airport.nazwa}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.miasto}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.kraj}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.iata}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.icao}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.szer_geograficzna}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.dl_geograficzna}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airport.strefa_czasowa}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button className="Button" color="red" id={airport.id_lotniska} onClick={(e) => this.deleteAirport(e)}>x</Button>
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

export default AirportsTable
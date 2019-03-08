import React, {Component} from 'react';
import { Button } from 'mdbreact';
import { Table } from 'semantic-ui-react'

class AirlinesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    showFleet(e) {
        this.props.showFleet(e)
    }

    deleteLine(e) {
        this.props.deleteLine(e)
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
                            IATA
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            ICAO
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Znak wywoławczy
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Kraj
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Flota
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Usuń
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.rows.map(
                        (airline) => {
                            return (
                                <Table.Row key={airline.id_linii}>
                                    <Table.Cell>
                                        {airline.nazwa}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airline.iata}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airline.icao}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airline.znak_wywolawczy}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {airline.kraj}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button className="Button" id={airline.id_linii} onClick={(e) => this.showFleet(e)}>F</Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button className="Button" color="red" id={airline.id_linii} onClick={(e) => this.deleteFlight(e)}>x</Button>
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

export default AirlinesTable
import React, {Component} from 'react';
import { Table } from 'semantic-ui-react'

class PaymentsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
        };
    }

    render(){

        return(
            <Table celled striped textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Rok
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Miesiąc
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Linia
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Łączna masa startowa KG
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Liczba pasażerów
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Liczba lotów
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Czas na lotnisku (minuty)
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Saldo PLN
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.rows.map(
                        (payment) => {
                            return (
                                <Table.Row key={payment.miesiac.toString() + payment.rok.toString() + payment.nazwa_linii.toString()}>
                                    <Table.Cell>
                                        {payment.rok}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.miesiac}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.nazwa_linii}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.laczna_masa_startowa_kg}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.liczba_pasazerow}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.liczba_lotow}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.minuty_na_lotnisku}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {payment.saldo}
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

export default PaymentsTable
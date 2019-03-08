import React, { Component } from 'react';
import Axios from 'axios';
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardHeader, MDBBtn,  } from 'mdbreact';
import { Button, Grid, Icon } from 'semantic-ui-react'
import './../App.css';
import PaymentsTable from './PaymentsTable'


class Payments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            filtered: [],
            pageNumber: 1,
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('token')
        if(!token){
           
            this.props.history.replace('/zaloguj')
              
        }
    
        Axios.get(`/oplaty`, {
            
            headers: {
                'x-access-token': token
            }
        })
        .then((response) => {
            this.setState({
                payments: response.data.wszystkieOplaty,
                filtered: this.state.payments.slice(0, 20)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidUpdate() {   
        Axios.get(`/oplaty`)
        .then((response) => {
            this.setState({
                payments: 
                response.data.wszystkieOplaty,
                filtered: this.state.payments.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20))
            })
        })
    }

    filterFlights() {
        this.setState({
            filtered: this.state.payments.slice(((this.state.pageNumber - 1) * 20), (this.state.pageNumber * 20)),
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
          <h3 className="white-text mx-3">Naliczone opłaty dla linii lotniczych</h3>
          <div>
            <MDBBtn outline rounded size="sm" color="white" className="px-2">
              <i className="fa fa-plane mt-0"></i>
            </MDBBtn>
          </div>
        </MDBCardHeader>
        <MDBCardBody cascade>
        <MDBContainer fluid>
            <MDBRow>
                <PaymentsTable 
                    rows={this.state.filtered} 
                    filterFlights={this.filterFlights.bind(this)}
                >
                </PaymentsTable>
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
  
export default Payments;
import React from 'react';
import { Form, Grid, Segment, Header, Message, Table } from 'semantic-ui-react'
import LoadSampleButton from './loadSampleButton'

class CalcForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: '',
      realTimeUpdates: '',
      connectionMinutes: '',
      userCount: '',
      transferCharges: '',
      totalCost: 0,
      operationsLabel: 'Query and Data Modification Operations',
      transferChargesLabel: 'Data Transfer Charges (GB)',
      realTimeUpdatesLabel: 'Real-time Updates',
      connectionMinutesLabel: 'Connectivity Minutes'
    };
  }

  handleCalculations = (event) => {
    if (event.target.value !== '') {
      this.setState({
        [event.target.name]: event.target.value
      }, () => this.checkCalculation());
    }
    else {
      this.setState({
        [event.target.name]: ''
      });
    }
  }

  checkCalculation = () => {
    if( this.state.operations && this.state.realTimeUpdates && 
        this.state.connectionMinutes && this.state.userCount ) {
        let cost = 0;
        let operationCharges = 0;
        let realTimeUpdatesCharges = 0
        let connectionMinutes = 0
        let transferCharges = 0

        operationCharges = (this.state.userCount * this.state.operations * 4) / 1000000;
        transferCharges = this.state.transferCharges * 0.09; // US West (Oregon)
        realTimeUpdatesCharges = (this.state.userCount * this.state.realTimeUpdates * 2) / 1000000;
        connectionMinutes = (this.state.userCount * this.state.connectionMinutes * 0.08) / 1000000;
        cost = operationCharges + transferCharges + realTimeUpdatesCharges + connectionMinutes
        cost = parseFloat(Math.round(cost * 100) / 100).toFixed(2)

        this.setState({
          totalCost: cost,
          operationsLabel: 'Query and Data Modification Operations - $' +  parseFloat(Math.round(operationCharges * 100) / 100).toFixed(2),
          transferChargesLabel: 'Data Transfer Charges (GB) - $' + parseFloat(Math.round(transferCharges * 100) / 100).toFixed(2),
          realTimeUpdatesLabel: 'Real-time Updates - $' + parseFloat(Math.round(realTimeUpdatesCharges * 100) / 100).toFixed(2),
          connectionMinutesLabel: 'Connectivity Minutes - $' + parseFloat(Math.round(connectionMinutes * 100) / 100).toFixed(2) 
        })
    }
  }

  populateSample = (value) => {
    this.setState(value, () => this.checkCalculation())
  };

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={12}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Get Started
                </Header>
                <Message id="calc">
                  <Message.Header>Instructions</Message.Header>
                  <p>
                    Update all fields below or populate the fields with a sample scenario below.
                  </p>
                  <Message.Header>Notes</Message.Header>
                  <p> Pricing is based on <a href="https://aws.amazon.com/appsync/pricing/">AWS Appsync Pricing.</a> Data transfer rates are based on the Region US West (Oregon) - 0.09 per/GB.
                  </p>
                </Message>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
                <Grid.Column width={10}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input 
                      label={this.state.operationsLabel}
                      value={this.state.operations}
                      onChange={this.handleCalculations}
                      type="number"
                      name="operations"
                      className="operations"
                    />
                    <Form.Input 
                      label={this.state.transferChargesLabel}
                      value={this.state.transferCharges}
                      onChange={this.handleCalculations}
                      type="number"
                      name="transferCharges"
                      className="transferCharges"
                    />
                    <Form.Input 
                        label={this.state.realTimeUpdatesLabel}
                        value={this.state.realTimeUpdates}
                        onChange={this.handleCalculations}
                        type="number"
                        name="realTimeUpdates"
                        className="realTimeUpdates"
                      />
                    <Form.Input 
                        label={this.state.connectionMinutesLabel}
                        value={this.state.connectionMinutes}
                        onChange={this.handleCalculations}
                        type="number"
                        name="connectionMinutes"
                        className="connectionMinutes"
                      />
                    <Form.Input 
                        label='Total Users'
                        value={this.state.userCount}
                        onChange={this.handleCalculations}
                        type="number"
                        name="userCount"
                        className="userCount"
                      />
                    <Form.Input 
                        label='Cost'
                        value={this.state.totalCost}
                        name="totalCost"
                        className="totalCost"
                        readOnly
                      />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '1.5em', }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={12}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Sample Scenarios
            </Header>
            <Message>
              <Message.Header>Scenario 1</Message.Header>
              <p>
                A chat application has 2,500 monthly active users. Each user has the app open for
                an average 1,500 minutes per month, posts 1,000 messages per month, and receives
                1,000 messages per month from other users. This results in 2,500,000 data modification
                operations per month and 2,500,000 real-time updates per month. 
              </p> 

                <Table striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        Data modification operation charges
                      </Table.Cell>
                      <Table.Cell>
                        2,500 users x 1,000 sent messages x $4.00 per million operations = {<strong>$10.00</strong>}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        Data transfer charges	
                      </Table.Cell>
                      <Table.Cell>
                        1KB X 2.5 million – 2.5 million KB = 2.4GB X $0.09 = {<strong>$0.21</strong>}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        Real-time update charges
                      </Table.Cell>
                      <Table.Cell>
                        2,500 users X 1,000 received messages X $2.00 per million updates = {<strong>$5.00</strong>}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        Connectivity charges
                      </Table.Cell>
                      <Table.Cell>
                        2,500 clients x 1,500 minutes x $0.08 per million connection-minutes = {<strong>$0.30</strong>}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>
                        Total AppSync charges
                      </Table.Cell>
                      <Table.Cell>
                        $10.00 + $0.21 + $5.00 + $0.30 = {<strong>$15.51</strong>}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <LoadSampleButton sampleCallback={this.populateSample} 
                            operations={1000} 
                            realTimeUpdates={1000}
                            connectionMinutes={1500}
                            userCount={2500}
                            transferCharges={2.4} 
                            jump="calc"
                            />
              </Message>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default CalcForm;
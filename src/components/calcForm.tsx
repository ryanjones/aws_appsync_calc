import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Grid, Segment, Header, Message, Table, Button } from 'semantic-ui-react'

function CalcForm() {
  const [operations, setOperations] = useState<number>(0);
  const [realTimeUpdates, setRealTimeUpdates] = useState<number>(0);
  const [connectionMinutes, setConnectionMinutes] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [transferCharges, setTransferCharges] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [operationsLabel, setOperationsLabel] = useState<string>('Query and Data Modification Operations');
  const [transferChargesLabel, setTransferChargesLabel] = useState<string>('Data Transfer Charges (GB)');
  const [realTimeUpdatesLabel, setRealTimeUpdatesLabel] = useState<string>('Real-time Updates');
  const [connectionMinutesLabel, setConnectionMinutesLabel] = useState<string>('Connectivity Minutes');

  useEffect(() => {
    checkCalculation();
  });

  const handleCalculations = (e: ChangeEvent<HTMLInputElement>) => {
    let eventName = e.target.name;
    let eventValue = Number(e.target.value);
    if (eventName === "operations") {
      setOperations(eventValue)
    }
    if (eventName === "transferCharges") {
      setTransferCharges(eventValue)
    }
    if (eventName === "realTimeUpdates") {
      setRealTimeUpdates(eventValue)
    }
    if (eventName === "connectionMinutes") {
      setConnectionMinutes(eventValue)
    }
    if (eventName === "userCount") {
      setUserCount(eventValue)
    }

    checkCalculation();
  }

  const checkCalculation = () => {
    if (operations && realTimeUpdates &&
      connectionMinutes && userCount) {
      let costLabel: number = 0;
      let operationChargesLabel: number = 0;
      let realTimeUpdatesChargesLabel: number = 0;
      let connectionMinutesLabel: number = 0;
      let transferChargesLabel: number = 0;

      operationChargesLabel = (userCount * operations * 4) / 1000000;
      transferChargesLabel = transferCharges * 0.09; // US West (Oregon)
      realTimeUpdatesChargesLabel = (userCount * realTimeUpdates * 2) / 1000000;
      connectionMinutesLabel = (userCount * connectionMinutes * 0.08) / 1000000;
      costLabel = operationChargesLabel + transferChargesLabel + realTimeUpdatesChargesLabel + connectionMinutesLabel;
      costLabel = Math.round(costLabel * 100) / 100;

      setTotalCost(costLabel);
      setOperationsLabel('Query and Data Modification Operations - $' + parseFloat(String(Math.round(operationChargesLabel * 100) / 100)).toFixed(2));
      setTransferChargesLabel('Data Transfer Charges (GB) - $' + parseFloat(String(Math.round(transferChargesLabel * 100) / 100)).toFixed(2));
      setRealTimeUpdatesLabel('Real-time Updates - $' + parseFloat(String(Math.round(realTimeUpdatesChargesLabel * 100) / 100)).toFixed(2));
      setConnectionMinutesLabel('Connectivity Minutes - $' + parseFloat(String(Math.round(connectionMinutesLabel * 100) / 100)).toFixed(2));
    }
  }

  const populateSampleData = () => {
    setOperations(1000);
    setRealTimeUpdates(1000);
    setConnectionMinutes(1500);
    setUserCount(2500);
    setTransferCharges(2.4);
  };

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
              <Form >
                <Form.Input
                  label={operationsLabel}
                  value={operations}
                  onChange={handleCalculations}
                  type="number"
                  name="operations"
                  className="operations"
                />
                <Form.Input
                  label={transferChargesLabel}
                  value={transferCharges}
                  onChange={handleCalculations}
                  type="number"
                  name="transferCharges"
                  className="transferCharges"
                />
                <Form.Input
                  label={realTimeUpdatesLabel}
                  value={realTimeUpdates}
                  onChange={handleCalculations}
                  type="number"
                  name="realTimeUpdates"
                  className="realTimeUpdates"
                />
                <Form.Input
                  label={connectionMinutesLabel}
                  value={connectionMinutes}
                  onChange={handleCalculations}
                  type="number"
                  name="connectionMinutes"
                  className="connectionMinutes"
                />
                <Form.Input
                  label='Total Users'
                  value={userCount}
                  onChange={handleCalculations}
                  type="number"
                  name="userCount"
                  className="userCount"
                />
                <Form.Input
                  label='Cost'
                  value={totalCost}
                  name="totalCost"
                  className="totalCost"
                  readOnly={true}
                  disabled={true}
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
                <Button onClick={populateSampleData}>Populate Sample Data</Button>
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

export default CalcForm;
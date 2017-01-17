import React, { PureComponent } from 'react';
import Button from 'ak-button';
import ButtonGroup from 'ak-button-group';

import { Grid, GridColumn } from '../src';


export default class Dummy extends PureComponent {
  render = () => (
    <Grid spacing="cosy">
      <GridColumn>
        <h1>Commit</h1>
      </GridColumn>
      <GridColumn>
        <ButtonGroup>
          <Button>Approve</Button>
          <Button>Decline</Button>
          <Button>Edit</Button>
        </ButtonGroup>
      </GridColumn>
    </Grid>
  );
}

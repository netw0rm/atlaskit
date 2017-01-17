import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Grid, GridColumn } from '../src';


const DummyBlock = styled.div`
  background: black;
  height: 32px;
  width: 32px;
`;

const DummyActions = styled.div`
  background: blue;
  height: 24px;
  width: 40px;
`;

export default class Dummy extends PureComponent {
  render = () => (
    <Grid spacing="cosy">
      <GridColumn medium={2}>
        <DummyBlock />
      </GridColumn>
      <GridColumn>
        <p>Lorem ipsum</p>
      </GridColumn>
      <GridColumn medium={2}>
        <DummyActions />
      </GridColumn>
    </Grid>
  );
}

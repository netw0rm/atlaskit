import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { Page, Grid, GridColumn } from '../src';
import { name } from '../package.json';


const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('grid spacing', () => (
    <Page>
      <h1>spacing=cosy (default)</h1>
      <Grid>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid layout="fluid">
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <h1>spacing=compact</h1>
      <Grid spacing="compact">
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid spacing="compact" layout="fluid">
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <h1>spacing=comfortable</h1>
      <Grid spacing="comfortable">
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid spacing="comfortable" layout="fluid">
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
    </Page>
  ));

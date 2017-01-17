import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { Page, Grid, GridColumn } from '../src';
import { name } from '../package.json';


const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('grid layouts', () => (
    <Page>
      <h1>layout=fixed (default)</h1>
      <Grid>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
      </Grid>
      <h1>layout=fluid (default)</h1>
      <Grid layout="fluid">
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
      </Grid>
      <p>More combinations</p>
      <Grid layout="fluid">
        <GridColumn medium={10}><div style={dummyStyles}>10 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
      </Grid>
      <p>More combinations</p>
      <Grid layout="fluid">
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
    </Page>
  ));

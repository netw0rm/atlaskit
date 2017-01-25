import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('grid layout="fixed" (default)', () => (
    <Page>
      <Grid>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
      </Grid>
    </Page>
  ))
  .add('grid layout="fluid"', () => (
    <Page>
      <Grid layout="fluid">
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>Unspecified</div></GridColumn>
      </Grid>
    </Page>
  ));

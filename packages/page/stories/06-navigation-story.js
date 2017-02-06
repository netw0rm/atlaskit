import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Navigation from '@atlaskit/navigation';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('navigation', () => (
    <Page
      navigation={<Navigation />}
    >
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
      <p>This story is used to verify that page works correctly with navigation.</p>
    </Page>
  ));

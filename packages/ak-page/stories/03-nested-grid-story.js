import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('nested grids', () => (
    <Page>
      <Grid spacing={'cosy'}>
        <GridColumn medium={8}>
          <div style={dummyStyles}>
            8 col
            <Grid>
              <GridColumn medium={4}>4 col</GridColumn>
              <GridColumn medium={4}>4 col</GridColumn>
            </Grid>
          </div>
        </GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
    </Page>
  ))
  .add('nested grids with oversized column', () => (
    <Page>
      <Grid>
        <GridColumn medium={8}>
          <div style={dummyStyles}>
            8 col
            <Grid>
              <GridColumn medium={10}>10 col</GridColumn>
              <GridColumn medium={10}>10 col</GridColumn>
            </Grid>
          </div>
        </GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
    </Page>
  ));

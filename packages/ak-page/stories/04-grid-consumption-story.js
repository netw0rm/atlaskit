import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { Page, Grid, GridColumn } from '../src';
import Dummy from './dummy-component';
import { name } from '../package.json';


storiesOf(name, module)
  .add('using grid within components', () => (
    <Page>
      <h1>layout=fixed (default)</h1>
      <Grid>
        <GridColumn medium={10}>
          <Dummy />
        </GridColumn>
        <GridColumn medium={2}>Column</GridColumn>
      </Grid>
      <Grid layout="fluid">
        <GridColumn medium={10}>
          <Dummy />
        </GridColumn>
        <GridColumn medium={2}>Column</GridColumn>
      </Grid>
    </Page>
  ));

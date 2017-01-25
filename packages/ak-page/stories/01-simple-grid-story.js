import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const dummyStyles = {
  background: '#fea',
};

storiesOf(name, module)
  .add('column sizes', () => (
    <Page>
      <Grid><GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={7}><div style={dummyStyles}>7 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={8}><div style={dummyStyles}>8 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={9}><div style={dummyStyles}>9 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={10}><div style={dummyStyles}>10 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={11}><div style={dummyStyles}>11 col</div></GridColumn></Grid>
      <Grid><GridColumn medium={12}><div style={dummyStyles}>12 col</div></GridColumn></Grid>
    </Page>
  ))
  .add('column sizes combined', () => (
    <Page>
      <Grid>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
      </Grid>
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
      <Grid>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={7}><div style={dummyStyles}>7 col</div></GridColumn>
        <GridColumn medium={5}><div style={dummyStyles}>5 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={8}><div style={dummyStyles}>8 col</div></GridColumn>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={9}><div style={dummyStyles}>9 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={10}><div style={dummyStyles}>10 col</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={11}><div style={dummyStyles}>11 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={12}><div style={dummyStyles}>12 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn><div style={dummyStyles}>unspecified col</div></GridColumn>
      </Grid>
    </Page>
  ))
  .add('column "elasticity"', () => (
    <Page>
      <Grid>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
    </Page>
  ))
  .add('column wrapping', () => (
    <Page>
      <Grid>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
        <GridColumn medium={8}><div style={dummyStyles}>8 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
      </Grid>
    </Page>
  ))
  .add('multiple unspecified columns', () => (
    <Page>
      <Grid>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={4}><div style={dummyStyles}>4 col</div></GridColumn>
        <GridColumn medium={3}><div style={dummyStyles}>3 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn medium={1}><div style={dummyStyles}>1 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
        <GridColumn><div style={dummyStyles}>1</div></GridColumn>
      </Grid>
    </Page>
  ));

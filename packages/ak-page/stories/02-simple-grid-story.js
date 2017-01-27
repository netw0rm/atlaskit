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
      <p>This story is used to verify the widths and margins of the 12 different columns</p>
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
      <p>This story is used to verify that rows full of columns that add up to 12 all sit on the same line without wrappping.</p>
    </Page>
  ))
  .add('column "elasticity"', () => (
    <Page>
      <Grid>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
        <GridColumn medium={2}><div style={dummyStyles}>2 col</div></GridColumn>
      </Grid>
      <p>This story is used to verify that columns without specified columns "stretch" to fill available space on a row.</p>
    </Page>
  ))
  .add('column wrapping', () => (
    <Page>
      <Grid>
        <GridColumn medium={6}><div style={dummyStyles}>6 col</div></GridColumn>
        <GridColumn medium={8}><div style={dummyStyles}>8 col</div></GridColumn>
        <GridColumn><div style={dummyStyles}>unspecified</div></GridColumn>
      </Grid>
      <p>This story is used to verify that 2 columns adding up to greater than 12 don't overflow the grid.</p>
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
      <p>This story is used to verify that columns without a specified column prop (eg medium="4") behave like normal flexbox items.</p>
    </Page>
  ));

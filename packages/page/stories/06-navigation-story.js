import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Navigation from '@atlaskit/navigation';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;

storiesOf(name, module)
  .add('navigation', () => (
    <Page
      navigation={<Navigation />}
    >
      <Grid>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid layout="fluid">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={2}><Dummy>LHS</Dummy></GridColumn>
        <GridColumn medium={8}>
          <Dummy><Lorem count={30} /></Dummy>
        </GridColumn>
        <GridColumn medium={2}><Dummy>RHS</Dummy></GridColumn>
      </Grid>
    </Page>
  ));

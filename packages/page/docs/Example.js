import React, { PureComponent } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';

const Color = styled.div`
  background: #fea;
`;

export default class NavExample extends PureComponent {

  render() {
    return (
      <Page>
        <Grid>
          <Grid><GridColumn medium={1}><Color>1 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={2}><Color>2 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={3}><Color>3 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={4}><Color>4 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={5}><Color>5 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={6}><Color>6 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={7}><Color>7 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={8}><Color>8 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={9}><Color>9 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={10}><Color>10 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={11}><Color>11 col</Color></GridColumn></Grid>
          <Grid><GridColumn medium={12}><Color>12 col</Color></GridColumn></Grid>
        </Grid>
      </Page>
    );
  }
}

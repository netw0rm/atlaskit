import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Navigation from '@atlaskit/navigation';
import Banner from '@atlaskit/banner';
import AkToggle from '@atlaskit/toggle';
import styled from 'styled-components';
import Lorem from 'react-lorem-component';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;

class ToggleBannerPage extends React.PureComponent {
  state = {
    isBannerOpen: false,
    navigationWidth: 284,
  }

  render() {
    return (
      <Page
        isBannerOpen={this.state.isBannerOpen}
        navigationWidth={this.state.navigationWidth}
        banner={
          <Banner
            appearance="error"
            isOpen={this.state.isBannerOpen}
          >
            Your JIRA OnDemand license is about to expire.
            There are two days left to renew your license
          </Banner>
        }
        navigation={
          <Navigation
            width={this.state.navigationWidth}
            isOpen={this.state.isNavigationOpen}
            onResize={({ width, isOpen }) => {
              this.setState({
                navigationWidth: width,
                isNavigationOpen: isOpen,
              });
            }}
          >
            Hello world
          </Navigation>
        }
      >
        <Grid>
          <GridColumn>
            <p>Toggle banner</p>
            <AkToggle
              size="large"
              onChange={() => {
                this.setState({
                  isBannerOpen: !this.state.isBannerOpen,
                });
              }}
            >Toggle banner</AkToggle>
          </GridColumn>
        </Grid>
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
    );
  }
}

storiesOf(name, module)
  .add('navigation', () => (
    <ToggleBannerPage />
  ));

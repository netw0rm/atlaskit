import React from 'react';
import BasicNavigation from './BasicNavigation';

import Banner from '@atlaskit/banner';
import Button from '@atlaskit/button';

import Page, { Grid, GridColumn } from '@atlaskit/page';

export default class ToggleBannerPage extends React.PureComponent {
  state = {
    isBannerOpen: false,
  }

  render() {
    return (
      <Page
        isBannerOpen={this.state.isBannerOpen}
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
          <BasicNavigation topOffset={this.state.isBannerOpen ? 52 : 0} />
        }
      >
        <Grid>
          <GridColumn>
            <p>Toggle banner</p>
            <Button
              onClick={() => {
                this.setState({
                  isBannerOpen: !this.state.isBannerOpen,
                });
              }}
            >Banner is: {this.state.isBannerOpen ? 'open' : 'closed'}</Button>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

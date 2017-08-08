import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AkAvatar from '@atlaskit/avatar';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import ListIcon from '@atlaskit/icon/glyph/list';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import Tooltip from '@atlaskit/tooltip';
import { name } from '../package.json';
import { AkGlobalItem, presetThemes } from '../src/';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import emmaAvatar from './emma.png';

import Navigation from '@atlaskit/navigation';
import Banner from '@atlaskit/banner';
import Button from '@atlaskit/button';

import Page, { Grid, GridColumn } from '@atlaskit/page';

class ToggleBannerPage extends React.PureComponent {
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
          <Navigation
            topOffset={this.state.isBannerOpen ? 52 : 0}
            width={this.state.navigationWidth}
            isOpen={this.state.isNavigationOpen}
            globalSecondaryActions={[
              <AkGlobalItem>
                <SettingsIcon label="Settings" secondaryColor="inherit" />
              </AkGlobalItem>,
              <AkGlobalItem>
                <ListIcon label="Some super cool list" secondaryColor="inherit" />
              </AkGlobalItem>,
              <AkGlobalItem>
                <QuestionCircleIcon label="Help icon" secondaryColor="inherit" />
              </AkGlobalItem>,
              <AkGlobalItem>
                <AkAvatar size="small" src={emmaAvatar} />
              </AkGlobalItem>,
            ]}
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

storiesOf(name, module)
  .add('with no secondary actions', () => (
    <HtmlPage>
      <BasicNavigation
        globalSecondaryActions={[]}
      />
    </HtmlPage>
  ))
  .add('with four secondary actions', () => (
    <HtmlPage>
      <BasicNavigation
        globalSecondaryActions={[
          <AkGlobalItem>
            <SettingsIcon label="Settings" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <ListIcon label="Some super cool list" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <AkAvatar size="small" src={emmaAvatar} />
          </AkGlobalItem>,
        ]}
      />
    </HtmlPage>
  ))
  .add('with log in button', () => (
    <HtmlPage>
      <BasicNavigation
        containerTheme={presetThemes.global}
        globalSecondaryActions={[
          <Tooltip position="right" description="Sign in">
            <AkGlobalItem>
              <SignInIcon label="Sign in" size="medium" />
            </AkGlobalItem>
          </Tooltip>,
        ]}
      />
    </HtmlPage>
  ))
  .add('with a banner at the top of the page', () => (
    <ToggleBannerPage />
  ));

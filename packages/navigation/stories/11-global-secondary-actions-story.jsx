import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AkAvatar from '@atlaskit/avatar';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import ListIcon from '@atlaskit/icon/glyph/list';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import Tooltip from '@atlaskit/tooltip';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import AkAppSwitcher from '@atlaskit/app-switcher';
import { name } from '../package.json';
import { AkGlobalItem, presetThemes } from '../src/';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import ToggleBannerPage from './components/withBannerAndTopOffset';
import emmaAvatar from './emma.png';
import nucleus from './nucleus.png';

const appswitcherProps = {
  recentContainers: [
    {
      name: 'Recent container',
      url: 'https://instance.atlassian.net/view/container',
      iconUrl: nucleus,
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://instance.atlassian.net/',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://instance.atlassian.net/wiki',
        product: 'confluence',
      },
    ],
    error: false,
  },
  isAnonymousUser: false,
  suggestedApplication: {
    show: true,
    application: 'confluence',
    url: 'https://www.atlassian.com/confluence',
  },
  i18n: {
    home: 'Home',
    apps: 'Apps',
    configure: 'Configure',
    recent: 'Recent',
    'try.other.apps': 'Try Other Atlassian Apps',
    'try.lozenge': '',
    'don\'t.show.this.again': 'Don’t show this again',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'suggested.application.description.confluence': 'Collaboration and content sharing',
    'suggested.application.description.jira': 'Issue & project tracking software',
    'applinks.error': 'Unable to load linked applications.',
  },
  isDropdownOpenInitially: true,
  trigger: (isOpen) => <AkGlobalItem isSelected={isOpen}><MenuIcon label="App Switcher" /></AkGlobalItem>,
  dropdownOptions: {
    position: 'right bottom',
  },
};

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
            <AkAvatar size="small" src={emmaAvatar} borderColor="transparent" />
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
  ))
  .add('with app-switcher', () => (
    <HtmlPage>
      <BasicNavigation
        globalSecondaryActions={[
          <AkGlobalItem>
            <SettingsIcon label="Settings" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkAppSwitcher {...appswitcherProps} />,
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <AkAvatar size="small" src={emmaAvatar} borderColor="transparent" />
          </AkGlobalItem>,
        ]}
      />
    </HtmlPage>
   ));

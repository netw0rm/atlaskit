import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Page from '@atlaskit/page';
import { AkContainerLogo } from '@atlaskit/navigation';
import {
  AtlassianWordmark,
  BitbucketWordmark,
  ConfluenceWordmark,
  HipchatWordmark,
  JiraCoreWordmark,
  JiraWordmark,
  JiraServiceDeskWordmark,
  JiraSoftwareWordmark,
  StatuspageWordmark,
  StrideWordmark,
} from '@atlaskit/logo';

import { name } from '../package.json';
import BasicNavigation from './components/BasicNavigation';
import { presetThemes } from '../src/index';

storiesOf(`${name} - logos`, module)
.add('Atlassian', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><AtlassianWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Bitbucket', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><BitbucketWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Confluence', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><ConfluenceWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Hipchat', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><HipchatWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Jira Core', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><JiraCoreWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Jira', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><JiraWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Jira ServiceDesk', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><JiraServiceDeskWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Jira Software', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><JiraSoftwareWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Statuspage', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><StatuspageWordmark /></AkContainerLogo>
        )}
      />
    }
  />
))
.add('Stride', () => (
  <Page
    navigation={
      <BasicNavigation
        containerTheme={presetThemes.global}
        containerHeaderComponent={() => (
          <AkContainerLogo><StrideWordmark /></AkContainerLogo>
        )}
      />
    }
  />
));

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AkAvatar from '@atlaskit/avatar';
import { SettingsIcon, QuestionCircleIcon, ListIcon } from '@atlaskit/icon';
import { name } from '../package.json';
import { AkGlobalItem } from '../src/';
import Page from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import emmaAvatar from './emma.png';

storiesOf(name, module)
  .add('with no secondary actions', () => (
    <Page>
      <BasicNavigation
        globalSecondaryActions={[]}
      />
    </Page>
  ))
  .add('with four secondary actions', () => (
    <Page>
      <BasicNavigation
        globalSecondaryActions={[
          <AkGlobalItem>
            <SettingsIcon label="Settings" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <ListIcon label="Some super cool list" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <AkAvatar size="small" src={emmaAvatar} />
          </AkGlobalItem>,
        ]}
      />
    </Page>
  ));

import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tabs from '@atlaskit/tabs';
import { Header } from '../src';

/* eslint-disable import/first, import/no-duplicates */
import ReadmeExample from './examples/readme';
/* eslint-enable import/first, import/no-duplicates */

storiesOf('Header', module)
  .add('Standalone header without links', () => (
    <Header
      logoHref="#apps"
      title="Atlassian Developer"
      titleHref="#apps"
    />
  ))
  .add('Standalone header', () => ReadmeExample)
  .add('With logIn link', () => (
    <Header
      logoHref="#apps"
      title="Atlassian Developer"
      titleHref="#apps"
      showLoginButton
    />
  ))
  .add('With user info', () => (
    <Header
      logoHref="#apps"
      title="Atlassian Developer"
      titleHref="#apps"
      userInfo={{
        avatarUrl: '',
        screenName: 'Hector',
        email: 'hzarcogarcia@atlassian.com',
      }}
    />
  ))
  .add('Header with @atlaskit/tabs', () => (
    <div>
      {ReadmeExample}
      <div className="row" style={{ marginTop: '24px' }}>
        <div className="column large-12">
          <Tabs
            tabs={[
              { defaultSelected: true, label: 'REST API' },
              { label: 'Modules' },
              { label: 'JavaScript API' },
            ]}
          />
        </div>
      </div>
    </div>
  ));

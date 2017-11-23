import { storiesOf } from '@kadira/storybook';
import React from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import ErrorIcon from '@atlaskit/icon/glyph/error';

import Banner from '../src';
import AnimationDemo from './AnimationDemo';
import { name } from '../package.json';

const Padded = props => <div style={{ padding: 16 }} {...props} />;

storiesOf(name, module)
  .addCodeExampleStory('a warning banner', () => (
    <Banner
      icon={<WarningIcon label="Warning icon" secondaryColor="inherit" />}
      isOpen
    >
      JIRA Service Desk pricing has been updated. Please migrate within 3 months.
    </Banner>
  ))
  .addCodeExampleStory('an error banner', () => (
    <Banner
      appearance="error"
      icon={<ErrorIcon label="Error icon" secondaryColor="inherit" />}
      isOpen
    >
      Your JIRA OnDemand license is about to expire. There are two days left to renew your license.
    </Banner>
  ))
  .addCodeExampleStory('with icon and text overflow', () => (
    <div style={{ width: 400 }}>
      <Banner
        icon={<WarningIcon label="Warning icon" secondaryColor="inherit" />}
        isOpen
      >
        JIRA Service Desk pricing has been updated. Please migrate within 3 months.
      </Banner>
      <Padded>
        There should only be 1 line of text, with elipsis (…) shown when text overflows.
      </Padded>
    </div>
  ))
  .add('animation demo', () => (
    <AnimationDemo
      icon={<WarningIcon label="Warning icon" secondaryColor="inherit" />}
    >
      JIRA Service Desk pricing has been updated. Please migrate within 3 months.
    </AnimationDemo>
  ));

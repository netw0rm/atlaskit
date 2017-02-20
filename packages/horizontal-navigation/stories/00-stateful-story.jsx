import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { AtlassianLogo } from '@atlaskit/logo';
import { name } from '../package.json';
import AkHorizontalNavigation from '../src/index';

storiesOf(name, module)
  .add('DAC', () => (
    <AkHorizontalNavigation logo={<AtlassianLogo isCollapsed />} title="JIRA Service Desk Cloud" />
  ));

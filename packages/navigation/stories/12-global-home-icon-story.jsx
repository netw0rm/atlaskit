import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Tooltip from '@atlaskit/tooltip';
import HomeIcon from '@atlaskit/icon/glyph/home-filled';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';

storiesOf(name, module)
  .add('without global home icon', () => (
    <HtmlPage>
      <BasicNavigation />
    </HtmlPage>
  ))
  .add('with global home icon', () => (
    <HtmlPage>
      <BasicNavigation
        globalHomeHref="//www.atlassian.com"
        globalHomeIcon={
          <Tooltip position="right" description="Home">
            <HomeIcon label="Home" secondaryColor="inherit" size="medium" />
          </Tooltip>
        }
      />
    </HtmlPage>
  ));

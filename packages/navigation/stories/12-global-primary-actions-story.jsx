import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AddIcon from '@atlaskit/icon/glyph/add';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';
import Tooltip from '@atlaskit/tooltip';
import { name } from '../package.json';
import { AkGlobalItem } from '../src/';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';

storiesOf(`${name} - Global Primary Items`, module)
  .add('using globalPrimaryActions prop', () => (
    <HtmlPage>
      <BasicNavigation />
    </HtmlPage>
  ))
  .add('using the named slots (old API)', () => (
    <HtmlPage>
      <BasicNavigation
        globalCreateIcon={
          <Tooltip position="right" description="Create">
            <AddIcon label="Create icon" secondaryColor="inherit" size="medium" />
          </Tooltip>
        }
        globalSearchIcon={
          <Tooltip position="right" description="Search">
            <SearchIcon label="Search icon" secondaryColor="inherit" size="medium" />
          </Tooltip>
        }
        onCreateDrawerOpen={() => { console.log('Global create action activated'); }}
        onSearchDrawerOpen={() => { console.log('Global search action activated'); }}
      />
    </HtmlPage>
  ))
  .add('with home action (using globalPrimaryActions prop)', () => (
    <HtmlPage>
      <BasicNavigation
        globalPrimaryActions={[
          (<AkGlobalItem size="medium">
            <Tooltip position="right" description="Home">
              <HomeFilledIcon label="Home icon" secondaryColor="inherit" size="medium" />
            </Tooltip>
          </AkGlobalItem>),
        ]}
      />
    </HtmlPage>
  ));

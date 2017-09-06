import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem } from '../src';

const StyleReset = styled.div`
  a,
  a:hover,
  a:active,
  a:focus {
    color: red;
    text-decoration: underline;
  }
`;

storiesOf(`${name}`, module)
  .add('with a CSS reset which styles links', () => (
    <StyleReset>
      <HtmlPage content={<a href="#foo">This is a regular link</a>}>
        <BasicNavigation>
          <AkNavigationItem icon={<DashboardIcon />} href="#foo" text="Link 1" />
          <AkNavigationItem icon={<DashboardIcon />} href="#foo" text="Link 2" />
          <AkNavigationItem icon={<DashboardIcon />} href="#foo" text="Link 3" />
        </BasicNavigation>
      </HtmlPage>
    </StyleReset>
 ));

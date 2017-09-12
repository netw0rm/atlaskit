import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, createGlobalTheme } from '@atlaskit/navigation';

const StyleReset = styled.div`
  a {
    color: green;
    text-decoration: underline;
  }

  a:hover,
  a:active,
  a:focus {
    color: red;
    text-decoration: underline;
  }
`;

const pageContent = (
  <div>
    <a href="#foo">This is a regular link</a>
    <p>The nav links should not be green or red</p>
  </div>
);

const navItems = [
  <AkNavigationItem isSelected icon={<DashboardIcon />} href="#foo" text="Link 1" />,
  <AkNavigationItem icon={<DashboardIcon />} href="#foo" text="Link 2" />,
  <AkNavigationItem icon={<DashboardIcon />} href="#foo" text="Link 3" />,
];

storiesOf(`${name}`, module)
  .add('with a CSS reset which styles links', () => (
    <StyleReset>
      <HtmlPage content={pageContent}>
        <BasicNavigation>
          {navItems}
        </BasicNavigation>
      </HtmlPage>
    </StyleReset>
  ))
  .add('with a CSS reset on a custom-themed nav', () => (
    <StyleReset>
      <HtmlPage content={pageContent}>
        <BasicNavigation
          globalTheme={createGlobalTheme('#FFFFFF', '#333333')}
          containerTheme={createGlobalTheme('#FFFFFF', '#999999')}
        >
          {navItems}
        </BasicNavigation>
      </HtmlPage>
    </StyleReset>
  ));

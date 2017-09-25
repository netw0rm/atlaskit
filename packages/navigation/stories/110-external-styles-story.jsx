import { storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';
import styled from 'styled-components';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, createGlobalTheme, presetThemes } from '@atlaskit/navigation';
import { AtlasKitThemeProvider } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/search';
import AddIcon from '@atlaskit/icon/glyph/add';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji/custom';
import AkButton from '@atlaskit/button';
import TextField from '@atlaskit/field-text';
import { AkNavigationItemGroup } from '../src/index';

/* eslint-disable */
function flatten(obj, prefix, current) {
  prefix = prefix || []
  current = current || {}

  if (typeof (obj) === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      flatten(obj[key], prefix.concat(key), current)
    })
  } else {
    current[prefix.join('.')] = obj
  }

  return Object.keys(current).map(function(key) {
    return {
      propName: key,
      value: current[key]
    };
  });
}
/* eslint-enable */

class Inaninity extends Component {
  state = {
    globalTheme: presetThemes.dark,
    containerTheme: presetThemes.dark,
  };

  onUpdateProperty = (e, propertyName, type) => {
    const nestings = propertyName.split('.');
    const currentTheme = type === 'global' ? this.state.globalTheme : this.state.containerTheme;

    const value = nestings.reduce(
      (acc, val) => [{ val, data: acc[0].data[val] }, ...acc], [{ data: currentTheme }]
    );

    value[0].data = e.target.value;

    const whatevs = value.reduce((acc, { val, data }, i, arr) => {
      if (!arr[i + 1]) return data;
      arr[i + 1].data = { ...arr[i + 1].data, [val]: data };
      return {};
    }, {});

    return type === 'global'
      ? this.setState({ globalTheme: whatevs })
      : this.setState({ containerTheme: whatevs });
  }

  renderInput = ({ propName, value }, type) => (
    <div>
      <TextField
        value={value}
        onChange={e => this.onUpdateProperty(e, propName, type)}
        label={propName}
      />
    </div>
  )

  render() {
    return (
      <AtlasKitThemeProvider mode="light">
        <div
          style={{
            display: 'flex',
            height: '100vh',
            overflowY: 'scroll',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          <style>{'body { margin: 0 }'}</style>
          <BasicNavigation
            globalTheme={this.state.globalTheme}
            containerTheme={this.state.containerTheme}
          >
            <AkNavigationItem
              icon={<SearchIcon label="Search" />}
              isCompact
              text="Search"
            />
            <AkNavigationItemGroup
              action={
                <AkButton
                  appearance="subtle"
                  iconBefore={<EmojiCustomIcon label="add" size="medium" />}
                  spacing="none"
                />
              }
              title="Rooms"
            >
              <AkNavigationItem
                icon={<IssuesIcon label="Issues" />}
                isCompact
                text="Issues"
              />
              <AkNavigationItem
                icon={<AddIcon label="Create" />}
                isCompact
                text="Create"
              />
              <AkNavigationItem
                icon={<DashboardIcon label="Dashboard" />}
                isCompact
                text="Nucleus"
              />
            </AkNavigationItemGroup>
            <AkNavigationItemGroup title="People">
              <AkNavigationItem
                icon={<SettingsIcon label="Settings" />}
                isCompact
                text="Settings"
              />
              <AkNavigationItem
                icon={<IssuesIcon label="Issues" />}
                isCompact
                text="Issues"
              />
            </AkNavigationItemGroup>
          </BasicNavigation>
          <div
            style={{
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <AtlasKitThemeProvider mode="dark">
              <div style={{ width: '40%', display: 'inline-block', padding: '32px' }} >
                <h2>Global Theme</h2>
                {flatten(this.state.globalTheme).map((i) => this.renderInput(i, 'global'))}
              </div>
              <div style={{ width: '40%', display: 'inline-block', padding: '32px' }} >
                <h2>Container Theme</h2>
                {flatten(this.state.containerTheme).map((i) => this.renderInput(i, 'container'))}
              </div>
            </AtlasKitThemeProvider>
          </div>
        </div>
      </AtlasKitThemeProvider>
    );
  }
}

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
  ))
  .add('make the magic happen', () => (
    <Inaninity />
  ));

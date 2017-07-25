/* eslint-disable react/no-multi-comp */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'flat';
import styled, { ThemeProvider } from 'styled-components';

import baseTheme from './baseTheme';

export const FLATTENED = '__FLATTENED__';
export const CHANNEL = '__ATLASKIT_THEME__';
export const DEAULT_THEME_MODE = 'light';
export const THEME_MODES = ['light', 'dark'];

const themeCache = {};
const themeComponents = {};

export function addThemeComponent(name, builder) {
  if (themeComponents[name]) {
    throw new Error(`Theme Component ${name} is already defined`);
  }
  themeComponents[name] = builder;
}

function buildTheme(mode) {
  if (!themeCache[mode]) {
    const base = baseTheme(mode);
    themeCache[mode] = { ...base, mode };
    Object.keys(themeComponents).forEach(key => {
      themeCache[mode][key] = themeComponents[key](mode, base);
    });
    const flatValues = flatten(themeCache[mode]);
    themeCache[mode][FLATTENED] = flatValues;
  }
  return themeCache[mode];
}

export function theme(props) {
  return props.theme && props.theme[CHANNEL]
    ? props.theme[CHANNEL]
    : props[CHANNEL] ? props[CHANNEL] : buildTheme(DEAULT_THEME_MODE);
}

export function themeValue(path) {
  return props => {
    const currentTheme = theme(props);
    if (currentTheme[FLATTENED][path] === undefined) {
      throw new Error(`Theme path ${path} is not defined`);
    }
    return currentTheme[FLATTENED][path];
  };
}

const ThemeReset = styled.div`
  background-color: ${themeValue('colors.background')};
  color: ${themeValue('colors.text')};

  a {
    color: ${themeValue('colors.link')};
  }
  a:hover {
    color: ${themeValue('colors.linkHover')};
  }
  a:active {
    color: ${themeValue('colors.linkActive')};
  }
  a:focus {
    outline-color: ${themeValue('colors.linkOutline')};
  }
  h1 {
    color: ${themeValue('colors.heading')};
  }
  h2 {
    color: ${themeValue('colors.heading')};
  }
  h3 {
    color: ${themeValue('colors.heading')};
  }
  h4 {
    color: ${themeValue('colors.heading')};
  }
  h5 {
    color: ${themeValue('colors.heading')};
  }
  h6 {
    color: ${themeValue('colors.subtleHeading')};
  }
  small {
    color: ${themeValue('colors.subtleText')};
  }
`;

function getStylesheetResetCSS(currentTheme) {
  return `
    body { background: ${currentTheme.colors.background}; };
  `;
}

export class AtlasKitThemeProvider extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(THEME_MODES),
  };
  static defaultProps = {
    mode: DEAULT_THEME_MODE,
  };
  static childContextTypes = {
    hasAtlasKitThemeProvider: PropTypes.bool,
  };
  static contextTypes = {
    hasAtlasKitThemeProvider: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = { theme: { [CHANNEL]: buildTheme(this.props.mode) } };
  }
  getChildContext() {
    return { hasAtlasKitThemeProvider: true };
  }
  componentWillMount() {
    if (!this.context.hasAtlasKitThemeProvider) {
      const css = getStylesheetResetCSS(this.state.theme[CHANNEL]);
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      this.stylesheet.innerHTML = css;
      document.head.appendChild(this.stylesheet);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.mode !== this.props.mode) {
      const newTheme = buildTheme(newProps.mode);
      if (this.stylesheet) {
        const css = getStylesheetResetCSS(newTheme);
        this.stylesheet.innerHTML = css;
      }
      this.setState({ theme: { [CHANNEL]: newTheme } });
    }
  }
  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    return (
      <ThemeProvider theme={this.state.theme}>
        <ThemeReset>
          {children}
        </ThemeReset>
      </ThemeProvider>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { background } from './colors';
import ThemeReset from './ThemeReset';

import { CHANNEL, DEFAULT_THEME_MODE, THEME_MODES } from './constants';

function getStylesheetResetCSS(state) {
  return `
    body { background: ${background(state)}; }
  `;
}

function buildThemeState(mode) {
  return { theme: { [CHANNEL]: { mode } } };
}

export default class AtlasKitThemeProvider extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(THEME_MODES),
  };
  static defaultProps = {
    mode: DEFAULT_THEME_MODE,
  };
  static childContextTypes = {
    hasAtlasKitThemeProvider: PropTypes.bool,
  };
  static contextTypes = {
    hasAtlasKitThemeProvider: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = buildThemeState(props.mode);
  }
  getChildContext() {
    return { hasAtlasKitThemeProvider: true };
  }
  componentWillMount() {
    if (!this.context.hasAtlasKitThemeProvider) {
      const css = getStylesheetResetCSS(this.state);
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      this.stylesheet.innerHTML = css;
      document.head.appendChild(this.stylesheet);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.mode !== this.props.mode) {
      const newThemeState = buildThemeState(newProps.mode);
      if (this.stylesheet) {
        const css = getStylesheetResetCSS(newThemeState);
        this.stylesheet.innerHTML = css;
      }
      this.setState(newThemeState);
    }
  }
  componentWillUnmount() {
    if (this.stylesheet) {
      document.head.removeChild(this.stylesheet);
      delete this.stylesheet;
    }
  }
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={this.state.theme}>
        <ThemeReset>
          {children}
        </ThemeReset>
      </ThemeProvider>
    );
  }
}

AtlasKitThemeProvider.propTypes = {
  children: PropTypes.node,
};

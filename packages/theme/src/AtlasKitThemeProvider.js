import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import buildTheme from './buildTheme';
import ThemeReset from './ThemeReset';

import { CHANNEL, DEFAULT_THEME_MODE, THEME_MODES } from './constants';

function getStylesheetResetCSS(currentTheme) {
  return `
    body { background: ${currentTheme.colors.background}; }
  `;
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

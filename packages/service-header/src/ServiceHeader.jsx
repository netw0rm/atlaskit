import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import { AtlassianLogo } from '@atlaskit/logo';

export default class ServiceHeader extends PureComponent {
  static displayName = 'AkServiceHeader';

  static propTypes = {
    logoHref: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleHref: PropTypes.string.isRequired,
  };

  render() {
    return (
      <ThemeProvider theme={{}}>
        <div>
          <a href={this.props.logoHref}><AtlassianLogo isCollapsed /></a>
          <a href={this.props.titleHref}>{this.props.title}</a>
        </div>
      </ThemeProvider>
    );
  }
}

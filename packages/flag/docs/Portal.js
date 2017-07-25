/* eslint-disable react/no-multi-comp */
/* eslint-disable react/sort-comp */

import React, { Children, Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';

class Portal extends Component {
  portalElement = null;
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  componentDidMount() {
    const node = document.createElement('div');
    document.body.appendChild(node);
    this.portalElement = node;
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { children, theme } = this.props;

    render(
      <ThemeProvider theme={theme}>
        {Children.only(children)}
      </ThemeProvider>,
      this.portalElement
    );
  }
  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }
  render() {
    return null;
  }
}

export default withTheme(Portal);

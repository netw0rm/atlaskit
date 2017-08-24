import React, { Component } from 'react';
import { render } from 'react-dom';
import { withTheme, ThemeProvider } from 'styled-components';

class Portal extends Component {
  portalElement = null // eslint-disable-line react/sort-comp
  componentDidMount() {
    const node = document.createElement('span');
    document.body.appendChild(node);
    this.portalElement = node;
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    render(
      <ThemeProvider {...this.props} />,
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

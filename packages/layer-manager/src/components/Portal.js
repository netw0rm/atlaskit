// @flow
import React, { Children, Component } from 'react';
import { render } from 'react-dom';
import { withTheme, ThemeProvider } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import type { ChildrenType } from '../types';

type Props = {
  children: ChildrenType,
  theme: Object,
};

const FirstChild = ({ children }) => Children.toArray(children)[0] || null;

class Portal extends Component {
  props: Props // eslint-disable-line react/sort-comp
  portalElement = null
  componentDidMount() {
    const node = document.createElement('span');
    document.body.appendChild(node);
    this.portalElement = node;
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { children } = this.props;
    render(
      this.getLayout(children),
      this.portalElement
    );
  }
  componentWillUnmount() {
    render(
      this.getLayout(),
      this.portalElement,
      () => {
        // allow time for transitions to complete before the dom is cleaned up
        // five seconds is an arbitary number, but is more than any of our
        // animations need to complete
        setTimeout(() => {
          document.body.removeChild(this.portalElement);
        }, 5000);
      }
    );
  }
  getLayout = (children) => {
    const { theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TransitionGroup component={FirstChild}>
          {children}
        </TransitionGroup>
      </ThemeProvider>
    );
  }
  render() {
    return null;
  }
}

export default withTheme(Portal);

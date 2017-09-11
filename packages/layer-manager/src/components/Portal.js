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
      this.renderChildren(children),
      this.portalElement
    );
  }
  componentWillUnmount() {
    // re-render an empty react tree into the portal element so that any
    // mounted components get cleaned up and have a chance to complete their
    // lifecycle before the portal is removed from the dom entirely
    render(
      this.renderChildren(),
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
  renderChildren = (children) => {
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

// Pass theme through to be consumed
const PortalWithTheme = withTheme(Portal);

// Wrap the default export in a ThemeProvider component so that withTheme
// doesn't freak out if the app doesn't have one already
export default function PortalWithThemeProvider(props) {
  return (
    <ThemeProvider theme={{}}>
      <PortalWithTheme {...props} />
    </ThemeProvider>
  );
}

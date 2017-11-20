import React, { Component } from 'react';
import Iframe from './Iframe';

import HtmlPage from './HtmlPage';
import BasicNavigation from './BasicNavigation';
import NucleusIcon from './NucleusIcon';

import { AkNavigationItem, presetThemes } from '../../src/index';

/**
 * Basic Iframe with content
 */
export default class IframeExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resizing: false,
    };
  }

  onResizeStart = () => {
    this.setState({
      resizing: true,
    });
  };
  onResize = () => {
    this.setState({
      resizing: false,
    });
  };

  renderContent() {
    return (
      <div style={{ 'margin-left': '18px' }}>
        <p>Dragging in or out of an iframe (or root window) will end the resize as mouse events
            are not captured over or outside of an iframe.
          </p>
        <p><Iframe content="Drag the navigation bar across really fast so the cursor hits me!" /></p>
        <br /><br />
        <p style={{ 'margin-left': '-32px' }}>To allow dragging over an embedded iframe, you can set the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events">
          pointer-events</a> css property on the iframe to {"'none'"} when resizing starts (onResizeStart) and re-enable it when resizing ends (onResize).
          </p>
        <p style={{ 'margin-left': '-32px' }}><Iframe resizing={this.state.resizing} content="You can drag over me fine" /></p>
      </div>
    );
  }

  render() {
    const content = this.renderContent();
    return (
      <HtmlPage content={content} >
        <BasicNavigation
          containerTheme={presetThemes.container}
          hasScrollHintTop
          onResizeStartCallback={this.onResizeStart}
          onResizeCallback={this.onResize}
        >
          <AkNavigationItem
            text="Test page"
            href="#1"
          />
          <AkNavigationItem
            icon={<NucleusIcon />}
            text="Item with an icon"
            href="#2"
          />
          <AkNavigationItem
            icon={<NucleusIcon />}
            text="Item with two lines"
            subText="Another line of text, which could possibly be long"
            href="#3"
          />
          <AkNavigationItem
            icon={<NucleusIcon />}
            text="A really, really, quite long, actually super long container name"
            href="#4"
          />
          <AkNavigationItem
            icon={<NucleusIcon />}
            text="A really, really, quite long, actually super long container name with action"
            subText="Another line of text, which could possibly be long"
            action={<span>text</span>}
            href="#5"
          />
        </BasicNavigation>
      </HtmlPage>
    );
  }
}


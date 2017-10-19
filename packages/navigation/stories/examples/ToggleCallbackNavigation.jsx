import React, { Component } from 'react';
import { action } from '@kadira/storybook';
import Lorem from 'react-lorem-component';
import HtmlPage from '../components/HtmlPage';
import BasicNavigation from '../components/BasicNavigation';

const Content = ({ innerRef, width }) => (
  <div
    ref={innerRef}
    style={{ width }}
  >
    <Lorem count="30" />
  </div>
);

export default class ToggleCallbackNavigation extends Component {
  state = {
    contentWidth: 'auto',
    isOpen: true,
    navWidth: 304,
  }

  onToggleStart = () => {
    if (!this.contentRef) {
      return;
    }
    action('toggle transition start')();
    const contentWidth = this.contentRef.clientWidth;
    this.setState({ contentWidth });
  }

  onToggleEnd = () => {
    action('toggle transition end')();
    this.setState({ contentWidth: null });
  }

  handleResize = ({ isOpen, width: navWidth }) => this.setState({ isOpen, navWidth })

  contentRef

  registerContentRef = contentRef => { this.contentRef = contentRef; }

  render() {
    const { contentWidth, isOpen, navWidth } = this.state;

    return (
      <HtmlPage
        content={(
          <Content
            innerRef={this.registerContentRef}
            width={contentWidth}
          />
        )}
      >
        <BasicNavigation
          isOpen={isOpen}
          width={navWidth}
          onToggleStart={this.onToggleStart}
          onToggleEnd={this.onToggleEnd}
          onResize={this.handleResize}
        />
      </HtmlPage>
    );
  }
}

/* eslint-disable react/prop-types, react/no-danger */

import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import ToggleIcon from '@atlaskit/icon/glyph/code';
import 'prismjs/themes/prism-tomorrow.css';

import { theme, themeValue } from '../../../theme/src';

const formatSrc = src => Prism.highlight(src, Prism.languages.jsx);

export const ExampleSource = ({
  isSourceClosing = false,
  handleAnimationEnd = () => {},
  src,
}) => (
  <Code closing={isSourceClosing} onAnimationEnd={handleAnimationEnd}>
    <pre>
      <code dangerouslySetInnerHTML={{ __html: formatSrc(src) }} />
    </pre>
  </Code>
);

export default class Example extends PureComponent {
  state = {
    isSourceClosing: false,
    isSourceVisible: false,
  };

  toggleSource = () => {
    const { isSourceClosing, isSourceVisible } = this.state;

    // abort for repeditive clicks
    if (isSourceClosing) return;

    if (!isSourceVisible) {
      this.setState({ isSourceVisible: true });
    } else {
      this.setState({ isSourceClosing: true });
    }
  };
  handleAnimationEnd = () => {
    const { isSourceClosing } = this.state;

    if (!isSourceClosing) return;

    this.setState({
      isSourceClosing: false,
      isSourceVisible: false,
    });
  };

  render() {
    const { Component, title, src } = this.props;
    const { isHover, isSourceVisible, isSourceClosing } = this.state;
    const toggleLabel = isSourceVisible
      ? 'Hide Code Snippet'
      : 'Show Code Snippet';

    const state = isHover ? 'hover' : 'normal';
    const mode = isSourceVisible ? 'open' : 'normal';

    return (
      <Wrapper state={state} mode={mode}>
        <Toggle
          onClick={this.toggleSource}
          onMouseOver={() => this.setState({ isHover: true })}
          onMouseOut={() => this.setState({ isHover: false })}
          title={toggleLabel}
          mode={mode}
        >
          <ToggleTitle mode={mode}>
            {title}
          </ToggleTitle>
          <ToggleIcon label={toggleLabel} />
        </Toggle>

        {isSourceVisible
          ? <ExampleSource
            src={src}
            handleAnimationEnd={this.handleAnimationEnd}
            isSourceClosing={isSourceClosing}
          />
          : null}
        <Showcase>
          <Component />
        </Showcase>
      </Wrapper>
    );
  }
}

const TRANSITION_DURATION = '200ms';

const Wrapper = styled.div`
  background-color: ${p => theme(p).website.example.wrapper.background[p.mode][p.state]};
  border-radius: 5px;
  color: ${p => theme(p).website.example.toggle[p.mode]};
  margin-top: 20px;
  padding: 0 ${p => theme(p).base.gridSize}px ${p => theme(p).base.gridSize}px;
  transition: background-color ${TRANSITION_DURATION};
`;

const Toggle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${p => theme(p).base.gridSize}px;
  transition: color ${TRANSITION_DURATION}, fill ${TRANSITION_DURATION};
`;

// NOTE: use of important necessary to override element targeted headings
const ToggleTitle = styled.h4`
  color: ${p => theme(p).website.example.toggle[p.mode]} !important;
  margin: 0;
`;

const animIn = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 1000px; opacity: 1; }
`;
const animOut = keyframes`
  from { max-height: 1000px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
`;
const Code = styled.div`
  animation: ${props => (props.closing ? animOut : animIn)}
    ${TRANSITION_DURATION} ease-out;
  background-color: ${themeValue('website.example.code.background')};
  border-radius: 3px;
  color: ${themeValue('website.example.code.text')};
  display: block;
  margin: 0 0 ${p => theme(p).base.gridSize}px;
  overflow-x: auto;
  padding: ${p => theme(p).base.gridSize}px;

  & code {
    font-family: Monaco, Menlo, monospace;
    font-size: 0.9em;
  }
`;

const Showcase = styled.div`
  background-color: ${themeValue('colors.background')};
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${p => theme(p).base.gridSize}px;
`;

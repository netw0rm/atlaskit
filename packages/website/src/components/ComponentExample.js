/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import CodeIcon from '@atlaskit/icon/glyph/code';
import {
  akColorN20,
  akColorN30,
  akColorN60,
  akColorN600,
  akColorN700,
  akColorN800,

  akGridSize,
} from '@atlaskit/util-shared-styles';
import syntaxTheme from './syntax-theme';

export default class Example extends PureComponent {
  state = {
    isSourceClosing: false,
    isSourceVisible: false,
  }

  toggleSource = () => {
    const { isSourceClosing, isSourceVisible } = this.state;

    // abort for repeditive clicks
    if (isSourceClosing) return;

    if (!isSourceVisible) {
      this.setState({ isSourceVisible: true });
    } else {
      this.setState({ isSourceClosing: true });
    }
  }
  handleAnimationEnd = () => {
    const { isSourceClosing } = this.state;

    if (!isSourceClosing) return;

    this.setState({
      isSourceClosing: false,
      isSourceVisible: false,
    });
  }

  render() {
    const { Component, title, src } = this.props;
    const { isHover, isSourceVisible, isSourceClosing } = this.state;
    const toggleLabel = 'Toggle Code Snippet';

    return (
      <Wrapper hover={isHover} open={isSourceVisible}>
        <Toggle
          onClick={this.toggleSource}
          onMouseOver={() => this.setState({ isHover: true })}
          onMouseOut={() => this.setState({ isHover: false })}
          title={toggleLabel}
          open={isSourceVisible}
        >
          <Title>{title}</Title>
          <CodeIcon label={toggleLabel} />
        </Toggle>
        {isSourceVisible ? (
          <Code
            closing={isSourceClosing}
            // language="jsx"
            onAnimationEnd={this.handleAnimationEnd}
            style={syntaxTheme}
          >
            {src}
          </Code>) : null}
        <Showcase>
          <Component />
        </Showcase>
      </Wrapper>
    );
  }
}

const getWrapperBg = (props) => {
  let color = akColorN20;

  if (props.open && props.hover) color = akColorN700;
  else if (props.open) color = akColorN600;
  else if (props.hover) color = akColorN30;

  return color;
};

const Wrapper = styled.div`
  background-color: ${getWrapperBg};
  border-radius: 5px;
  margin-top: 20px;
  padding: 0 ${akGridSize} ${akGridSize};
  transition: background-color 200ms;
`;

const Toggle = styled.div`
  align-items: center;
  color: ${props => (props.open ? 'white' : akColorN600)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${akGridSize};
`;
const Title = styled.h4`
  color: inherit;
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
const Code = styled(SyntaxHighlighter)`
  animation: ${props => (props.closing ? animOut : animIn)} 200ms ease-out;
  background-color: ${akColorN800};
  border-radius: 3px;
  color: ${akColorN60};
  display: block;
  margin: 0 0 ${akGridSize};
  overflow-x: auto;
  padding: ${akGridSize};

  & code {
    font-family: Monaco, Menlo, monospace;
    font-size: 0.9em;
  }
`;

const Showcase = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${akGridSize};
`;

import React, { Component } from 'react';
import { akColorN300, akColorB500 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const ColorDiv = styled.div`
  align-items: center;
  color: ${props => (props.isColorFlipped ? akColorN300 : 'white')};
  background-color: ${props => (props.isColorFlipped ? 'white' : akColorB500)};
  display: flex;
  height: 100%;
  justify-content: center;
  transition: color 0.2s, background-color 0.2s;
`;

export default class ChangingColor extends Component {
  state = {
    isColorFlipped: false,
  }

  componentDidMount() {
    this.interval = setInterval(this.flipColor, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  flipColor = () => {
    this.setState({ isColorFlipped: !this.state.isColorFlipped });
  }

  render() {
    return (
      <ColorDiv isColorFlipped={this.state.isColorFlipped}>
        {this.props.children}
      </ColorDiv>
    );
  }
}

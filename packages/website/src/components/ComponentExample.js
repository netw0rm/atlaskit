/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import styled from 'styled-components';

const ExampleTitle = styled.h3`
  margin-bottom: 10px;
`;
const ExampleContainer = styled.div`
  margin-top: 20px;
`;
const ExampleComponent = styled.div`
  margin-top: 20px;
`;
const ExampleSrc = styled.pre`
  margin-bottom: 10px;
`;

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { srcVisible: false };
  }
  toggleSrc = () => {
    const { srcVisible } = this.state;
    this.setState({ srcVisible: !srcVisible });
  }
  render() {
    const { Component, title, src } = this.props;
    const { srcVisible } = this.state;
    return (
      <ExampleContainer>
        <ExampleTitle>{title}</ExampleTitle>
        {srcVisible ? <ExampleSrc>{src}</ExampleSrc> : null}
        <Button onClick={this.toggleSrc}>
          {srcVisible ? 'Hide' : 'Show'} Source
        </Button>
        <ExampleComponent><Component /></ExampleComponent>
      </ExampleContainer>
    );
  }
}

export default Example;

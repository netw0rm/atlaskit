import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { akColorB400, akColorN800, akColorR500 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import * as logos from '../../src';

const Centered = styled.div`
  display: flex;
  align-items: center;
`;

const sizeRange = (Logo, isCollapsed) => (
  <Centered>
    <Logo isCollapsed={isCollapsed} size="small" />
    <Logo isCollapsed={isCollapsed} size="medium" />
    <Logo isCollapsed={isCollapsed} size="large" />
    <Logo isCollapsed={isCollapsed} size="xlarge" />
  </Centered>
);

const Coloured = styled.div`
  color: ${props => props.color};
`;

const colors = [akColorN800, akColorB400, akColorR500];

export default class InteractiveLogo extends PureComponent {

  state = {
    isCollapsed: false,
    colorIndex: 0,
  };

  toggleCollapsed = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  toggleColor = () => {
    this.setState({ colorIndex: (this.state.colorIndex + 1) % colors.length });
  }

  render() {
    return (
      <Coloured color={colors[this.state.colorIndex]}>
        <div>
          <Button onClick={this.toggleColor}>Change colour</Button>
          <Button onClick={this.toggleCollapsed}>{this.state.isCollapsed ? 'Expand' : 'Collapse'}</Button>
        </div>
        {sizeRange(logos.AtlassianLogo, this.state.isCollapsed)}
        {sizeRange(logos.BitbucketLogo, this.state.isCollapsed)}
        {sizeRange(logos.ConfluenceLogo, this.state.isCollapsed)}
        {sizeRange(logos.HipchatLogo, this.state.isCollapsed)}
        {sizeRange(logos.JiraLogo, this.state.isCollapsed)}
      </Coloured>);
  }
}

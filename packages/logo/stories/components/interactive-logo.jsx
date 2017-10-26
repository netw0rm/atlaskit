import React, { PureComponent } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import styled from 'styled-components';
import * as logos from '../../src';
import { akColorB200, akColorN300, akColorN700, akColorB400 } from '@atlaskit/util-shared-styles';

const Centered = styled.div`
  display: flex;
  align-items: center;
`;

const sizes = ['small', 'medium', 'large', 'xlarge'];

const sizeRange = (Logo, collapseTo, colorPresetProps) => (
  <Centered>
    {
      sizes.map((size, i) => (
        <LogoParent key={i}>
          <Logo
            collapseTo={collapseTo}
            size={size}
            {...colorPresetProps}
          />
        </LogoParent>
      ))
    }
  </Centered>
);

const LogoParent = styled.div`
  border-left: 1px dotted black;
  border-right: 1px dotted black;
`;

const collapseToValues = [null, 'icon', 'type'];

const colorPresets = [
  {
    textColor: akColorN700,
    iconColor: akColorB200,
    iconGradientStart: akColorB400,
    iconGradientStop: akColorB200,
  },
  {
    textColor: 'currentColor',
    iconColor: 'currentColor',
    iconGradientStart: 'rgba(0, 0, 0, 0.4)',
    iconGradientStop: 'currentColor',
  },
  {
    textColor: akColorB400,
    iconColor: akColorB200,
    iconGradientStart: akColorB400,
    iconGradientStop: akColorB200,
  },
  {
    textColor: 'orange',
    iconColor: 'royalblue',
  },
  {
    textColor: 'rgb(60, 160, 180)',
    iconColor: 'rgb(100, 190, 60)',
    iconGradientStart: 'rgb(50, 100, 50)',
    iconGradientStop: 'rgb(100, 190, 60)',
  },
];

export default class InteractiveLogo extends PureComponent {
  state = {
    collapseToIndex: 0,
    colorIndex: 0,
  };

  toggleCollapsed = () => {
    this.setState({ collapseToIndex: (this.state.collapseToIndex + 1) % collapseToValues.length });
  }

  toggleColor = () => {
    this.setState({ colorIndex: (this.state.colorIndex + 1) % colorPresets.length });
  }

  render() {
    const collapseTo = collapseToValues[this.state.collapseToIndex];
    const colorPreset = colorPresets[this.state.colorIndex];

    return (
      <div style={{ color: akColorN300 }}>
        <ButtonGroup>
          <Button onClick={this.toggleColor}>Change colour</Button>
          <Button onClick={this.toggleCollapsed}>Change collapseTo</Button>
        </ButtonGroup>
        {sizeRange(logos.AtlassianLogo, collapseTo, colorPreset)}
        {sizeRange(logos.BitbucketLogo, collapseTo, colorPreset)}
        {sizeRange(logos.ConfluenceLogo, collapseTo, colorPreset)}
        {sizeRange(logos.HipchatLogo, collapseTo, colorPreset)}
        {sizeRange(logos.JiraLogo, collapseTo, colorPreset)}
        {sizeRange(logos.JiraCoreLogo, collapseTo, colorPreset)}
        {sizeRange(logos.JiraServiceDeskLogo, collapseTo, colorPreset)}
        {sizeRange(logos.JiraSoftwareLogo, collapseTo, colorPreset)}
        {sizeRange(logos.StatuspageLogo, collapseTo, colorPreset)}
        {sizeRange(logos.StrideLogo, collapseTo, colorPreset)}
      </div>
    );
  }
}

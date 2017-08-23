// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { darken, mix } from 'polished';

import Avatar from '@atlaskit/avatar';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import {
  akColorN30,
  akColorN80,
  akColorN900,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

import type { ItemTheme } from '../../src/types';

import Item, { ItemGroup, itemThemeNamespace } from '../../src';

const generateTheme = (
  padding: number,
  baseBgColor: string,
  textColor: string,
  secondaryTextColor: string,
  focusColor: string,
): ItemTheme => ({
  afterSpacing: 0,
  beforeSpacing: 0,
  borderRadius: 0,
  focus: {
    outline: focusColor,
  },
  padding: {
    default: {
      x: padding,
      y: padding,
    },
    compact: {
      x: padding * 0.5,
      y: padding * 0.5,
    },
  },
  default: {
    background: baseBgColor,
    text: textColor,
    secondaryText: secondaryTextColor,
  },
  hover: {
    background: darken(0.05, baseBgColor),
    text: textColor,
    secondaryText: secondaryTextColor,
  },
  selected: {
    background: darken(0.05, baseBgColor),
    text: textColor,
    secondaryText: secondaryTextColor,
  },
  active: {
    background: darken(0.1, baseBgColor),
    text: textColor,
    secondaryText: secondaryTextColor,
  },
  disabled: {
    background: baseBgColor,
    text: mix(0.5, baseBgColor, textColor),
    secondaryText: mix(0.5, baseBgColor, secondaryTextColor),
  },
});

class ItemThemeDemo extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    focusColor: PropTypes.string,
    padding: PropTypes.number,
    secondaryTextColor: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    backgroundColor: akColorN30,
    padding: akGridSizeUnitless,
    secondaryTextColor: akColorN80,
    textColor: akColorN900,
  }

  render() {
    const myTheme = generateTheme(
      this.props.padding,
      this.props.backgroundColor,
      this.props.textColor,
      this.props.secondaryTextColor,
      this.props.focusColor,
    );
    return (
      <Root background={myTheme.default.background}>
        <ThemeProvider theme={{ [itemThemeNamespace]: myTheme }}>
          <ItemGroup title={this.props.title}>
            <Item description="Some description text">First item</Item>
            <Item
              elemBefore={<Avatar size="xsmall" />}
            >Item two with just avatar and main text</Item>
            <Item
              description="I should not be clickable or focusable and should have disabled cursor"
              isDisabled
            >Disabled item</Item>
            <Item
              elemBefore={<Avatar size="small" />}
            >
              Item with lots and lots and lots and lots and lots and lots and lots and lots and lots
              and lots and lots and lots and lots and lots and lots and lots of text and lots and
              lots and lots and lots and lots and lots and lots and lots and lots and lots !
            </Item>
            <Item
              elemAfter={<CheckCircleIcon size="medium" />}
            >
              Notice how the icon colour changes based on theme, item with lots and lots and lots
              and lots and lots and lots and lots and lots and lots and lots of text and lots and
              lots and lots and lots and lots and lots and lots and lots and lots and lots !
            </Item>
            <ItemGroup isCompact title="Compact and selected">
              <Item isCompact>I am a compact item</Item>
              <Item isCompact isSelected>I am compact and selected</Item>
            </ItemGroup>
          </ItemGroup>
        </ThemeProvider>
      </Root>
    );
  }
}

const Root = styled.div`
  background-color: ${props => props.background};
  margin: ${akGridSizeUnitless * 3}px 0;
`;

export default ItemThemeDemo;

// @flow
import React, { Component } from 'react';
import { Outer, Disc } from '../styled/ExcessIndicator';
import type { Size } from '../types';

type Props = {
  /** Used to override the default border color of the presence indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** The total number excess of avatars */
  count: number,
  /** When true, provides a gutter for the adjacent avatar */
  isStack?: boolean,
  /** Handle user interaction */
  onClick?: () => mixed,
  /** Defines the size of the indicator */
  size?: Size,
};

const MAX_DISPLAY_COUNT = 99;

export default class ExcessIndicator extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  render() {
    const { borderColor, count, isStack, onClick, size } = this.props;

    return (
      <Outer size={size}>
        <Disc borderColor={borderColor} isStack={isStack} size={size} onClick={onClick}>
          +{count > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count}
        </Disc>
      </Outer>
    );
  }
}

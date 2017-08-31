// @flow
import React, { PureComponent } from 'react';
import typesMapping from './types';
import type { allTypes } from '../types';
import IconWrapper from '../styled/IconForType';

type Props = {
  isHovered: boolean,
  isOpen: boolean,
  type: allTypes;
}

export default class SelectedIconForType extends PureComponent {
  props: Props

  render() {
    const { type, isHovered, isOpen } = this.props;
    const {
      [type]: {
        icon: SelectedIcon,
        iconSize,
      },
    } = typesMapping;

    return (
      <IconWrapper
        appearance={type}
        isHovered={isHovered}
        isOpen={isOpen}
      >
        <SelectedIcon
          label="Inline message icon"
          size={iconSize}
        />
      </IconWrapper>
    );
  }
}

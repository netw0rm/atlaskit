import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';

import {
  akColorG300,
  akColorN100,
} from '@atlaskit/util-shared-styles';

import {
  EditorIconWrapper,
} from '../styled/DecisionItem';

import Item from './Item';
import { Appearance, Participant } from '../types';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: ReactElement<any>;
  contentRef?: ContentRef;
  showPlaceholder?: boolean;
  appearance?: Appearance;
  participants?: Participant[];
  showParticipants?: boolean;
}

export default class DecisionItem extends PureComponent<Props,{}> {
  public static defaultProps: Partial<Props> = {
    appearance: 'inline',
  };

  render() {
    const { appearance, children, contentRef, participants, showPlaceholder } = this.props;
    const iconColor = showPlaceholder ? akColorN100 : akColorG300;

    const icon = (
      <EditorIconWrapper color={iconColor}>
        <DecisionIcon label="Decision" size="large" />
      </EditorIconWrapper>
    );

    return (
      <Item
        appearance={appearance}
        contentRef={contentRef}
        icon={icon}
        participants={participants}
        placeholder="Add a decision…"
        showPlaceholder={showPlaceholder}
      >
        {children}
      </Item>
    );
  }

}

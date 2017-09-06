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
import {
  Wrapper,
  ContentWrapper,
} from '../styled/Item';

import { Appearance } from '../types';
import { Placeholder } from '../styled/Placeholder';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: ReactElement<any>;
  contentRef?: ContentRef;
  showPlaceholder?: boolean;
  appearance?: Appearance;
}

export default class DecisionItem extends PureComponent<Props,{}> {
  public static defaultProps: Partial<Props> = {
    appearance: 'flat'
  };

  private renderPlaceholder() {
    return <Placeholder contentEditable={false}>Add a decision…</Placeholder>;
  }

  render() {
    const { appearance, children, contentRef, showPlaceholder } = this.props;
    const iconColor = showPlaceholder ? akColorN100 : akColorG300;

    return (
      <Wrapper theme={{ appearance }}>
        <EditorIconWrapper color={iconColor}>
          <DecisionIcon label="Decision" size="large" />
        </EditorIconWrapper>
        {showPlaceholder && !children && this.renderPlaceholder()}
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }

}

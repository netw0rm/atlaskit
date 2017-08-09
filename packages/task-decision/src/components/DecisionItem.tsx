import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import DecisionIcon from '@atlaskit/icon/glyph/decision';
import {
  Wrapper,
  IconWrapper,
  ContentWrapper,
  Placeholder
} from '../styled/DecisionItem';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: ReactElement<any>;
  contentRef?: ContentRef;
  showPlaceholder?: boolean;
}

export default class DecisionItem extends PureComponent<Props,{}> {

  private renderPlaceholder() {
    return <Placeholder contentEditable={false}>Make a decision. Add @ mentions, emojis or links</Placeholder>;
  }

  render() {
    const { children, contentRef, showPlaceholder } = this.props;
    return (
      <Wrapper>
        <IconWrapper>
          <DecisionIcon label="Decision" size="medium" />
        </IconWrapper>
        {showPlaceholder && !children && this.renderPlaceholder()}
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }

}

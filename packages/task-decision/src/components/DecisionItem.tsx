import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import styled from 'styled-components';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorN20,
} from '@atlaskit/util-shared-styles';
import DecisionIcon from '@atlaskit/icon/glyph/decision';

export interface ContentRef {
  (ref: HTMLElement | undefined): void;
}

export interface Props {
  children?: ReactElement<any>;
  contentRef?: ContentRef;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless}px;
`;

// tslint:disable-next-line:variable-name
export const ContentWrapper = styled.div`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
`;

// tslint:disable-next-line:variable-name
const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
  position: absolute;
`;

export default class DecisionItem extends PureComponent<Props,{}> {
  render() {
    const { children, contentRef } = this.props;
    return (
      <Wrapper>
        <IconWrapper>
          <DecisionIcon label="Decision" size="medium" />
        </IconWrapper>
        <ContentWrapper innerRef={contentRef}>
          {children}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

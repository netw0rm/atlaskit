import styled from 'styled-components';
import {
  akColorB400,
  akColorN0,
  akColorN20,
  akColorN30,
  akColorN500,
} from '@atlaskit/util-shared-styles';

export interface MentionStyleProps {
  highlightStyle: HighlightStyle;
}

export enum HighlightStyle {
  CURRENT,
  OTHER,
  UNPERMITTED
}

const userStyle = {};
userStyle[HighlightStyle.CURRENT] = {
  background: akColorB400,
  border: akColorB400,
  text: akColorN20,
};
userStyle[HighlightStyle.OTHER] = {
  background: akColorN30,
  border: akColorN30,
  text: akColorN500,
};
userStyle[HighlightStyle.UNPERMITTED] = {
  background: akColorN0,
  border: akColorN500,
  text: akColorN500,
};

// tslint:disable-next-line:variable-name
export const MentionStyle = styled.span`${(props: MentionStyleProps) => `
  background: ${userStyle[props.highlightStyle].background};
  border: 1px solid ${userStyle[props.highlightStyle].border};
  border-radius: 20px;
  color: ${userStyle[props.highlightStyle].text};
  cursor: pointer;
  padding: 0 4px 2px 3px;
  white-space: nowrap;
`}`;

// tslint:disable-next-line:variable-name
export const MentionContainer = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

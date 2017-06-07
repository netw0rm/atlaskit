import styled from 'styled-components';
import {
  akColorB400,
  akColorN0,
  akColorN20,
  akColorN30,
  akColorN500,
} from '@atlaskit/util-shared-styles';

export interface MentionStyleProps {
  highlighted?: boolean;
  accessLevel?: string;
}

interface HighlightStyle {
  background: string;
  border: string;
  text: string;
}

const getUserStyle = (props: MentionStyleProps): HighlightStyle => {
  const highlightStyle = {
    'CURRENT': {
      background: akColorB400,
      border: akColorB400,
      text: akColorN20,
    },
    'OTHER': {
      background: akColorN30,
      border: akColorN30,
      text: akColorN500,
    },
    'UNPERMITTED': {
      background: akColorN0,
      border: akColorN500,
      text: akColorN500,
    },
  };

  if (props.highlighted) {
    return highlightStyle['CURRENT'];
  }
  if (props.accessLevel !== 'CONTAINER') {
    return highlightStyle['UNPERMITTED'];
  }
  return highlightStyle['OTHER'];
};

// tslint:disable:next-line variable-name
export const MentionStyle = styled.span`
  background: ${(props: MentionStyleProps) => getUserStyle(props).background};
  border: 1px solid ${(props: MentionStyleProps) => getUserStyle(props).border};
  border-radius: 20px;
  color: ${(props: MentionStyleProps) => getUserStyle(props).text};
  cursor: pointer;
  padding: 0 4px 2px 3px;
  white-space: nowrap;
  overflow: hidden;
`;

export const MentionContainer = styled.span`
  display: inline-block;
`;

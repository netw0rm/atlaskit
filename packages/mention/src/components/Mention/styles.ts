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
}

// tslint:disable:next-line variable-name
export const MentionStyle = styled.span`
  background: ${(props: MentionStyleProps) => props.highlighted ? akColorB400 : akColorN30};
  border-radius: 20px;
  color: ${(props: MentionStyleProps) => props.highlighted ? akColorN20 : akColorN500};
  cursor: pointer;
  padding: 0 4px 2px 3px;
  white-space: nowrap;
`;

export const UnpermittedMentionStyle = MentionStyle.extend`
  background: ${akColorN0};
  border: 1px solid ${akColorN500};
  color: ${akColorN500};
`;

export const MentionContainer = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

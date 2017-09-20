import styled from 'styled-components';
import { ThemeType } from '../../types';

import {
  mentionListWidth,
  noDialogContainerBorderColor,
  noDialogContainerBorderRadius,
  noDialogContainerBoxShadow,
} from '../../shared-styles';

export interface MentionListStyleProps {
  empty?: boolean;
  theme?: ThemeType;
}

// tslint:disable:next-line variable-name
export const MentionListStyle = styled.div`
  display: ${(props: MentionListStyleProps) => props.empty ? 'none' : 'block'};

  /* list style */
  width: ${mentionListWidth};
  color: #333;

  border: 1px solid ${(props: MentionListStyleProps) => props.theme === 'dark' ? 'gray' : noDialogContainerBorderColor};
  border-radius: ${noDialogContainerBorderRadius};
  box-shadow: ${noDialogContainerBoxShadow};
`;

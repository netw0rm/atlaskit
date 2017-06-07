import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN900,
} from '@atlaskit/util-shared-styles';

// tslint:disable:next-line variable-name
export const MentionListErrorStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${akColorN900};

  border: 1px solid #fff;
  border-radius: ${akBorderRadius};

  height: 264px;
`;

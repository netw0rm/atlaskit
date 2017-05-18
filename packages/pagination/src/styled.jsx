import styled from 'styled-components';
import Button from '@atlaskit/button';
import {
  akColorN800,
} from '@atlaskit/util-shared-styles';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ButtonActive = styled(Button)`
  font-weight: bold;
  color: ${akColorN800} !important; /* @todo: until Button supports not faded disabled state */
`;

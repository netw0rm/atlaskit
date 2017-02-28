import styled from 'styled-components';
import Button from '@atlaskit/button';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ButtonActive = styled(Button)`
  font-weight: bold;
  color: #000 !important; /* @todo: until Button supports not faded disabled state */
`;

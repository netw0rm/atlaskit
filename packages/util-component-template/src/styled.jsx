import styled from 'styled-components';
import {
  akColorB200,
  akColorG300,
  akColorP300,
  akColorPrimary3,
  akColorG75,
  akGridSize,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';

export const Button = styled.button`
  color: ${akColorPrimary3};
  background-color: ${akColorB200};
  border: 3px solid ${akColorP300};
  border-radius: ${akBorderRadius};
  font-size: 18px;
  padding: ${akGridSize};
  transition: background-color 0.1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${akColorG300};
  }
`;

export const Container = styled.div`
  backgroundColor: ${akColorG75};
  display: flex;
  padding: ${akGridSize};
  justify-content: center;
  width: 400px;
`;

/* tslint:disable:variable-name */
import styled from 'styled-components';
import { easeInOutCubic } from '../styles/easing';
import { fadeIn } from '../styles/animations';

export const LoadingWrapper = styled.div`
  color: #cfd4db;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FadeinImage = styled.div`
  animation: ${fadeIn} .3s ${easeInOutCubic};
`;

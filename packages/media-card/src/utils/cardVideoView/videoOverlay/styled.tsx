/* tslint:disable:variable-name */
import styled from 'styled-components';
import {easeOutCubic, borderRadius, absolute} from '../../../styles';

export const Overlay = styled.div`
  opacity: 0;
  width: 100%;
  height: calc(100% - 50px);
  ${absolute()}

  background: transparent;
  ${borderRadius}
  transition: .3s opacity ${easeOutCubic};

  // display over the top of the video element
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 0 20px;
  background-image: linear-gradient(to bottom, rgba(9, 30, 66, 0.75), rgba(9, 30, 66, 0.0));
`;

export const VideoName = styled.div`
  color: white;
`;

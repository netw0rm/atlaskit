/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, size } from '../../styles';

export const Wrapper = styled(Root)`
  width: 156px;
  height: 104px;
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  
  &:hover {
    .show-on-hover {
      display: block
    }
    .circle {
      display: none;
    }
  }
  .stroke-solid, .stroke-dotted {
    display: none;
  }
  
  .overlay {
    z-index: 9;
    border: none;
    cursor: pointer;
  }
  .show-on-hover {
    display: none;
  }
  .play-button-wrapper {
    height: 100%;
  }
`;

export const Video = styled.video`
  ${size()}
  object-fit: cover;
  z-index: 0;
`;

export const Title = styled.div`
  position: absolute;
`;

export const Footer = styled.div`
  position: absolute;
`;


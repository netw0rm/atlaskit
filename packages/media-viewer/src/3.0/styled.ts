/* tslint:disable:variable-name */
import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #1b2638;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  &:hover {
    .visible-on-hover {
      opacity: 1;
    }
  }

  .visible-on-hover {
    opacity: 0;
    transition: opacity .3s;
  }
`;

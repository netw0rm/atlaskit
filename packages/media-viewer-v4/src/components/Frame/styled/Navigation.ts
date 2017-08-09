/* tslint:disable:variable-name */
import styled from 'styled-components';

export const ArrowLeftWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 33%;

  > span {
    transition: background .3s;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    color: #576074;
    border-radius: 100%;
    margin-left: 10px;

    &:hover {
      background: white;
    }
  }
`;

export const ArrowRightWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 33%;
  justify-content: flex-end;

  > span {
    transition: background .3s;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    color: #576074;
    border-radius: 100%;
    margin-right: 10px;

    &:hover {
      background: white;
    }
  }
`;

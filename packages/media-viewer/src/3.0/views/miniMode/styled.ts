/* tslint:disable:variable-name */
import styled from 'styled-components';

export interface WrapperProps {
  isVisible?: boolean;
}

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 355px;
  height: 100%;
  background: white;
  color: black;
  z-index: 1;
  transition: transform .3s;
  transform: translateX(-100%);
  padding: 10px;

  ${({isVisible}: WrapperProps) => isVisible && `
    transform: translateX(0);
  ` || ''}
`;

export const CloseIconWrapper = styled.div`
  background: #f4f4f5;
  border-radius: 100%;
  padding: 4px 7px;
  width: 34px;
  text-align: center;
  height: 34px;
  cursor: pointer;
  transition: all .3s;
  margin-right: 10px;

  &:hover {
    box-shadow: 0px 0px 12px -3px black inset;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  overflow: auto;
  height: calc(100% - 50px);
  padding: 0 5px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const CardWrapper = styled.div`
  margin: 5px 5px 5px 0;
`;

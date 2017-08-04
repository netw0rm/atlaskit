/* tslint:disable:variable-name */
import styled from 'styled-components';

const getDragOverStyles = (hasDraggedOver: boolean): string => {
  return hasDraggedOver ? 'background-color: red' : '';
};

export interface WrapperProps {
  hasDraggedOver: boolean;
}

export const Wrapper = styled.div`
  display: inline-block;
  ${({hasDraggedOver}: WrapperProps) => getDragOverStyles(hasDraggedOver)}
`;

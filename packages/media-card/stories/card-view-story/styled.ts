/* tslint:disable:variable-name */
import styled from 'styled-components';

export const EditableCardOptions = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

export const SliderWrapper = styled.div`
  display: flex;
  width: 50%;

  > * {
    flex: 1;
    margin: 10px;
  }
`;

export const EditableCardContent = styled.div`
  // Not making the wrapper fancier or center elements in order to have a more realistic scenario
  padding: 20px;
`;

export const OptionsWrapper = styled.div`
  display: flex;

  > * {
    flex: 1;
    margin: 10px;
  }
`;

export const CardDimensionsWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
`;

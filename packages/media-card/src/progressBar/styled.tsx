/* tslint:disable:variable-name */
import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  border-radius: 3px;
  z-index: 30;

  overflow: hidden;
  background-color: rgba(255,255,255,0.3);

  .progressBar{
    width: 0%;
    height: 3px;
    background-color: white;
  }
`;

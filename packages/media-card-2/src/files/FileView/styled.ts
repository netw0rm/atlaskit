/* tslint:disable variable-name */
import styled from 'styled-components';

export const Thumbnail = styled.img`
  border-radius: 3px;
`;

export interface DetailsProps {
  isOverlay: boolean;
}

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  ${({isOverlay}: DetailsProps) => {
    if (isOverlay) {
      return `
        color: white;
        position: absolute;
      `;
    } else {
      return '';
    }
  }}
`;

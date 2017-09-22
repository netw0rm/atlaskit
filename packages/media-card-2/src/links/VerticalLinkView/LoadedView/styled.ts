/* tslint:disable variable-name */
import styled from 'styled-components';

export interface ImageProps {
  url?: string;
}

export const Image = styled.div`
  height: 0;
  padding-bottom: 56.25%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  ${({url}: ImageProps) => url && `background-image: url('${url}');` || ''}
  background-repeat: no-repeat, repeat;
  background-position: center, center;
  background-size: cover, auto;
`;

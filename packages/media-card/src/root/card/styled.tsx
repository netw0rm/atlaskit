/* tslint:disable:variable-name */
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import {CardAppearance} from '../..';

export interface LazyLoadCardProps {
  onContentVisible: Function;
  appearance?: CardAppearance;
}

export const LazyLoadCard = styled(LazyLoad)`
  ${({appearance}: LazyLoadCardProps) => `

  `}
`;

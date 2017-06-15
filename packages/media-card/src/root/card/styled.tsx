/* tslint:disable:variable-name */
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import {getCardMinHeight} from '../../utils';
import {CardAppearance} from '../..';

export interface LazyLoadCardProps {
  appearance?: CardAppearance;
}

export const LazyLoadCard = styled(LazyLoad)`
  ${({appearance}: LazyLoadCardProps) => `
    min-height: ${getCardMinHeight(appearance)}px;
  `}
`;

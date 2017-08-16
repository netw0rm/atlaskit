/* tslint:disable:variable-name */
import styled from 'styled-components';
import { CardDimensions } from '../';
import {getCSSUnitValue} from '../utils/getCSSUnitValue';

export interface WrapperProps {
  dimensions?: CardDimensions;
}

const getWrapperHeight = ({dimensions}: WrapperProps) => dimensions && dimensions.height ? `height: ${getCSSUnitValue(dimensions.height)}` : '';
const getWrapperWidth = ({dimensions}: WrapperProps) => dimensions && dimensions.width ? `width: ${getCSSUnitValue(dimensions.width)}` : '';

export const Wrapper = styled.div`
  display: inline-block;
  ${getWrapperHeight}
  ${getWrapperWidth}
`;

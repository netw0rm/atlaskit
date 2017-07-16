/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akFontSizeDefault} from '@atlaskit/util-shared-styles';

// copied from `@atlaskit/button`
const akFontSizeUnitless = parseInt(akFontSizeDefault, 10);
const compactButtonHeight = `${(akGridSizeUnitless * 3) / akFontSizeUnitless}em`;

export interface WrapperProps {
  compact?: boolean;
}

export const Wrapper = styled.div`
  display: inline-flex;
  vertical-align: middle;
  ${(props: WrapperProps) => props.compact && `max-height: ${compactButtonHeight}` || ''}
`;

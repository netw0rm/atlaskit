/* tslint:disable:variable-name */
import styled from 'styled-components';
import Button from '@atlaskit/button';
import {akGridSizeUnitless, akFontSizeDefault} from '@atlaskit/util-shared-styles';

// copied from `@atlaskit/button`
const akFontSizeUnitless = parseInt(akFontSizeDefault, 10);
const buttonHeight = `${(akGridSizeUnitless * 4) / akFontSizeUnitless}em`;
const compactButtonHeight = `${(akGridSizeUnitless * 3) / akFontSizeUnitless}em`;

const UntypedButton = Button as any;

export interface StyledButtonProps {
  compact?: boolean;
}

// we're overriding the default button styles here to make it a square
export const StyledButton = styled(UntypedButton)`
  && {
    width: ${(props: StyledButtonProps) => (props.compact ? compactButtonHeight : buttonHeight)};
    padding: 0;
    justify-content: center;
  }
`;

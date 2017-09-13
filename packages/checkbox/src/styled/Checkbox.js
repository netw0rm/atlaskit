import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';

export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1;
  opacity: 0;
`;

const disabledColor = themed({ light: colors.N80, dark: colors.N80 });

type LabelProps = {
  isDisabled: boolean,
  isFullWidth: boolean,
}

export const Label = styled.label`
  display: ${({ isFullWidth }) => (isFullWidth ? 'block' : 'inline-block')}
  color: ${(props: LabelProps): string => (props.isDisabled ? disabledColor(props) : colors.text(props))};
  ${({ isDisabled }: LabelProps) => (isDisabled ? css`cursor: not-allowed;` : '')}
`;

type IconWrapperProps = {
  isChecked: boolean,
  isDisabled: boolean,
  isFocused: boolean,
}

const borderColor = themed({ light: colors.N40A, dark: colors.N40A });
const focusBorder = css`
  stroke: ${themed({ light: colors.B100, dark: colors.B100 })};
  stroke-width: 2px;
`;
const border = css`
  stroke: ${borderColor};
  stroke-width: 1px;
`;

const getBorderColor = (props: IconWrapperProps) => {
  if (props.isDisabled) return '';
  if (props.isFocused) return focusBorder;
  return border;
};

export const IconWrapper = styled.span`
  line-height: 0;

  /* This is adding a property to the inner svg, to add a border to the checkbox */
  & rect {
    transition: stroke 0.2s ease-in-out;
    ${getBorderColor}

    :focus & {
      ${focusBorder}
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

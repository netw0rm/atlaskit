import styled, { css } from 'styled-components';
import Theme from './theme';

const { spacing } = Theme.$;

const focusedStyles = css`
  box-shadow: 0 0 0 2px ${Theme.Item.boxShadow.focus} inset;
  outline: none;
  outline-offset: 0;
  position: relative; /* prevents bgcolor of a hovered element from obfuscating focus ring of a focused sibling element */
`;
const activeStyles = css`
  &, &:hover {
    background-color: ${Theme.Item.background.selected};
    color: ${Theme.Item.primaryText.selected};
  }
`;
const primaryStyles = css`
  color: ${Theme.Item.primaryText.primary};
`;

const sharedStyles = props => css`
  align-items: center;
  box-sizing: border-box;
  color: ${props.isDisabled
    ? Theme.Item.primaryText.disabled
    : Theme.Item.primaryText.default
  };
  cursor: ${props.isDisabled ? 'not-allowed' : 'pointer'};
  display: ${props.isHidden ? 'none' : 'flex'};
  flex-wrap: nowrap;
  font-size: ${Theme.Item.fontSize};
  font-weight: normal;
  padding: 0 ${Theme.Item.padding.x}px;
  text-decoration: none;

  &:hover {
    background-color: ${!props.isDisabled && Theme.Item.background.hover};
    color: ${props.isDisabled
      ? Theme.Item.primaryText.disabled
      : Theme.Item.primaryText.default
    };
    text-decoration: none;

    ${props.isPrimary && primaryStyles}
  }
  &:active {
    background-color: ${!props.isDisabled && Theme.Item.background.active};
    color: ${!props.isDisabled && Theme.Item.primaryText.active};

    ${props.isPrimary && primaryStyles}
  }
  &:focus { ${focusedStyles} }

  ${props.isFocused && focusedStyles}
  ${props.isActive && activeStyles}
  ${props.isPrimary && primaryStyles}
`;

export const Anchor = styled.a`
  ${props => sharedStyles(props)}
`;
export const Span = styled.span`
  ${props => sharedStyles(props)}
`;

// Checkbox/Radio wrapper -- sits left of the children
export const InputWrapper = styled.span`
  display: flex;
  margin: 0 2px;
`;

// Elements injected before/after the children
export const Before = styled.span`
  display: flex;
`;
export const After = styled.span`
  align-items: center;
  display: flex;
`;

// Alignment and layout for the children
export const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  margin: 0 ${spacing}px;
  padding: ${spacing}px 0;
  overflow: hidden;

  &:first-child { margin: 0; }
`;
export const Content = styled.span`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${props => (props.allowMultiline && css`white-space: normal;`)}
`;

// Description is a block element below the children, like a subtitle
export const Description = styled.span`
  color: ${Theme.Item.secondaryText};
  flex: 1 1 auto;
  font-size: 12px;
  line-height: 16 / 12;
  margin-top: ${spacing / 2}px;
`;

// NOTE: Exposed as a named export for this package
export const SecondaryText = styled.span`
  color: ${Theme.Item.secondaryText};
`;

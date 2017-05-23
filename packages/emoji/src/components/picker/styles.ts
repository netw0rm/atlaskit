import styled from 'styled-components';
import {
  akBorderRadius,
  akColorB300,
  akColorN100A,
  akColorN30,
  akColorN30A,
  akColorN50,
  akColorN900,
} from '@atlaskit/util-shared-styles';

import {
  emojiFooterBoxShadow,
  emojiPickerBorderColor,
  emojiPickerBoxShadow,
  emojiPickerHeight,
  emojiPickerListHeight,
  emojiPickerWidth,
} from '../../shared-styles';

const spinnerSize = 30;
export const listSizes = {
  emoji: 40,
  search: 50,
  category: 25,
  default: 20,
};

function getCategoryStyleColour(props: CategoryProps, onHover: boolean) {
  if (props.active) {
    return akColorB300;
  }

  if (props.disable) {
    return akColorN50;
  }

  return onHover ? akColorB300 : akColorN100A;
}

// tslint:disable-next-line:variable-name
export const CategorySelectorStyle = styled.div`
  background-color: ${akColorN30};

  & ul {
    list-style: none;
    margin: 0 3px;
    padding: 3px 0;
  }

  & li {
    display: inline-block;
    margin: 0;
    padding: 0;
    vertical-align: middle;
  }
`;

export interface CategoryProps {
  active: boolean;
  disable: boolean;
}

// tslint:disable-next-line:variable-name
export const CategoryStyle = styled.button`
  background-color: transparent;
  border: 0;
  margin: 0 3px 0 4px;
  padding: 0;
  transition: color 0.2s ease;

  color: ${(props: CategoryProps) => getCategoryStyleColour(props, false)};
  cursor: ${(props: CategoryProps) => props.disable ? 'default' : 'pointer'};

  /* Firefox */
  &::-moz-focus-inner {
    border: 0 none;
    padding: 0;
  }

  &:hover {
    color: ${(props: CategoryProps) => getCategoryStyleColour(props, true)};
  }

  &:focus {
    outline: 0;
  }
`;

// tslint:disable-next-line:variable-name
export const PickerStyle = styled.div`
  background: white;
  border: 1px solid ${emojiPickerBorderColor};
  border-radius: ${akBorderRadius};
  box-shadow: ${emojiPickerBoxShadow};
  height: ${emojiPickerHeight}px;
  width: ${emojiPickerWidth}px;
`;

// tslint:disable-next-line:variable-name
export const PickerFooterStyle = styled.div`
  border-rop: 2px solid ${akColorN30A};
  box-shadow: ${emojiFooterBoxShadow};
`;

// tslint:disable-next-line:variable-name
export const PickerSpinnerContainerStyle = styled.div`
  position: relative;
  z-index: 1;
`;

// tslint:disable-next-line:variable-name
export const PickerSpinnerStyle = styled.div`
  position: absolute;
  left: ${((emojiPickerWidth - spinnerSize) / 2).toFixed()}px;
  top: ${((emojiPickerListHeight - spinnerSize + listSizes.search) / 2).toFixed()}px;
`;

// tslint:disable-next-line:variable-name
export const PickerListStyle = styled.div`
  height: ${emojiPickerListHeight}px;
`;

// tslint:disable-next-line:variable-name
export const PickerSearchStyle = styled.div`
  box-sizing: border-box;
  padding: 10px 25px 10px 8px;
`;

// tslint:disable-next-line:variable-name
export const PickerSearchIconStyle = styled.span`
  opacity: 0.5;
  margin-top: -2px;
  height: 17px;
`;

// tslint:disable-next-line:variable-name
export const PickerSearchInputStyle = styled.input`
  background: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  cursor: inherit;
  font-size: 14px;
  outline: none;
  padding: 1px 0 2px 10px;
  width: 100%;

  &:invalid {
    box-shadow: none;
  }

  &::-ms-clear {
    display: none;
  }
`;

// tslint:disable-next-line:variable-name
export const CategoryTitleStyle = styled.div`
  box-sizing: border-box;
  color: ${akColorN900};
  font-size: 14px;
  padding: 5px 8px;
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`;

// tslint:disable-next-line:variable-name
export const PickerEmojiStyle = styled.span`
  padding: 4px;
  width: 32px;
  height: 32px;
  display: inline-block;

  & > span {
    cursor: pointer;
    padding: 4px;
    border-radius: 5px;
    width: 24px;
    height: 24px;

    /* Fit non-square emoji to square */
    & > img {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-height: 24px;
      max-width: 24px;
      display: block;
    }
  }
`;

/* eslint no-confusing-arrow: 0 */

import styled from 'styled-components';
import {
  akColorB75,
  akColorN0,
  akColorN80,
  akColorN400,
  akColorN600,
  akColorN700,
  akColorN900,
} from '@atlaskit/util-shared-styles';

const ThemeColor = {
  CalendarTh: {
    text: akColorN80,
  },
  DateDiv: {
    background: {
      default: 'transparent',
      hover: akColorN900,
      hoverPreviouslySelected: akColorB75,
      hoverSelected: akColorN0,
      previouslySelected: akColorB75,
      selected: akColorN0,
    },
    border: {
      default: 'transparent',
      focused: akColorB75,
    },
    text: {
      default: akColorN0,
      disabled: akColorN400,
      hover: akColorN0,
      hoverSelected: akColorN600,
      isToday: akColorB75,
      previouslySelected: akColorN600,
      selected: akColorN700,
      sibling: akColorN80,
    },
  },
  DateDivUnderline: {
    background: {
      default: akColorB75,
      selected: akColorN700,
    },
  },
  MonthAndYear: {
    text: akColorN0,
  },
  Wrapper: {
    background: akColorN700,
    text: akColorN0,
  },
};

function getBackgroundColor({ selected, previouslySelected }) {
  if (selected) {
    return ThemeColor.DateDiv.background.selected;
  }
  if (previouslySelected) {
    return ThemeColor.DateDiv.background.previouslySelected;
  }
  return 'transparent';
}

function getBorderColor({ focused }) {
  if (focused) {
    return ThemeColor.DateDiv.border.focused;
  }
  return ThemeColor.DateDiv.border.default;
}

function getColor({ disabled, isToday, previouslySelected, selected, sibling }) {
  if (selected) {
    return ThemeColor.DateDiv.text.selected;
  }
  if (disabled) {
    return ThemeColor.DateDiv.text.disabled;
  }
  if (previouslySelected) {
    return ThemeColor.DateDiv.text.previouslySelected;
  }
  if (isToday) {
    return ThemeColor.DateDiv.text.isToday;
  }
  if (sibling) {
    return ThemeColor.DateDiv.text.sibling;
  }
  return ThemeColor.DateDiv.text.default;
}

function getCursor({ disabled }) {
  return disabled ? 'default' : 'pointer';
}

function getHoverBackgroundColor({ previouslySelected, selected }) {
  if (selected) {
    return ThemeColor.DateDiv.background.hoverSelected;
  }
  if (previouslySelected) {
    return ThemeColor.DateDiv.background.hoverPreviouslySelected;
  }
  return ThemeColor.DateDiv.background.hover;
}

function getHoverColor({ previouslySelected, selected }) {
  if (selected || previouslySelected) {
    return ThemeColor.DateDiv.text.hoverSelected;
  }
  return ThemeColor.DateDiv.text.hover;
}

export const Announcer = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const CalendarTable = styled.table`
  display: inline-block;
  margin: 0;
  text-align: center;
`;

export const CalendarTbody = styled.tbody`
  border: 0;
`;

export const CalendarTh = styled.td`
  border: 0;
  color: ${ThemeColor.CalendarTh.text};
  font-size: 8px;
  padding: 2px 5px;
  text-transform: uppercase;
`;

export const CalendarThead = styled.thead`
  border: 0;
`;

export const DateDiv = styled.div`
  background-color: ${getBackgroundColor};
  border: 2px solid ${getBorderColor};
  border-radius: 4px;
  color: ${getColor};
  cursor: ${getCursor};
  font-size: 12px;
  font-weight: lighter;
  padding: 2px 5px;
  position: relative;
  text-align: center;

  ${({ isToday, selected }) => isToday ? `
    &::after {
      background-color: ${selected
        ? ThemeColor.DateDivUnderline.background.selected
        : ThemeColor.DateDivUnderline.background.default
      };
      bottom: 1px;
      content: "";
      display: block;
      height: 1px;
      left: 2px;
      position: absolute;
      right: 2px;
    }
  ` : ''}

  &:hover {
    background-color: ${getHoverBackgroundColor};
    color: ${getHoverColor}
  }
`;

export const DateTd = styled.td`
  border: 0;
  padding: 0;
`;

export const Heading = styled.div`
  align-items: baseline;
  display: flex;
  padding: 4px 0 8px 0;
`;

export const MonthAndYear = styled.div`
  color: ${ThemeColor.MonthAndYear.text};
  flex-basis: 100%;
  text-align: center;
`;

export const Wrapper = styled.div`
  background-color: ${ThemeColor.Wrapper.background};
  color: ${ThemeColor.Wrapper.text};
  display: inline-block;
  padding: 10px;
  user-select: none;
`;

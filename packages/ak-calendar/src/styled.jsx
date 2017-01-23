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
} from 'akutil-shared-styles';

function getBackgroundColor({ selected, previouslySelected }) {
  if (selected) {
    return akColorN0;
  }
  if (previouslySelected) {
    return akColorB75;
  }
  return 'transparent';
}

function getBorderColor({ focused }) {
  if (focused) {
    return akColorB75;
  }
  return 'transparent';
}

function getColor({ disabled, isToday, previouslySelected, selected, sibling }) {
  if (selected) {
    return akColorN700;
  }
  if (disabled) {
    return akColorN400;
  }
  if (previouslySelected) {
    return akColorN600;
  }
  if (isToday) {
    return akColorB75;
  }
  if (sibling) {
    return akColorN80;
  }
  return akColorN0;
}

function getCursor({ disabled }) {
  return disabled ? 'default' : 'pointer';
}

function getHoverBackgroundColor({ previouslySelected, selected }) {
  if (selected) {
    return akColorN0;
  }
  if (previouslySelected) {
    return akColorB75;
  }
  return akColorN900;
}

function getHoverColor({ previouslySelected, selected }) {
  if (selected || previouslySelected) {
    return akColorN600;
  }
  return akColorN0;
}

export const AnnouncerDiv = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
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
    &:after {
      background-color: ${selected ? akColorN700 : akColorB75};
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

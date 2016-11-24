import { hover, merge, style } from 'glamor';
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

export default props => merge(
  style({
    backgroundColor: getBackgroundColor(props),
    border: `2px solid ${getBorderColor(props)}`,
    borderRadius: 4,
    color: getColor(props),
    cursor: getCursor(props),
    display: 'table-cell',
    fontSize: 12,
    fontWeight: 'lighter',
    padding: '2px 5px',
    position: 'relative',
  }),
  hover({
    backgroundColor: getHoverBackgroundColor(props),
    color: getHoverColor(props),
  })
);

export const underline = ({ disabled }) => style({
  borderBottom: `1px solid ${disabled ? akColorN400 : akColorB75}`,
  bottom: -2,
  left: '12.5%',
  position: 'absolute',
  width: '75%',
});

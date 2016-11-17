import { hover, merge, style } from 'glamor';
import {
  akColorB75,
  akColorN80,
  akColorN400,
  akColorN600,
  akColorN700,
  akColorN900,
} from './util.colors';

const akColorTransparent = 'transparent';
const akColorWhite = '#fff';

function getBackgroundColor({ selected, previouslySelected }) {
  if (selected) {
    return akColorWhite;
  }
  if (previouslySelected) {
    return akColorB75;
  }
  return akColorTransparent;
}

function getBorderColor({ focused }) {
  if (focused) {
    return akColorB75;
  }
  return akColorTransparent;
}

function getColor({ disabled, previouslySelected, selected, sibling, today }) {
  if (selected) {
    return akColorN700;
  }
  if (disabled) {
    return akColorN400;
  }
  if (previouslySelected) {
    return akColorN600;
  }
  if (today) {
    return akColorB75;
  }
  if (sibling) {
    return akColorN80;
  }
  return akColorWhite;
}

function getCursor({ disabled }) {
  return disabled ? 'default' : 'pointer';
}

function getHoverBackgroundColor({ previouslySelected, selected }) {
  if (selected) {
    return akColorWhite;
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
  return akColorWhite;
}

export default function (props) {
  return merge(
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
}

export function underline({ disabled }) {
  return style({
    borderBottom: `1px solid ${disabled ? akColorN400 : akColorB75}`,
    bottom: -2,
    left: '12.5%',
    position: 'absolute',
    width: '75%',
  });
}

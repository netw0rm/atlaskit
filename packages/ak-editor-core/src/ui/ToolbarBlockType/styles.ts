import {
  akEditorPopupText,
  akEditorActiveForeground,
  akEditorDropdownActiveBackground,
 } from 'ak-editor-shared-styles';
import { style } from 'typestyle';

export const buttonContent = style({
  width: '80px',
});

export const container = style({
  position: 'relative',
  width: '92px',
});

export const dropdown = style({
  listStyleType: 'none',
  padding: '4px 0',
  boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05), 0 3px 10px -4px rgba(0,0,0,0.4)',
  // UL by default has margins, we don't want them.
  margin: '0',
  width: '170px',

  $nest: {
    '& > li': {
      margin: '0',
    }
  }
});;

export const blockTypeNormal = style({
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '20px',
});

export const blockTypeHeading1 = style({
  fontSize: '20px',
  fontWeight: 'normal',
  lineHeight: '20px',
  letterSpacing: '-0.01em',
});

export const blockTypeHeading2 = style({
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '20px',
});

export const blockTypeHeading3 = style({
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '20px',
});

export const blockTypeCode = style({
  fontFamily: 'Consolas, Menlo, "Liberation Mono", Courier, monospace',
});

export const blockTypeQuote = style({
  $nest: {
    '& span': {
      borderLeft: `1px solid ${akEditorActiveForeground}`,
      paddingLeft: '10px',
    }
  }
});

export const active = style({});

export const blockType = style({
  color: akEditorActiveForeground,
  display: 'block',
  cursor: 'pointer',
  padding: '5px 16px',
  userSelect: 'none',

  $nest: {
    [`&.${active}, &:hover`]: {
      background: akEditorDropdownActiveBackground,
      color: akEditorActiveForeground,
      textDecoration: 'none',
    }
  }
});

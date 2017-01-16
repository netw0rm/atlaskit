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

export const blockTypeQuote = style({});

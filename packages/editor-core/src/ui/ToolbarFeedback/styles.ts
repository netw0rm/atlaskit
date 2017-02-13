 import {
   akBorderRadius,
   akColorN0,
   akColorN800,

 } from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';

export const popup = style({
  height: '385px',
  borderRadius: akBorderRadius,
  overflow: 'hidden',
  background: akColorN0,

  $nest: {
    iframe: {
      width: '100%',
      height: '100%',
    }
  }
});

export const close = style({
  position: 'absolute',
  top: '10px',
  right: '32px', // 16px for modal-dialog and 16px for inner wufoo iframe
  width: '16px',
  height: '25px',

  background: 'transparent',
  cursor: 'pointer',
  border: '0 none',
  padding: '0',
  margin: '0',

  textAlign: 'center',
  textDecoration: 'none',

  color: akColorN800,
  fontSize: '20px',
  fontWeight: 'bold',
  opacity: 0.5,

  $nest: {
    '&:hover': {
      opacity: 1,
    }
  }
});

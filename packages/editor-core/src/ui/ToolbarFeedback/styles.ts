 import {
   akBorderRadius,
   akColorN0
 } from 'akutil-shared-styles';
import { style } from 'typestyle';

export const popup = style({
  width: '300px',
  height: '385px',
  borderRadius: akBorderRadius,
  overflow: 'hidden',

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
  right: '15px',
  width: '25px',
  height: '25px',

  background: 'transparent',
  cursor: 'pointer',
  border: '0 none',
  padding: '0',
  margin: '0',

  textAlign: 'center',
  textDecoration: 'none',

  color: akColorN0,
  fontSize: '20px',
  fontWeight: 'bold',
  opacity: 0.5,

  $nest: {
    '&:hover': {
      opacity: 1,
    }
  }
});

import { style } from 'typestyle';
import { akColorN900, akColorN50, akColorN0 } from '@atlaskit/util-shared-styles';

export const button = style({
  height: 26,
  width: 26,
  background: akColorN900,
  padding: 0,
  borderRadius: 4,
  border: `1px solid ${akColorN0}`,
  cursor: 'pointer',
});

export const buttonWrapper = style({
  display: 'inline-block',
  border: '2px solid transparent',
  margin: 1,
  fontSize: 0,
  borderRadius: 6,
  $nest: {
    '&:hover': {
      borderColor: akColorN50,
    }
  }
});

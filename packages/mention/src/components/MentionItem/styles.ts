import { style } from 'typestyle';
import { akColorN30 } from '@atlaskit/util-shared-styles';

export const row = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflow: 'hidden',
  padding: '9px 20px',
  position: 'relative',
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
});

export const akAvatar = style({
  position: 'relative',
  flex: 'initial',
  marginTop: '-2px',
});

export const nameSection = style({
  flex: 1,
  minWidth: 0,
  marginLeft: '10px',
});

export const fullName = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const selected = style({});

export const mentionName = style({
  color: '#747474',
  fontSize: '12px',

  marginTop: '2px',

  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'right',

  $nest: {
    /* Lozenge */
    '& > span': {
      marginBottom: '2px',
    },
  },
});

export const time = style({
  marginLeft: '20px',
  flex: 'none',
  color: '#747474',
  fontSize: '12px',
});

export const mentionItem = style({
  display: 'block',
  overflow: 'hidden',
  listStyleType: 'none',
  height: '48px',
  lineHeight: 1.2,
  cursor: 'pointer',

  $nest: {
    [`&.${selected}`]: {
      backgroundColor: akColorN30
    },
  },
});


import {
  akBorderRadius,
  akColorN200,
  akColorN900,
} from '@atlaskit/util-shared-styles';

import { akEmojiSelectedBackgroundColor } from '../../shared-styles';
import { style } from 'typestyle';

export const selected = 'selected';
export const emojiSprite = 'emoji-sprite';

export const emoji = style({
  borderRadius: '5px',
  backgroundColor: 'transparent',
  display: 'inline-block',
  verticalAlign: 'middle',
  // Ensure along with vertical align middle, we don't increase the line height for p and some
  // headings. Smaller headings get a slight increase in height, cannot add more negative margin
  // as a "selected" emoji (e.g. in the editor) will not look good.
  margin: '-1px 0',

  $nest: {
    [`&.${selected}`]: {
      backgroundColor: akEmojiSelectedBackgroundColor,
    },
    '&>img': {
      maxHeight: '24px',
      display: 'block',
    }
  },
});

export const emojiContainer = style({
  display: 'inline-block',
  verticalAlign: 'middle',
  // Ensure along with vertical align middle, we don't increase the line height for h1..h6, and p
  margin: '-1px 0',

  $nest: {
    [`&.${selected}`]: {
      backgroundColor: akEmojiSelectedBackgroundColor,
    },

    [`.${emojiSprite}`]: {
      background: 'transparent no-repeat',
      display: 'block',
      height: '24px',
      width: '24px',
    },
  },
});

export const placeholderEmoji = style({
  display: 'inline-block',
  fill: '#f7f7f7',
  width: '24px',
  height: '24px',
  verticalAlign: 'middle',
});

export const emojiButton = style({
  backgroundColor: 'transparent',
  border: '0',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0',
  padding: '4px',

  $nest: {
    /* Firefox */
    ['&::-moz-focus-inner']: {
      border: '0 none',
      padding: 0,
    },
  },
});

export const buttons = 'buttons';
export const preview = 'preview';
export const previewImg = 'preview-image';
export const previewText = 'preview-text';
export const name = 'name';
export const shortName = 'shortname';
export const previewSingleLine = 'preview-single-line';
export const toneSelectorContainer = 'tone-selector-container';
export const withToneSelector = 'with-tone-selector';

export const emojiPreview = style({
  display: 'flex',
  padding: '10px',

  $nest: {
    [`.${preview}`]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',

      $nest: {
        [`.${emojiSprite}`]: {
          height: '32px',
          margin: '0',
          width: '32px',
        },

        [`.${previewImg}`]: {
          display: 'inline-block',
          flex: 'initial',
          width: '32px',

          $nest: {
            '&>span': {
              width: '32px',
              height: '32px',
              padding: 0,
              maxHeight: 'inherit',

              $nest: {
                '&>img': {
                  position: 'relative',
                  left: '50%',
                  top: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                  maxHeight: '32px',
                  maxWidth: '32px',
                  padding: 0,
                  display: 'block',
                }
              }
            }
          }
        },

        [`.${previewText}`]: {
          flex: 'column',
          marginLeft: '10px',
          marginTop: '-2px',
          maxWidth: '285px',
          width: '285px', /* IE */

          $nest: {
            [`.${name}`]: {
              display: 'block',
              color: akColorN900,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',

              $nest: {
                ['&:first-letter']: {
                  textTransform: 'uppercase',
                }
              },
            },

            [`.${shortName}`]: {
              display: 'block',
              color: akColorN200,
              fontSize: '12px',
              lineHeight: 1,
              marginBottom: '-2px',
              overflow: 'hidden',
              paddingBottom: '2px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
        },

        [`.${previewSingleLine}`]: {
          paddingTop: '10px',

          $nest: {
            [`.${name}`]: {
              display: 'none',
            },

            [`.${shortName}`]: {
              color: akColorN900,
              fontSize: '14px',
            },
          },
        },
      },
    },

    [`.${buttons}`]: {
      flex: 1,
      textAlign: 'right',
    },


    [`.${toneSelectorContainer}`]: {
      flex: 1,
      textAlign: 'right',
    },

    [`.${withToneSelector} .${previewText}`]: {
      maxWidth: '255px',
    },
  },
});

export const emojiScrollable = style({
  border: '1px solid #fff',
  borderRadius: akBorderRadius,
  display: 'block',
  margin: '0',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '0',
});

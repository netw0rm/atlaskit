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
  cursor: 'pointer',
  backgroundColor: 'transparent',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '22px 22px',
  display: 'inline-block',
  height: '32px',
  width: '32px',

  $nest: {
    [`&.${selected}`]: {
      backgroundColor: akEmojiSelectedBackgroundColor,
    },
  },
});

export const emojiContainer = style({
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'inline-block',
  height: '32px',
  width: '32px',

  $nest: {
    [`&.${selected}`]: {
      backgroundColor: akEmojiSelectedBackgroundColor,
    },

    [`.${emojiSprite}`]: {
      background: 'transparent no-repeat',
      border: 0,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'inline-block',
      height: '24px',
      margin: '4px',
      width: '24px',
    },
  },
});

export const missingEmoji = style({
  height: '32px',
  width: '32px',
  display: 'inline-block',
  fill: '#f7f7f7',
});

export const emojiButton = style({
  backgroundColor: 'transparent',
  border: '0',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0',
  padding: '4px',
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
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '32px 32px',
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
              marginBottom: '-1px',
              overflow: 'hidden',
              paddingBottom: '1px',
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

import { EmojiService } from '@atlaskit/emoji';

const emojis = {
  'meta': {
    'spriteSheets': {
      'twemoji-crushed.png': {
        'url': 'https://www.dropbox.com/s/qhv7z50uoohomej/twemoji-crushed.png?dl=1',
        'row': 41,
        'column': 56,
        'height': 2952,
        'width': 4032
      }
    }
  },
  'emojis': [
    {
      'id': 'grinning',
      'name': 'grinning face',
      'shortcut': 'grinning',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 1,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'grimacing',
      'name': 'grimacing face',
      'shortcut': 'grimacing',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 2,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'grin',
      'name': 'grinning face with smiling eyes',
      'shortcut': 'grin',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 3,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'joy',
      'name': 'face with tears of joy',
      'shortcut': 'joy',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 4,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smiley',
      'name': 'smiling face with open mouth',
      'shortcut': 'smiley',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 5,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smile',
      'name': 'smiling face with open mouth and smiling eyes',
      'shortcut': 'smile',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 6,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sweat_smile',
      'name': 'smiling face with open mouth and cold sweat',
      'shortcut': 'sweat_smile',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 7,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'laughing',
      'name': 'smiling face with open mouth and tightly-closed eyes',
      'shortcut': 'laughing',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 8,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'innocent',
      'name': 'smiling face with halo',
      'shortcut': 'innocent',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 9,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wink',
      'name': 'winking face',
      'shortcut': 'wink',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blush',
      'name': 'smiling face with smiling eyes',
      'shortcut': 'blush',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 11,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'slight_smile',
      'name': 'slightly smiling face',
      'shortcut': 'slight_smile',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 12,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'upside_down',
      'name': 'upside-down face',
      'shortcut': 'upside_down',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 13,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'relaxed',
      'name': 'white smiling face',
      'shortcut': 'relaxed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 14,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'yum',
      'name': 'face savouring delicious food',
      'shortcut': 'yum',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 15,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'relieved',
      'name': 'relieved face',
      'shortcut': 'relieved',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 16,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heart_eyes',
      'name': 'smiling face with heart-shaped eyes',
      'shortcut': 'heart_eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 17,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kissing_heart',
      'name': 'face throwing a kiss',
      'shortcut': 'kissing_heart',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 18,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kissing',
      'name': 'kissing face',
      'shortcut': 'kissing',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 19,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kissing_smiling_eyes',
      'name': 'kissing face with smiling eyes',
      'shortcut': 'kissing_smiling_eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 20,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kissing_closed_eyes',
      'name': 'kissing face with closed eyes',
      'shortcut': 'kissing_closed_eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 21,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stuck_out_tongue_winking_eye',
      'name': 'face with stuck-out tongue and winking eye',
      'shortcut': 'stuck_out_tongue_winking_eye',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 22,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stuck_out_tongue_closed_eyes',
      'name': 'face with stuck-out tongue and tightly-closed eyes',
      'shortcut': 'stuck_out_tongue_closed_eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 23,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stuck_out_tongue',
      'name': 'face with stuck-out tongue',
      'shortcut': 'stuck_out_tongue',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 24,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'money_mouth',
      'name': 'money-mouth face',
      'shortcut': 'money_mouth',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 25,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'nerd',
      'name': 'nerd face',
      'shortcut': 'nerd',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 26,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sunglasses',
      'name': 'smiling face with sunglasses',
      'shortcut': 'sunglasses',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 27,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hugging',
      'name': 'hugging face',
      'shortcut': 'hugging',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 28,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smirk',
      'name': 'smirking face',
      'shortcut': 'smirk',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 29,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_mouth',
      'name': 'face without mouth',
      'shortcut': 'no_mouth',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 30,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'neutral_face',
      'name': 'neutral face',
      'shortcut': 'neutral_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 31,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'expressionless',
      'name': 'expressionless face',
      'shortcut': 'expressionless',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 32,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'unamused',
      'name': 'unamused face',
      'shortcut': 'unamused',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 33,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rolling_eyes',
      'name': 'face with rolling eyes',
      'shortcut': 'rolling_eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 34,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'thinking',
      'name': 'thinking face',
      'shortcut': 'thinking',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 35,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flushed',
      'name': 'flushed face',
      'shortcut': 'flushed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 36,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'disappointed',
      'name': 'disappointed face',
      'shortcut': 'disappointed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 37,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'worried',
      'name': 'worried face',
      'shortcut': 'worried',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 38,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'angry',
      'name': 'angry face',
      'shortcut': 'angry',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 39,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rage',
      'name': 'pouting face',
      'shortcut': 'rage',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 40,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pensive',
      'name': 'pensive face',
      'shortcut': 'pensive',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 41,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'confused',
      'name': 'confused face',
      'shortcut': 'confused',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 42,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'slight_frown',
      'name': 'slightly frowning face',
      'shortcut': 'slight_frown',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 43,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'frowning2',
      'name': 'white frowning face',
      'shortcut': 'frowning2',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 44,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'persevere',
      'name': 'persevering face',
      'shortcut': 'persevere',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 45,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'confounded',
      'name': 'confounded face',
      'shortcut': 'confounded',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 46,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tired_face',
      'name': 'tired face',
      'shortcut': 'tired_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 47,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'weary',
      'name': 'weary face',
      'shortcut': 'weary',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 48,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'triumph',
      'name': 'face with look of triumph',
      'shortcut': 'triumph',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 49,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'open_mouth',
      'name': 'face with open mouth',
      'shortcut': 'open_mouth',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 50,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scream',
      'name': 'face screaming in fear',
      'shortcut': 'scream',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 51,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fearful',
      'name': 'fearful face',
      'shortcut': 'fearful',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 52,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cold_sweat',
      'name': 'face with open mouth and cold sweat',
      'shortcut': 'cold_sweat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 53,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hushed',
      'name': 'hushed face',
      'shortcut': 'hushed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 54,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'frowning',
      'name': 'frowning face with open mouth',
      'shortcut': 'frowning',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 55,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'anguished',
      'name': 'anguished face',
      'shortcut': 'anguished',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 56,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cry',
      'name': 'crying face',
      'shortcut': 'cry',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 57,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'disappointed_relieved',
      'name': 'disappointed but relieved face',
      'shortcut': 'disappointed_relieved',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 58,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sleepy',
      'name': 'sleepy face',
      'shortcut': 'sleepy',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 59,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sweat',
      'name': 'face with cold sweat',
      'shortcut': 'sweat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 60,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sob',
      'name': 'loudly crying face',
      'shortcut': 'sob',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 61,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dizzy_face',
      'name': 'dizzy face',
      'shortcut': 'dizzy_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 62,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'astonished',
      'name': 'astonished face',
      'shortcut': 'astonished',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 63,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'zipper_mouth',
      'name': 'zipper-mouth face',
      'shortcut': 'zipper_mouth',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 64,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mask',
      'name': 'face with medical mask',
      'shortcut': 'mask',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 65,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'thermometer_face',
      'name': 'face with thermometer',
      'shortcut': 'thermometer_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 66,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'head_bandage',
      'name': 'face with head-bandage',
      'shortcut': 'head_bandage',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 67,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sleeping',
      'name': 'sleeping face',
      'shortcut': 'sleeping',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 68,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'zzz',
      'name': 'sleeping symbol',
      'shortcut': 'zzz',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 69,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'poop',
      'name': 'pile of poo',
      'shortcut': 'poop',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 70,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smiling_imp',
      'name': 'smiling face with horns',
      'shortcut': 'smiling_imp',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 71,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'imp',
      'name': 'imp',
      'shortcut': 'imp',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 72,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'japanese_ogre',
      'name': 'japanese ogre',
      'shortcut': 'japanese_ogre',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 73,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': 'japanese_goblin',
      'name': 'japanese goblin',
      'shortcut': 'japanese_goblin',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 74,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'skull',
      'name': 'skull',
      'shortcut': 'skull',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 75,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ghost',
      'name': 'ghost',
      'shortcut': 'ghost',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 76,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'alien',
      'name': 'extraterrestrial alien',
      'shortcut': 'alien',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 77,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'robot',
      'name': 'robot face',
      'shortcut': 'robot',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 78,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smiley_cat',
      'name': 'smiling cat face with open mouth',
      'shortcut': 'smiley_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 79,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smile_cat',
      'name': 'grinning cat face with smiling eyes',
      'shortcut': 'smile_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 80,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'joy_cat',
      'name': 'cat face with tears of joy',
      'shortcut': 'joy_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 81,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heart_eyes_cat',
      'name': 'smiling cat face with heart-shaped eyes',
      'shortcut': 'heart_eyes_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 82,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smirk_cat',
      'name': 'cat face with wry smile',
      'shortcut': 'smirk_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 83,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kissing_cat',
      'name': 'kissing cat face with closed eyes',
      'shortcut': 'kissing_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 84,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scream_cat',
      'name': 'weary cat face',
      'shortcut': 'scream_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 85,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crying_cat_face',
      'name': 'crying cat face',
      'shortcut': 'crying_cat_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 86,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pouting_cat',
      'name': 'pouting cat face',
      'shortcut': 'pouting_cat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 87,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'raised_hands',
      'name': 'person raising both hands in celebration',
      'shortcut': 'raised_hands',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 88,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 16
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 16
      },
      'hasSkinVariations': true
    },
    {
      'id': 'clap',
      'name': 'clapping hands sign',
      'shortcut': 'clap',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 89,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'wave',
      'name': 'waving hand sign',
      'shortcut': 'wave',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 90,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 13
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 13
      },
      'hasSkinVariations': true
    },
    {
      'id': 'thumbsup',
      'name': 'thumbs up sign',
      'shortcut': 'thumbsup',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 91,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 288,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 4,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 360,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 5,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'thumbsdown',
      'name': 'thumbs down sign',
      'shortcut': 'thumbsdown',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 92,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'punch',
      'name': 'fisted hand sign',
      'shortcut': 'punch',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 93,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 13
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 13
      },
      'hasSkinVariations': true
    },
    {
      'id': 'fist',
      'name': 'raised fist',
      'shortcut': 'fist',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 94,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 38
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 38
      },
      'hasSkinVariations': true
    },
    {
      'id': 'v',
      'name': 'victory hand',
      'shortcut': 'v',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 95,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 38
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 38
      },
      'hasSkinVariations': true
    },
    {
      'id': 'ok_hand',
      'name': 'ok hand sign',
      'shortcut': 'ok_hand',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 96,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 936,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 13
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'raised_hand',
      'name': 'raised hand',
      'shortcut': 'raised_hand',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 97,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 38
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 38
      },
      'hasSkinVariations': true
    },
    {
      'id': 'open_hands',
      'name': 'open hands sign',
      'shortcut': 'open_hands',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 98,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'muscle',
      'name': 'flexed biceps',
      'shortcut': 'muscle',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 99,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 576,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 8
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 144,
          'y': 576,
          'height': 72,
          'width': 72,
          'xIndex': 2,
          'yIndex': 8
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 576,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 8
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 288,
          'y': 576,
          'height': 72,
          'width': 72,
          'xIndex': 4,
          'yIndex': 8
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 360,
          'y': 576,
          'height': 72,
          'width': 72,
          'xIndex': 5,
          'yIndex': 8
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 8
      },
      'hasSkinVariations': true
    },
    {
      'id': 'pray',
      'name': 'person with folded hands',
      'shortcut': 'pray',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 100,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1872,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 26,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 17
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 17
      },
      'hasSkinVariations': true
    },
    {
      'id': 'point_up',
      'name': 'white up pointing index',
      'shortcut': 'point_up',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 101,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 38
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 38
      },
      'hasSkinVariations': true
    },
    {
      'id': 'point_up_2',
      'name': 'white up pointing backhand index',
      'shortcut': 'point_up_2',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 102,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'point_down',
      'name': 'white down pointing backhand index',
      'shortcut': 'point_down',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 103,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'point_left',
      'name': 'white left pointing backhand index',
      'shortcut': 'point_left',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 104,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1656,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 23,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1728,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 24,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'point_right',
      'name': 'white right pointing backhand index',
      'shortcut': 'point_right',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 105,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1872,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 26,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2160,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 30,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'middle_finger',
      'name': 'reversed hand with middle finger extended',
      'shortcut': 'middle_finger',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 106,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 31
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 31
      },
      'hasSkinVariations': true
    },
    {
      'id': 'hand_splayed',
      'name': 'raised hand with fingers splayed',
      'shortcut': 'hand_splayed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 107,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 31
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 31
      },
      'hasSkinVariations': true
    },
    {
      'id': 'metal',
      'name': 'sign of the horns',
      'shortcut': 'metal',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 108,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 34
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 34
      },
      'hasSkinVariations': true
    },
    {
      'id': 'vulcan',
      'name': 'raised hand with part between middle and ring fingers',
      'shortcut': 'vulcan',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 109,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 2304,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 32
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 2304,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 32
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2304,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 32
      },
      'hasSkinVariations': true
    },
    {
      'id': 'writing_hand',
      'name': 'writing hand',
      'shortcut': 'writing_hand',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 110,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 2736,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 38
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 2808,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 39
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 39
      },
      'hasSkinVariations': true
    },
    {
      'id': 'nail_care',
      'name': 'nail polish',
      'shortcut': 'nail_care',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 111,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1728,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 24,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1872,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 26,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 29
      },
      'hasSkinVariations': true
    },
    {
      'id': 'lips',
      'name': 'mouth',
      'shortcut': 'lips',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 112,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tongue',
      'name': 'tongue',
      'shortcut': 'tongue',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 113,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ear',
      'name': 'ear',
      'shortcut': 'ear',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 114,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 1512,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 21
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 1512,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 21
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 1512,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 21
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 1512,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 21
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 1512,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 21
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 21
      },
      'hasSkinVariations': true
    },
    {
      'id': 'nose',
      'name': 'nose',
      'shortcut': 'nose',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 115,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 144,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 2,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 288,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 4,
          'yIndex': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 22
      },
      'hasSkinVariations': true
    },
    {
      'id': 'eye',
      'name': 'eye',
      'shortcut': 'eye',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 116,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eyes',
      'name': 'eyes',
      'shortcut': 'eyes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 117,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bust_in_silhouette',
      'name': 'bust in silhouette',
      'shortcut': 'bust_in_silhouette',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 118,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'busts_in_silhouette',
      'name': 'busts in silhouette',
      'shortcut': 'busts_in_silhouette',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 119,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speaking_head',
      'name': 'speaking head in silhouette',
      'shortcut': 'speaking_head',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 120,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baby',
      'name': 'baby',
      'shortcut': 'baby',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 121,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'boy',
      'name': 'boy',
      'shortcut': 'boy',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 122,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 1584,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 22
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 23
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1656,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 23
      },
      'hasSkinVariations': true
    },
    {
      'id': 'girl',
      'name': 'girl',
      'shortcut': 'girl',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 123,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 288,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 4,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 360,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 5,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 23
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1656,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 23
      },
      'hasSkinVariations': true
    },
    {
      'id': 'man',
      'name': 'man',
      'shortcut': 'man',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 124,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 1656,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 23
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 1728,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 24
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 1728,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 24
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 1728,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 24
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'woman',
      'name': 'woman',
      'shortcut': 'woman',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 125,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 1800,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 25
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1800,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 25
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 1872,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 26
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 1872,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 26
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 1872,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 26
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'person_with_blond_hair',
      'name': 'person with blond hair',
      'shortcut': 'person_with_blond_hair',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 126,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 27
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'older_man',
      'name': 'older man',
      'shortcut': 'older_man',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 127,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'older_woman',
      'name': 'older woman',
      'shortcut': 'older_woman',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 128,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'man_with_gua_pi_mao',
      'name': 'man with gua pi mao',
      'shortcut': 'man_with_gua_pi_mao',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 129,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 27
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'man_with_turban',
      'name': 'man with turban',
      'shortcut': 'man_with_turban',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 130,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'cop',
      'name': 'police officer',
      'shortcut': 'cop',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 131,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'construction_worker',
      'name': 'construction worker',
      'shortcut': 'construction_worker',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 132,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'guardsman',
      'name': 'guardsman',
      'shortcut': 'guardsman',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 133,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 29
      },
      'hasSkinVariations': true
    },
    {
      'id': 'spy',
      'name': 'sleuth or spy',
      'shortcut': 'spy',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 134,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 31
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 31
      },
      'hasSkinVariations': true
    },
    {
      'id': 'santa',
      'name': 'father christmas',
      'shortcut': 'santa',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 135,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 1440,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 20
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 1440,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 20
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 1440,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 20
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1440,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 20
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 1440,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 20
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 20
      },
      'hasSkinVariations': true
    },
    {
      'id': 'angel',
      'name': 'baby angel',
      'shortcut': 'angel',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 136,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 14
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 1008,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 14
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'princess',
      'name': 'princess',
      'shortcut': 'princess',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 137,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2808,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 39,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 28
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2016,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 28
      },
      'hasSkinVariations': true
    },
    {
      'id': 'bride_with_veil',
      'name': 'bride with veil',
      'shortcut': 'bride_with_veil',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 138,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1656,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 23,
          'yIndex': 27
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1728,
          'y': 1944,
          'height': 72,
          'width': 72,
          'xIndex': 24,
          'yIndex': 27
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'walking',
      'name': 'pedestrian',
      'shortcut': 'walking',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 139,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 360,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 5,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 11
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 11
      },
      'hasSkinVariations': true
    },
    {
      'id': 'runner',
      'name': 'runner',
      'shortcut': 'runner',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 140,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2808,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 39,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 5
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 5
      },
      'hasSkinVariations': true
    },
    {
      'id': 'dancer',
      'name': 'dancer',
      'shortcut': 'dancer',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 141,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 29
      },
      'hasSkinVariations': true
    },
    {
      'id': 'dancers',
      'name': 'woman with bunny ears',
      'shortcut': 'dancers',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 142,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46f-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46f-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46f-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46f-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46f-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'couple',
      'name': 'man and woman holding hands',
      'shortcut': 'couple',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 143,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46b-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46b-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46b-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46b-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46b-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'two_men_holding_hands',
      'name': 'two men holding hands',
      'shortcut': 'two_men_holding_hands',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 144,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46c-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46c-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46c-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46c-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46c-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'two_women_holding_hands',
      'name': 'two women holding hands',
      'shortcut': 'two_women_holding_hands',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 145,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46d-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46d-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46d-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46d-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46d-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'bow',
      'name': 'person bowing deeply',
      'shortcut': 'bow',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 146,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2160,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 30,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 33
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 33
      },
      'hasSkinVariations': true
    },
    {
      'id': 'information_desk_person',
      'name': 'information desk person',
      'shortcut': 'information_desk_person',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 147,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 2016,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 28
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 29
      },
      'hasSkinVariations': true
    },
    {
      'id': 'no_good',
      'name': 'face with no good gesture',
      'shortcut': 'no_good',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 148,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 2304,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 32
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 2304,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 32
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 33
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 33
      },
      'hasSkinVariations': true
    },
    {
      'id': 'ok_woman',
      'name': 'face with ok gesture',
      'shortcut': 'ok_woman',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 149,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 33
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 2376,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 33
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 33
      },
      'hasSkinVariations': true
    },
    {
      'id': 'raising_hand',
      'name': 'happy person raising one hand',
      'shortcut': 'raising_hand',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 150,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2160,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 30,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 16
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 16
      },
      'hasSkinVariations': true
    },
    {
      'id': 'person_with_pouting_face',
      'name': 'person with pouting face',
      'shortcut': 'person_with_pouting_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 151,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 17
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 17
      },
      'hasSkinVariations': true
    },
    {
      'id': 'person_frowning',
      'name': 'person frowning',
      'shortcut': 'person_frowning',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 152,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 1152,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 16
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 144,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 2,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 360,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 5,
          'yIndex': 17
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 17
      },
      'hasSkinVariations': true
    },
    {
      'id': 'haircut',
      'name': 'haircut',
      'shortcut': 'haircut',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 153,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 30
      },
      'hasSkinVariations': true
    },
    {
      'id': 'massage',
      'name': 'face massage',
      'shortcut': 'massage',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 154,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2160,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 30,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 29
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 2088,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 29
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 29
      },
      'hasSkinVariations': true
    },
    {
      'id': 'couple_with_heart',
      'name': 'couple with heart',
      'shortcut': 'couple_with_heart',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 155,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 27
      },
      'hasSkinVariations': false
    },
    {
      'id': 'couple_ww',
      'name': 'couple (woman,woman)',
      'shortcut': 'couple_ww',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 156,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f469-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f469-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f469-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f469-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f469-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'couple_mm',
      'name': 'couple (man,man)',
      'shortcut': 'couple_mm',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 157,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f468-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f468-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f468-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f468-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f468-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'couplekiss',
      'name': 'kiss',
      'shortcut': 'couplekiss',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 158,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 27
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kiss_ww',
      'name': 'kiss (woman,woman)',
      'shortcut': 'kiss_ww',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 159,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f48b-1f469-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f48b-1f469-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f48b-1f469-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f48b-1f469-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-2764-1f48b-1f469-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'kiss_mm',
      'name': 'kiss (man,man)',
      'shortcut': 'kiss_mm',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 160,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f48b-1f468-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f48b-1f468-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f48b-1f468-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f48b-1f468-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-2764-1f48b-1f468-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family',
      'name': 'family',
      'shortcut': 'family',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 161,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46a-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46a-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46a-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46a-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f46a-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 14
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mwg',
      'name': 'family (man,woman,girl)',
      'shortcut': 'family_mwg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 162,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mwgb',
      'name': 'family (man,woman,girl,boy)',
      'shortcut': 'family_mwgb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 163,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mwbb',
      'name': 'family (man,woman,boy,boy)',
      'shortcut': 'family_mwbb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 164,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f466-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f466-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f466-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f466-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f466-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mwgg',
      'name': 'family (man,woman,girl,girl)',
      'shortcut': 'family_mwgg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 165,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f469-1f467-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_wwb',
      'name': 'family (woman,woman,boy)',
      'shortcut': 'family_wwb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 166,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_wwg',
      'name': 'family (woman,woman,girl)',
      'shortcut': 'family_wwg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 167,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_wwgb',
      'name': 'family (woman,woman,girl,boy)',
      'shortcut': 'family_wwgb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 168,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_wwbb',
      'name': 'family (woman,woman,boy,boy)',
      'shortcut': 'family_wwbb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 169,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f466-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_wwgg',
      'name': 'family (woman,woman,girl,girl)',
      'shortcut': 'family_wwgg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 170,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f469-1f469-1f467-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1944,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 27
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mmb',
      'name': 'family (man,man,boy)',
      'shortcut': 'family_mmb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 171,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1728,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 24
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mmg',
      'name': 'family (man,man,girl)',
      'shortcut': 'family_mmg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 172,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mmgb',
      'name': 'family (man,man,girl,boy)',
      'shortcut': 'family_mmgb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 173,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1728,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 24
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mmbb',
      'name': 'family (man,man,boy,boy)',
      'shortcut': 'family_mmbb',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 174,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f466-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f466-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f466-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f466-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f466-1f466-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1728,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 24
      },
      'hasSkinVariations': true
    },
    {
      'id': 'family_mmgg',
      'name': 'family (man,man,girl,girl)',
      'shortcut': 'family_mmgg',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 175,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f467-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f467-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f467-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f467-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f468-1f468-1f467-1f467-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1800,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 25
      },
      'hasSkinVariations': true
    },
    {
      'id': 'womans_clothes',
      'name': 'womans clothes',
      'shortcut': 'womans_clothes',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 176,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shirt',
      'name': 't-shirt',
      'shortcut': 'shirt',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 177,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'jeans',
      'name': 'jeans',
      'shortcut': 'jeans',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 178,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'necktie',
      'name': 'necktie',
      'shortcut': 'necktie',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 179,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dress',
      'name': 'dress',
      'shortcut': 'dress',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 180,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bikini',
      'name': 'bikini',
      'shortcut': 'bikini',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 181,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kimono',
      'name': 'kimono',
      'shortcut': 'kimono',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 182,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lipstick',
      'name': 'lipstick',
      'shortcut': 'lipstick',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 183,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2088,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 29
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kiss',
      'name': 'kiss mark',
      'shortcut': 'kiss',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 184,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'footprints',
      'name': 'footprints',
      'shortcut': 'footprints',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 185,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'high_heel',
      'name': 'high-heeled shoe',
      'shortcut': 'high_heel',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 186,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sandal',
      'name': 'womans sandal',
      'shortcut': 'sandal',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 187,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'boot',
      'name': 'womans boots',
      'shortcut': 'boot',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 188,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mans_shoe',
      'name': 'mans shoe',
      'shortcut': 'mans_shoe',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 189,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'athletic_shoe',
      'name': 'athletic shoe',
      'shortcut': 'athletic_shoe',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 190,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'womans_hat',
      'name': 'womans hat',
      'shortcut': 'womans_hat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 191,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tophat',
      'name': 'top hat',
      'shortcut': 'tophat',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 192,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'helmet_with_cross',
      'name': 'helmet with white cross',
      'shortcut': 'helmet_with_cross',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 193,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mortar_board',
      'name': 'graduation cap',
      'shortcut': 'mortar_board',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 194,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crown',
      'name': 'crown',
      'shortcut': 'crown',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 195,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'school_satchel',
      'name': 'school satchel',
      'shortcut': 'school_satchel',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 196,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pouch',
      'name': 'pouch',
      'shortcut': 'pouch',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 197,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'purse',
      'name': 'purse',
      'shortcut': 'purse',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 198,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'handbag',
      'name': 'handbag',
      'shortcut': 'handbag',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 199,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'briefcase',
      'name': 'briefcase',
      'shortcut': 'briefcase',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 200,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eyeglasses',
      'name': 'eyeglasses',
      'shortcut': 'eyeglasses',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 201,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1584,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dark_sunglasses',
      'name': 'dark sunglasses',
      'shortcut': 'dark_sunglasses',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 202,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ring',
      'name': 'ring',
      'shortcut': 'ring',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 203,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'closed_umbrella',
      'name': 'closed umbrella',
      'shortcut': 'closed_umbrella',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 204,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cowboy',
      'name': 'face with cowboy hat',
      'shortcut': 'cowboy',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10103,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clown',
      'name': 'clown face',
      'shortcut': 'clown',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10104,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'nauseated_face',
      'name': 'nauseated face',
      'shortcut': 'nauseated_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10105,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rofl',
      'name': 'rolling on the floor laughing',
      'shortcut': 'rofl',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10106,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'drooling_face',
      'name': 'drooling face',
      'shortcut': 'drooling_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10107,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lying_face',
      'name': 'lying face',
      'shortcut': 'lying_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10108,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sneezing_face',
      'name': 'sneezing face',
      'shortcut': 'sneezing_face',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10109,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'prince',
      'name': 'prince',
      'shortcut': 'prince',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10110,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 144,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 2,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 288,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 4,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'man_in_tuxedo',
      'name': 'man in tuxedo',
      'shortcut': 'man_in_tuxedo',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10111,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'mrs_claus',
      'name': 'mother christmas',
      'shortcut': 'mrs_claus',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10112,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1008,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 14,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'face_palm',
      'name': 'face palm',
      'shortcut': 'face_palm',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10113,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2808,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 39,
          'yIndex': 34
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 34
      },
      'hasSkinVariations': true
    },
    {
      'id': 'shrug',
      'name': 'shrug',
      'shortcut': 'shrug',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10114,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1728,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 24,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1872,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 26,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'pregnant_woman',
      'name': 'pregnant woman',
      'shortcut': 'pregnant_woman',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10115,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 34
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 34
      },
      'hasSkinVariations': true
    },
    {
      'id': 'selfie',
      'name': 'selfie',
      'shortcut': 'selfie',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10116,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3888,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 54,
          'yIndex': 34
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 34
      },
      'hasSkinVariations': true
    },
    {
      'id': 'man_dancing',
      'name': 'man dancing',
      'shortcut': 'man_dancing',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10117,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 1080,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 15
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 1080,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 15
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 1080,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 15
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1080,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 15
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 1080,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 15
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 15
      },
      'hasSkinVariations': true
    },
    {
      'id': 'call_me',
      'name': 'call me hand',
      'shortcut': 'call_me',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10118,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 34
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1656,
          'y': 2448,
          'height': 72,
          'width': 72,
          'xIndex': 23,
          'yIndex': 34
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 34
      },
      'hasSkinVariations': true
    },
    {
      'id': 'raised_back_of_hand',
      'name': 'raised back of hand',
      'shortcut': 'raised_back_of_hand',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10119,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 17
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 17
      },
      'hasSkinVariations': true
    },
    {
      'id': 'left_facing_fist',
      'name': 'left-facing fist',
      'shortcut': 'left_facing_fist',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10120,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3600,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 50,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3744,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 52,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 17
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 17
      },
      'hasSkinVariations': true
    },
    {
      'id': 'right_facing_fist',
      'name': 'right-facing fist',
      'shortcut': 'right_facing_fist',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10121,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 1224,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 17
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 0,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 0,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 144,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 2,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 18
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'handshake',
      'name': 'handshake',
      'shortcut': 'handshake',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10122,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f91d-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f91d-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f91d-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f91d-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f91d-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'fingers_crossed',
      'name': 'hand with first and index finger crossed',
      'shortcut': 'fingers_crossed',
      'type': 'STANDARD',
      'category': 'PEOPLE',
      'order': 10123,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 432,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 6,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 504,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 7,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 18
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'dog',
      'name': 'dog face',
      'shortcut': 'dog',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 205,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cat',
      'name': 'cat face',
      'shortcut': 'cat',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 206,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mouse',
      'name': 'mouse face',
      'shortcut': 'mouse',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 207,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hamster',
      'name': 'hamster face',
      'shortcut': 'hamster',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 208,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rabbit',
      'name': 'rabbit face',
      'shortcut': 'rabbit',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 209,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bear',
      'name': 'bear face',
      'shortcut': 'bear',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 210,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'panda_face',
      'name': 'panda face',
      'shortcut': 'panda_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 211,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'koala',
      'name': 'koala',
      'shortcut': 'koala',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 212,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tiger',
      'name': 'tiger face',
      'shortcut': 'tiger',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 213,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lion_face',
      'name': 'lion face',
      'shortcut': 'lion_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 214,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cow',
      'name': 'cow face',
      'shortcut': 'cow',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 215,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pig',
      'name': 'pig face',
      'shortcut': 'pig',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 216,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pig_nose',
      'name': 'pig nose',
      'shortcut': 'pig_nose',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 217,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'frog',
      'name': 'frog face',
      'shortcut': 'frog',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 218,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'octopus',
      'name': 'octopus',
      'shortcut': 'octopus',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 219,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'monkey_face',
      'name': 'monkey face',
      'shortcut': 'monkey_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 220,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'see_no_evil',
      'name': 'see-no-evil monkey',
      'shortcut': 'see_no_evil',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 221,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hear_no_evil',
      'name': 'hear-no-evil monkey',
      'shortcut': 'hear_no_evil',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 222,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speak_no_evil',
      'name': 'speak-no-evil monkey',
      'shortcut': 'speak_no_evil',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 223,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1152,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': 'monkey',
      'name': 'monkey',
      'shortcut': 'monkey',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 224,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chicken',
      'name': 'chicken',
      'shortcut': 'chicken',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 225,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'penguin',
      'name': 'penguin',
      'shortcut': 'penguin',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 226,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bird',
      'name': 'bird',
      'shortcut': 'bird',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 227,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baby_chick',
      'name': 'baby chick',
      'shortcut': 'baby_chick',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 228,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hatching_chick',
      'name': 'hatching chick',
      'shortcut': 'hatching_chick',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 229,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hatched_chick',
      'name': 'front-facing baby chick',
      'shortcut': 'hatched_chick',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 230,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wolf',
      'name': 'wolf face',
      'shortcut': 'wolf',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 231,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'boar',
      'name': 'boar',
      'shortcut': 'boar',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 232,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'horse',
      'name': 'horse face',
      'shortcut': 'horse',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 233,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'unicorn',
      'name': 'unicorn face',
      'shortcut': 'unicorn',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 234,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bee',
      'name': 'honeybee',
      'shortcut': 'bee',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 235,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bug',
      'name': 'bug',
      'shortcut': 'bug',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 236,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snail',
      'name': 'snail',
      'shortcut': 'snail',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 237,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beetle',
      'name': 'lady beetle',
      'shortcut': 'beetle',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 238,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ant',
      'name': 'ant',
      'shortcut': 'ant',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 239,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'spider',
      'name': 'spider',
      'shortcut': 'spider',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 240,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scorpion',
      'name': 'scorpion',
      'shortcut': 'scorpion',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 241,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crab',
      'name': 'crab',
      'shortcut': 'crab',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 242,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snake',
      'name': 'snake',
      'shortcut': 'snake',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 243,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'turtle',
      'name': 'turtle',
      'shortcut': 'turtle',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 244,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tropical_fish',
      'name': 'tropical fish',
      'shortcut': 'tropical_fish',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 245,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fish',
      'name': 'fish',
      'shortcut': 'fish',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 246,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blowfish',
      'name': 'blowfish',
      'shortcut': 'blowfish',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 247,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dolphin',
      'name': 'dolphin',
      'shortcut': 'dolphin',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 248,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'whale',
      'name': 'spouting whale',
      'shortcut': 'whale',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 249,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'whale2',
      'name': 'whale',
      'shortcut': 'whale2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 250,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crocodile',
      'name': 'crocodile',
      'shortcut': 'crocodile',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 251,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'leopard',
      'name': 'leopard',
      'shortcut': 'leopard',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 252,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tiger2',
      'name': 'tiger',
      'shortcut': 'tiger2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 253,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'water_buffalo',
      'name': 'water buffalo',
      'shortcut': 'water_buffalo',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 254,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ox',
      'name': 'ox',
      'shortcut': 'ox',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 255,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cow2',
      'name': 'cow',
      'shortcut': 'cow2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 256,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dromedary_camel',
      'name': 'dromedary camel',
      'shortcut': 'dromedary_camel',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 257,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'camel',
      'name': 'bactrian camel',
      'shortcut': 'camel',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 258,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'elephant',
      'name': 'elephant',
      'shortcut': 'elephant',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 259,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'goat',
      'name': 'goat',
      'shortcut': 'goat',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 260,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ram',
      'name': 'ram',
      'shortcut': 'ram',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 261,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sheep',
      'name': 'sheep',
      'shortcut': 'sheep',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 262,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'racehorse',
      'name': 'horse',
      'shortcut': 'racehorse',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 263,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pig2',
      'name': 'pig',
      'shortcut': 'pig2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 264,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rat',
      'name': 'rat',
      'shortcut': 'rat',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 265,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mouse2',
      'name': 'mouse',
      'shortcut': 'mouse2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 266,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rooster',
      'name': 'rooster',
      'shortcut': 'rooster',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 267,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'turkey',
      'name': 'turkey',
      'shortcut': 'turkey',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 268,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dove',
      'name': 'dove of peace',
      'shortcut': 'dove',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 269,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dog2',
      'name': 'dog',
      'shortcut': 'dog2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 270,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'poodle',
      'name': 'poodle',
      'shortcut': 'poodle',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 271,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cat2',
      'name': 'cat',
      'shortcut': 'cat2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 272,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rabbit2',
      'name': 'rabbit',
      'shortcut': 'rabbit2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 273,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chipmunk',
      'name': 'chipmunk',
      'shortcut': 'chipmunk',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 274,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'feet',
      'name': 'paw prints',
      'shortcut': 'feet',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 275,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dragon',
      'name': 'dragon',
      'shortcut': 'dragon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 276,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dragon_face',
      'name': 'dragon face',
      'shortcut': 'dragon_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 277,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cactus',
      'name': 'cactus',
      'shortcut': 'cactus',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 278,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'christmas_tree',
      'name': 'christmas tree',
      'shortcut': 'christmas_tree',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 279,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'evergreen_tree',
      'name': 'evergreen tree',
      'shortcut': 'evergreen_tree',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 280,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'deciduous_tree',
      'name': 'deciduous tree',
      'shortcut': 'deciduous_tree',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 281,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'palm_tree',
      'name': 'palm tree',
      'shortcut': 'palm_tree',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 282,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'seedling',
      'name': 'seedling',
      'shortcut': 'seedling',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 283,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'herb',
      'name': 'herb',
      'shortcut': 'herb',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 284,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shamrock',
      'name': 'shamrock',
      'shortcut': 'shamrock',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 285,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'four_leaf_clover',
      'name': 'four leaf clover',
      'shortcut': 'four_leaf_clover',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 286,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bamboo',
      'name': 'pine decoration',
      'shortcut': 'bamboo',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 287,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tanabata_tree',
      'name': 'tanabata tree',
      'shortcut': 'tanabata_tree',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 288,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'leaves',
      'name': 'leaf fluttering in wind',
      'shortcut': 'leaves',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 289,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fallen_leaf',
      'name': 'fallen leaf',
      'shortcut': 'fallen_leaf',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 290,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'maple_leaf',
      'name': 'maple leaf',
      'shortcut': 'maple_leaf',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 291,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ear_of_rice',
      'name': 'ear of rice',
      'shortcut': 'ear_of_rice',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 292,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hibiscus',
      'name': 'hibiscus',
      'shortcut': 'hibiscus',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 293,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sunflower',
      'name': 'sunflower',
      'shortcut': 'sunflower',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 294,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rose',
      'name': 'rose',
      'shortcut': 'rose',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 295,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tulip',
      'name': 'tulip',
      'shortcut': 'tulip',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 296,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blossom',
      'name': 'blossom',
      'shortcut': 'blossom',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 297,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cherry_blossom',
      'name': 'cherry blossom',
      'shortcut': 'cherry_blossom',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 298,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bouquet',
      'name': 'bouquet',
      'shortcut': 'bouquet',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 299,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mushroom',
      'name': 'mushroom',
      'shortcut': 'mushroom',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 300,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chestnut',
      'name': 'chestnut',
      'shortcut': 'chestnut',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 301,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'jack_o_lantern',
      'name': 'jack-o-lantern',
      'shortcut': 'jack_o_lantern',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 302,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shell',
      'name': 'spiral shell',
      'shortcut': 'shell',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 303,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'spider_web',
      'name': 'spider web',
      'shortcut': 'spider_web',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 304,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'earth_americas',
      'name': 'earth globe americas',
      'shortcut': 'earth_americas',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 305,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'earth_africa',
      'name': 'earth globe europe-africa',
      'shortcut': 'earth_africa',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 306,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'earth_asia',
      'name': 'earth globe asia-australia',
      'shortcut': 'earth_asia',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 307,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'full_moon',
      'name': 'full moon symbol',
      'shortcut': 'full_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 308,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'waning_gibbous_moon',
      'name': 'waning gibbous moon symbol',
      'shortcut': 'waning_gibbous_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 309,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'last_quarter_moon',
      'name': 'last quarter moon symbol',
      'shortcut': 'last_quarter_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 310,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'waning_crescent_moon',
      'name': 'waning crescent moon symbol',
      'shortcut': 'waning_crescent_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 311,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'new_moon',
      'name': 'new moon symbol',
      'shortcut': 'new_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 312,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'waxing_crescent_moon',
      'name': 'waxing crescent moon symbol',
      'shortcut': 'waxing_crescent_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 313,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'first_quarter_moon',
      'name': 'first quarter moon symbol',
      'shortcut': 'first_quarter_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 314,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'waxing_gibbous_moon',
      'name': 'waxing gibbous moon symbol',
      'shortcut': 'waxing_gibbous_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 315,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'new_moon_with_face',
      'name': 'new moon with face',
      'shortcut': 'new_moon_with_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 316,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'full_moon_with_face',
      'name': 'full moon with face',
      'shortcut': 'full_moon_with_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 317,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'first_quarter_moon_with_face',
      'name': 'first quarter moon with face',
      'shortcut': 'first_quarter_moon_with_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 318,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'last_quarter_moon_with_face',
      'name': 'last quarter moon with face',
      'shortcut': 'last_quarter_moon_with_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 319,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sun_with_face',
      'name': 'sun with face',
      'shortcut': 'sun_with_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 320,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crescent_moon',
      'name': 'crescent moon',
      'shortcut': 'crescent_moon',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 321,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'star',
      'name': 'white medium star',
      'shortcut': 'star',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 322,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'star2',
      'name': 'glowing star',
      'shortcut': 'star2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 323,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dizzy',
      'name': 'dizzy symbol',
      'shortcut': 'dizzy',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 324,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sparkles',
      'name': 'sparkles',
      'shortcut': 'sparkles',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 325,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'comet',
      'name': 'comet',
      'shortcut': 'comet',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 326,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sunny',
      'name': 'black sun with rays',
      'shortcut': 'sunny',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 327,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_sun_small_cloud',
      'name': 'white sun with small cloud',
      'shortcut': 'white_sun_small_cloud',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 328,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'partly_sunny',
      'name': 'sun behind cloud',
      'shortcut': 'partly_sunny',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 329,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_sun_cloud',
      'name': 'white sun behind cloud',
      'shortcut': 'white_sun_cloud',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 330,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_sun_rain_cloud',
      'name': 'white sun behind cloud with rain',
      'shortcut': 'white_sun_rain_cloud',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 331,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cloud',
      'name': 'cloud',
      'shortcut': 'cloud',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 332,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cloud_rain',
      'name': 'cloud with rain',
      'shortcut': 'cloud_rain',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 333,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'thunder_cloud_rain',
      'name': 'thunder cloud and rain',
      'shortcut': 'thunder_cloud_rain',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 334,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cloud_lightning',
      'name': 'cloud with lightning',
      'shortcut': 'cloud_lightning',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 335,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'zap',
      'name': 'high voltage sign',
      'shortcut': 'zap',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 336,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fire',
      'name': 'fire',
      'shortcut': 'fire',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 337,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'boom',
      'name': 'collision symbol',
      'shortcut': 'boom',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 338,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snowflake',
      'name': 'snowflake',
      'shortcut': 'snowflake',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 339,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cloud_snow',
      'name': 'cloud with snow',
      'shortcut': 'cloud_snow',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 340,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snowman2',
      'name': 'snowman',
      'shortcut': 'snowman2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 341,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snowman',
      'name': 'snowman without snow',
      'shortcut': 'snowman',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 342,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wind_blowing_face',
      'name': 'wind blowing face',
      'shortcut': 'wind_blowing_face',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 343,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dash',
      'name': 'dash symbol',
      'shortcut': 'dash',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 344,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cloud_tornado',
      'name': 'cloud with tornado',
      'shortcut': 'cloud_tornado',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 345,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fog',
      'name': 'fog',
      'shortcut': 'fog',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 346,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'umbrella2',
      'name': 'umbrella',
      'shortcut': 'umbrella2',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 347,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'umbrella',
      'name': 'umbrella with rain drops',
      'shortcut': 'umbrella',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 348,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'droplet',
      'name': 'droplet',
      'shortcut': 'droplet',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 349,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sweat_drops',
      'name': 'splashing sweat symbol',
      'shortcut': 'sweat_drops',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 350,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ocean',
      'name': 'water wave',
      'shortcut': 'ocean',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 351,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eagle',
      'name': 'eagle',
      'shortcut': 'eagle',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10125,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'duck',
      'name': 'duck',
      'shortcut': 'duck',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10126,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bat',
      'name': 'bat',
      'shortcut': 'bat',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10127,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shark',
      'name': 'shark',
      'shortcut': 'shark',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10128,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'owl',
      'name': 'owl',
      'shortcut': 'owl',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10129,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fox',
      'name': 'fox face',
      'shortcut': 'fox',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10130,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'butterfly',
      'name': 'butterfly',
      'shortcut': 'butterfly',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10131,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'deer',
      'name': 'deer',
      'shortcut': 'deer',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10132,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gorilla',
      'name': 'gorilla',
      'shortcut': 'gorilla',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10133,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lizard',
      'name': 'lizard',
      'shortcut': 'lizard',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10134,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rhino',
      'name': 'rhinoceros',
      'shortcut': 'rhino',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10135,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wilted_rose',
      'name': 'wilted flower',
      'shortcut': 'wilted_rose',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10136,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 35
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shrimp',
      'name': 'shrimp',
      'shortcut': 'shrimp',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10168,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'squid',
      'name': 'squid',
      'shortcut': 'squid',
      'type': 'STANDARD',
      'category': 'NATURE',
      'order': 10169,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'green_apple',
      'name': 'green apple',
      'shortcut': 'green_apple',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 352,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'apple',
      'name': 'red apple',
      'shortcut': 'apple',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 353,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pear',
      'name': 'pear',
      'shortcut': 'pear',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 354,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tangerine',
      'name': 'tangerine',
      'shortcut': 'tangerine',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 355,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lemon',
      'name': 'lemon',
      'shortcut': 'lemon',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 356,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'banana',
      'name': 'banana',
      'shortcut': 'banana',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 357,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'watermelon',
      'name': 'watermelon',
      'shortcut': 'watermelon',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 358,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'grapes',
      'name': 'grapes',
      'shortcut': 'grapes',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 359,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'strawberry',
      'name': 'strawberry',
      'shortcut': 'strawberry',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 360,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'melon',
      'name': 'melon',
      'shortcut': 'melon',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 361,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cherries',
      'name': 'cherries',
      'shortcut': 'cherries',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 362,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'peach',
      'name': 'peach',
      'shortcut': 'peach',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 363,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pineapple',
      'name': 'pineapple',
      'shortcut': 'pineapple',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 364,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tomato',
      'name': 'tomato',
      'shortcut': 'tomato',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 365,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eggplant',
      'name': 'aubergine',
      'shortcut': 'eggplant',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 366,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hot_pepper',
      'name': 'hot pepper',
      'shortcut': 'hot_pepper',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 367,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'corn',
      'name': 'ear of maize',
      'shortcut': 'corn',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 368,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sweet_potato',
      'name': 'roasted sweet potato',
      'shortcut': 'sweet_potato',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 369,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'honey_pot',
      'name': 'honey pot',
      'shortcut': 'honey_pot',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 370,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bread',
      'name': 'bread',
      'shortcut': 'bread',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 371,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cheese',
      'name': 'cheese wedge',
      'shortcut': 'cheese',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 372,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'poultry_leg',
      'name': 'poultry leg',
      'shortcut': 'poultry_leg',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 373,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'meat_on_bone',
      'name': 'meat on bone',
      'shortcut': 'meat_on_bone',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 374,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fried_shrimp',
      'name': 'fried shrimp',
      'shortcut': 'fried_shrimp',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 375,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cooking',
      'name': 'cooking',
      'shortcut': 'cooking',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 376,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hamburger',
      'name': 'hamburger',
      'shortcut': 'hamburger',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 377,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fries',
      'name': 'french fries',
      'shortcut': 'fries',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 378,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hotdog',
      'name': 'hot dog',
      'shortcut': 'hotdog',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 379,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pizza',
      'name': 'slice of pizza',
      'shortcut': 'pizza',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 380,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'spaghetti',
      'name': 'spaghetti',
      'shortcut': 'spaghetti',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 381,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'taco',
      'name': 'taco',
      'shortcut': 'taco',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 382,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'burrito',
      'name': 'burrito',
      'shortcut': 'burrito',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 383,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ramen',
      'name': 'steaming bowl',
      'shortcut': 'ramen',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 384,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stew',
      'name': 'pot of food',
      'shortcut': 'stew',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 385,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fish_cake',
      'name': 'fish cake with swirl design',
      'shortcut': 'fish_cake',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 386,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sushi',
      'name': 'sushi',
      'shortcut': 'sushi',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 387,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bento',
      'name': 'bento box',
      'shortcut': 'bento',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 388,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'curry',
      'name': 'curry and rice',
      'shortcut': 'curry',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 389,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rice_ball',
      'name': 'rice ball',
      'shortcut': 'rice_ball',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 390,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rice',
      'name': 'cooked rice',
      'shortcut': 'rice',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 391,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rice_cracker',
      'name': 'rice cracker',
      'shortcut': 'rice_cracker',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 392,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oden',
      'name': 'oden',
      'shortcut': 'oden',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 393,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dango',
      'name': 'dango',
      'shortcut': 'dango',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 394,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shaved_ice',
      'name': 'shaved ice',
      'shortcut': 'shaved_ice',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 395,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ice_cream',
      'name': 'ice cream',
      'shortcut': 'ice_cream',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 396,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'icecream',
      'name': 'soft ice cream',
      'shortcut': 'icecream',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 397,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cake',
      'name': 'shortcake',
      'shortcut': 'cake',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 398,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'birthday',
      'name': 'birthday cake',
      'shortcut': 'birthday',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 399,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'custard',
      'name': 'custard',
      'shortcut': 'custard',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 400,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'candy',
      'name': 'candy',
      'shortcut': 'candy',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 401,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lollipop',
      'name': 'lollipop',
      'shortcut': 'lollipop',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 402,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chocolate_bar',
      'name': 'chocolate bar',
      'shortcut': 'chocolate_bar',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 403,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'popcorn',
      'name': 'popcorn',
      'shortcut': 'popcorn',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 404,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'doughnut',
      'name': 'doughnut',
      'shortcut': 'doughnut',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 405,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cookie',
      'name': 'cookie',
      'shortcut': 'cookie',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 406,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beer',
      'name': 'beer mug',
      'shortcut': 'beer',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 407,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beers',
      'name': 'clinking beer mugs',
      'shortcut': 'beers',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 408,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wine_glass',
      'name': 'wine glass',
      'shortcut': 'wine_glass',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 409,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cocktail',
      'name': 'cocktail glass',
      'shortcut': 'cocktail',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 410,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tropical_drink',
      'name': 'tropical drink',
      'shortcut': 'tropical_drink',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 411,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'champagne',
      'name': 'bottle with popping cork',
      'shortcut': 'champagne',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 412,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sake',
      'name': 'sake bottle and cup',
      'shortcut': 'sake',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 413,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tea',
      'name': 'teacup without handle',
      'shortcut': 'tea',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 414,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'coffee',
      'name': 'hot beverage',
      'shortcut': 'coffee',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 415,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baby_bottle',
      'name': 'baby bottle',
      'shortcut': 'baby_bottle',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 416,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fork_and_knife',
      'name': 'fork and knife',
      'shortcut': 'fork_and_knife',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 417,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fork_knife_plate',
      'name': 'fork and knife with plate',
      'shortcut': 'fork_knife_plate',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 418,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'croissant',
      'name': 'croissant',
      'shortcut': 'croissant',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10137,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'avocado',
      'name': 'avocado',
      'shortcut': 'avocado',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10138,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cucumber',
      'name': 'cucumber',
      'shortcut': 'cucumber',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10139,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bacon',
      'name': 'bacon',
      'shortcut': 'bacon',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10140,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'potato',
      'name': 'potato',
      'shortcut': 'potato',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10141,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'carrot',
      'name': 'carrot',
      'shortcut': 'carrot',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10142,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'french_bread',
      'name': 'baguette bread',
      'shortcut': 'french_bread',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10143,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'salad',
      'name': 'green salad',
      'shortcut': 'salad',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10144,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shallow_pan_of_food',
      'name': 'shallow pan of food',
      'shortcut': 'shallow_pan_of_food',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10145,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stuffed_flatbread',
      'name': 'stuffed flatbread',
      'shortcut': 'stuffed_flatbread',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10146,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'champagne_glass',
      'name': 'clinking glasses',
      'shortcut': 'champagne_glass',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10147,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tumbler_glass',
      'name': 'tumbler glass',
      'shortcut': 'tumbler_glass',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10148,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'spoon',
      'name': 'spoon',
      'shortcut': 'spoon',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10149,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'egg',
      'name': 'egg',
      'shortcut': 'egg',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10170,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'milk',
      'name': 'glass of milk',
      'shortcut': 'milk',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10171,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'peanuts',
      'name': 'peanuts',
      'shortcut': 'peanuts',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10172,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kiwi',
      'name': 'kiwifruit',
      'shortcut': 'kiwi',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10173,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pancakes',
      'name': 'pancakes',
      'shortcut': 'pancakes',
      'type': 'STANDARD',
      'category': 'FOODS',
      'order': 10174,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'red_car',
      'name': 'automobile',
      'shortcut': 'red_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 476,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'taxi',
      'name': 'taxi',
      'shortcut': 'taxi',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 477,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blue_car',
      'name': 'recreational vehicle',
      'shortcut': 'blue_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 478,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bus',
      'name': 'bus',
      'shortcut': 'bus',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 479,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'trolleybus',
      'name': 'trolleybus',
      'shortcut': 'trolleybus',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 480,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'race_car',
      'name': 'racing car',
      'shortcut': 'race_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 481,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'police_car',
      'name': 'police car',
      'shortcut': 'police_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 482,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ambulance',
      'name': 'ambulance',
      'shortcut': 'ambulance',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 483,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fire_engine',
      'name': 'fire engine',
      'shortcut': 'fire_engine',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 484,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'minibus',
      'name': 'minibus',
      'shortcut': 'minibus',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 485,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'truck',
      'name': 'delivery truck',
      'shortcut': 'truck',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 486,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'articulated_lorry',
      'name': 'articulated lorry',
      'shortcut': 'articulated_lorry',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 487,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tractor',
      'name': 'tractor',
      'shortcut': 'tractor',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 488,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'motorcycle',
      'name': 'racing motorcycle',
      'shortcut': 'motorcycle',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 489,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bike',
      'name': 'bicycle',
      'shortcut': 'bike',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 490,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rotating_light',
      'name': 'police cars revolving light',
      'shortcut': 'rotating_light',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 491,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oncoming_police_car',
      'name': 'oncoming police car',
      'shortcut': 'oncoming_police_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 492,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oncoming_bus',
      'name': 'oncoming bus',
      'shortcut': 'oncoming_bus',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 493,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oncoming_automobile',
      'name': 'oncoming automobile',
      'shortcut': 'oncoming_automobile',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 494,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oncoming_taxi',
      'name': 'oncoming taxi',
      'shortcut': 'oncoming_taxi',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 495,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2448,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': 'aerial_tramway',
      'name': 'aerial tramway',
      'shortcut': 'aerial_tramway',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 496,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mountain_cableway',
      'name': 'mountain cableway',
      'shortcut': 'mountain_cableway',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 497,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'suspension_railway',
      'name': 'suspension railway',
      'shortcut': 'suspension_railway',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 498,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'railway_car',
      'name': 'railway car',
      'shortcut': 'railway_car',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 499,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'train',
      'name': 'tram car',
      'shortcut': 'train',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 500,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'monorail',
      'name': 'monorail',
      'shortcut': 'monorail',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 501,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bullettrain_side',
      'name': 'high-speed train',
      'shortcut': 'bullettrain_side',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 502,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bullettrain_front',
      'name': 'high-speed train with bullet nose',
      'shortcut': 'bullettrain_front',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 503,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'light_rail',
      'name': 'light rail',
      'shortcut': 'light_rail',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 504,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mountain_railway',
      'name': 'mountain railway',
      'shortcut': 'mountain_railway',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 505,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'steam_locomotive',
      'name': 'steam locomotive',
      'shortcut': 'steam_locomotive',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 506,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'train2',
      'name': 'train',
      'shortcut': 'train2',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 507,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'metro',
      'name': 'metro',
      'shortcut': 'metro',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 508,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tram',
      'name': 'tram',
      'shortcut': 'tram',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 509,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'station',
      'name': 'station',
      'shortcut': 'station',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 510,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'helicopter',
      'name': 'helicopter',
      'shortcut': 'helicopter',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 511,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'airplane_small',
      'name': 'small airplane',
      'shortcut': 'airplane_small',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 512,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'airplane',
      'name': 'airplane',
      'shortcut': 'airplane',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 513,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'airplane_departure',
      'name': 'airplane departure',
      'shortcut': 'airplane_departure',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 514,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'airplane_arriving',
      'name': 'airplane arriving',
      'shortcut': 'airplane_arriving',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 515,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sailboat',
      'name': 'sailboat',
      'shortcut': 'sailboat',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 516,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'motorboat',
      'name': 'motorboat',
      'shortcut': 'motorboat',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 517,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speedboat',
      'name': 'speedboat',
      'shortcut': 'speedboat',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 518,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ferry',
      'name': 'ferry',
      'shortcut': 'ferry',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 519,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cruise_ship',
      'name': 'passenger ship',
      'shortcut': 'cruise_ship',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 520,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rocket',
      'name': 'rocket',
      'shortcut': 'rocket',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 521,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2376,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': 'satellite_orbital',
      'name': 'satellite',
      'shortcut': 'satellite_orbital',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 522,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'seat',
      'name': 'seat',
      'shortcut': 'seat',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 523,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'anchor',
      'name': 'anchor',
      'shortcut': 'anchor',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 524,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'construction',
      'name': 'construction sign',
      'shortcut': 'construction',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 525,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fuelpump',
      'name': 'fuel pump',
      'shortcut': 'fuelpump',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 526,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'busstop',
      'name': 'bus stop',
      'shortcut': 'busstop',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 527,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 1224,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': 'vertical_traffic_light',
      'name': 'vertical traffic light',
      'shortcut': 'vertical_traffic_light',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 528,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'traffic_light',
      'name': 'horizontal traffic light',
      'shortcut': 'traffic_light',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 529,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'checkered_flag',
      'name': 'chequered flag',
      'shortcut': 'checkered_flag',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 530,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ship',
      'name': 'ship',
      'shortcut': 'ship',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 531,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ferris_wheel',
      'name': 'ferris wheel',
      'shortcut': 'ferris_wheel',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 532,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'roller_coaster',
      'name': 'roller coaster',
      'shortcut': 'roller_coaster',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 533,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'carousel_horse',
      'name': 'carousel horse',
      'shortcut': 'carousel_horse',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 534,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'construction_site',
      'name': 'building construction',
      'shortcut': 'construction_site',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 535,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'foggy',
      'name': 'foggy',
      'shortcut': 'foggy',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 536,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tokyo_tower',
      'name': 'tokyo tower',
      'shortcut': 'tokyo_tower',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 537,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'factory',
      'name': 'factory',
      'shortcut': 'factory',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 538,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fountain',
      'name': 'fountain',
      'shortcut': 'fountain',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 539,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rice_scene',
      'name': 'moon viewing ceremony',
      'shortcut': 'rice_scene',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 540,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mountain',
      'name': 'mountain',
      'shortcut': 'mountain',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 541,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mountain_snow',
      'name': 'snow capped mountain',
      'shortcut': 'mountain_snow',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 542,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mount_fuji',
      'name': 'mount fuji',
      'shortcut': 'mount_fuji',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 543,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'volcano',
      'name': 'volcano',
      'shortcut': 'volcano',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 544,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'japan',
      'name': 'silhouette of japan',
      'shortcut': 'japan',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 545,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'camping',
      'name': 'camping',
      'shortcut': 'camping',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 546,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tent',
      'name': 'tent',
      'shortcut': 'tent',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 547,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'park',
      'name': 'national park',
      'shortcut': 'park',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 548,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'motorway',
      'name': 'motorway',
      'shortcut': 'motorway',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 549,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'railway_track',
      'name': 'railway track',
      'shortcut': 'railway_track',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 550,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sunrise',
      'name': 'sunrise',
      'shortcut': 'sunrise',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 551,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sunrise_over_mountains',
      'name': 'sunrise over mountains',
      'shortcut': 'sunrise_over_mountains',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 552,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'desert',
      'name': 'desert',
      'shortcut': 'desert',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 553,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beach',
      'name': 'beach with umbrella',
      'shortcut': 'beach',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 554,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'island',
      'name': 'desert island',
      'shortcut': 'island',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 555,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'city_sunset',
      'name': 'sunset over buildings',
      'shortcut': 'city_sunset',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 556,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'city_dusk',
      'name': 'cityscape at dusk',
      'shortcut': 'city_dusk',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 557,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cityscape',
      'name': 'cityscape',
      'shortcut': 'cityscape',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 558,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'night_with_stars',
      'name': 'night with stars',
      'shortcut': 'night_with_stars',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 559,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bridge_at_night',
      'name': 'bridge at night',
      'shortcut': 'bridge_at_night',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 560,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'milky_way',
      'name': 'milky way',
      'shortcut': 'milky_way',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 561,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stars',
      'name': 'shooting star',
      'shortcut': 'stars',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 562,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sparkler',
      'name': 'firework sparkler',
      'shortcut': 'sparkler',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 563,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fireworks',
      'name': 'fireworks',
      'shortcut': 'fireworks',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 564,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rainbow',
      'name': 'rainbow',
      'shortcut': 'rainbow',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 565,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'homes',
      'name': 'house buildings',
      'shortcut': 'homes',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 566,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'european_castle',
      'name': 'european castle',
      'shortcut': 'european_castle',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 567,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'japanese_castle',
      'name': 'japanese castle',
      'shortcut': 'japanese_castle',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 568,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stadium',
      'name': 'stadium',
      'shortcut': 'stadium',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 569,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'statue_of_liberty',
      'name': 'statue of liberty',
      'shortcut': 'statue_of_liberty',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 570,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'house',
      'name': 'house building',
      'shortcut': 'house',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 571,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'house_with_garden',
      'name': 'house with garden',
      'shortcut': 'house_with_garden',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 572,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'house_abandoned',
      'name': 'derelict house building',
      'shortcut': 'house_abandoned',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 573,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'office',
      'name': 'office building',
      'shortcut': 'office',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 574,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'department_store',
      'name': 'department store',
      'shortcut': 'department_store',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 575,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'post_office',
      'name': 'japanese post office',
      'shortcut': 'post_office',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 576,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'european_post_office',
      'name': 'european post office',
      'shortcut': 'european_post_office',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 577,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hospital',
      'name': 'hospital',
      'shortcut': 'hospital',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 578,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bank',
      'name': 'bank',
      'shortcut': 'bank',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 579,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hotel',
      'name': 'hotel',
      'shortcut': 'hotel',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 580,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'convenience_store',
      'name': 'convenience store',
      'shortcut': 'convenience_store',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 581,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'school',
      'name': 'school',
      'shortcut': 'school',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 582,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'love_hotel',
      'name': 'love hotel',
      'shortcut': 'love_hotel',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 583,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wedding',
      'name': 'wedding',
      'shortcut': 'wedding',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 584,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'classical_building',
      'name': 'classical building',
      'shortcut': 'classical_building',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 585,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'church',
      'name': 'church',
      'shortcut': 'church',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 586,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mosque',
      'name': 'mosque',
      'shortcut': 'mosque',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 587,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'synagogue',
      'name': 'synagogue',
      'shortcut': 'synagogue',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 588,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'kaaba',
      'name': 'kaaba',
      'shortcut': 'kaaba',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 589,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shinto_shrine',
      'name': 'shinto shrine',
      'shortcut': 'shinto_shrine',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 590,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scooter',
      'name': 'scooter',
      'shortcut': 'scooter',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 10152,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'motor_scooter',
      'name': 'motor scooter',
      'shortcut': 'motor_scooter',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 10153,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'canoe',
      'name': 'canoe',
      'shortcut': 'canoe',
      'type': 'STANDARD',
      'category': 'PLACES',
      'order': 10154,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'soccer',
      'name': 'soccer ball',
      'shortcut': 'soccer',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 419,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'basketball',
      'name': 'basketball and hoop',
      'shortcut': 'basketball',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 420,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'football',
      'name': 'american football',
      'shortcut': 'football',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 421,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baseball',
      'name': 'baseball',
      'shortcut': 'baseball',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 422,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tennis',
      'name': 'tennis racquet and ball',
      'shortcut': 'tennis',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 423,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'volleyball',
      'name': 'volleyball',
      'shortcut': 'volleyball',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 424,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rugby_football',
      'name': 'rugby football',
      'shortcut': 'rugby_football',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 425,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': '8ball',
      'name': 'billiards',
      'shortcut': '8ball',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 426,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'golf',
      'name': 'flag in hole',
      'shortcut': 'golf',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 427,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'golfer',
      'name': 'golfer',
      'shortcut': 'golfer',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 428,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 6
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 6
      },
      'hasSkinVariations': true
    },
    {
      'id': 'ping_pong',
      'name': 'table tennis paddle and ball',
      'shortcut': 'ping_pong',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 429,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'badminton',
      'name': 'badminton racquet',
      'shortcut': 'badminton',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 430,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hockey',
      'name': 'ice hockey stick and puck',
      'shortcut': 'hockey',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 431,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'field_hockey',
      'name': 'field hockey stick and ball',
      'shortcut': 'field_hockey',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 432,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cricket',
      'name': 'cricket bat and ball',
      'shortcut': 'cricket',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 433,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ski',
      'name': 'ski and ski boot',
      'shortcut': 'ski',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 434,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'skier',
      'name': 'skier',
      'shortcut': 'skier',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 435,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'snowboarder',
      'name': 'snowboarder',
      'shortcut': 'snowboarder',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 436,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 5
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 5
      },
      'hasSkinVariations': true
    },
    {
      'id': 'ice_skate',
      'name': 'ice skate',
      'shortcut': 'ice_skate',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 437,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bow_and_arrow',
      'name': 'bow and arrow',
      'shortcut': 'bow_and_arrow',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 438,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fishing_pole_and_fish',
      'name': 'fishing pole and fish',
      'shortcut': 'fishing_pole_and_fish',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 439,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rowboat',
      'name': 'rowboat',
      'shortcut': 'rowboat',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 440,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 936,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 13,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1080,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 15,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 10
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 10
      },
      'hasSkinVariations': true
    },
    {
      'id': 'swimmer',
      'name': 'swimmer',
      'shortcut': 'swimmer',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 441,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1224,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 17,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1656,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 23,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 6
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 6
      },
      'hasSkinVariations': true
    },
    {
      'id': 'surfer',
      'name': 'surfer',
      'shortcut': 'surfer',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 442,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 360,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 5
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 216,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 3,
          'yIndex': 6
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 6
      },
      'hasSkinVariations': true
    },
    {
      'id': 'bath',
      'name': 'bath',
      'shortcut': 'bath',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 443,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1800,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 25,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1872,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 26,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2016,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 28,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 11
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 11
      },
      'hasSkinVariations': true
    },
    {
      'id': 'basketball_player',
      'name': 'person with ball',
      'shortcut': 'basketball_player',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 444,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 2664,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 37
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3024,
          'y': 2664,
          'height': 72,
          'width': 72,
          'xIndex': 42,
          'yIndex': 37
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3168,
          'y': 2664,
          'height': 72,
          'width': 72,
          'xIndex': 44,
          'yIndex': 37
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3312,
          'y': 2664,
          'height': 72,
          'width': 72,
          'xIndex': 46,
          'yIndex': 37
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3456,
          'y': 2664,
          'height': 72,
          'width': 72,
          'xIndex': 48,
          'yIndex': 37
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 37
      },
      'hasSkinVariations': true
    },
    {
      'id': 'lifter',
      'name': 'weight lifter',
      'shortcut': 'lifter',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 445,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 6
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 6
      },
      'hasSkinVariations': true
    },
    {
      'id': 'bicyclist',
      'name': 'bicyclist',
      'shortcut': 'bicyclist',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 446,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2808,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 39,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 10
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 10
      },
      'hasSkinVariations': true
    },
    {
      'id': 'mountain_bicyclist',
      'name': 'mountain bicyclist',
      'shortcut': 'mountain_bicyclist',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 447,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3816,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 53,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3960,
          'y': 720,
          'height': 72,
          'width': 72,
          'xIndex': 55,
          'yIndex': 10
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 72,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 1,
          'yIndex': 11
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 11
      },
      'hasSkinVariations': true
    },
    {
      'id': 'horse_racing',
      'name': 'horse racing',
      'shortcut': 'horse_racing',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 448,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 576,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 8,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 648,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 9,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 720,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 10,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 792,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 11,
          'yIndex': 6
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 864,
          'y': 432,
          'height': 72,
          'width': 72,
          'xIndex': 12,
          'yIndex': 6
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 6
      },
      'hasSkinVariations': true
    },
    {
      'id': 'levitate',
      'name': 'man in business suit levitating',
      'shortcut': 'levitate',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 449,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1368,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 19,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1512,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 21,
          'yIndex': 31
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 2232,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 31
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 31
      },
      'hasSkinVariations': true
    },
    {
      'id': 'trophy',
      'name': 'trophy',
      'shortcut': 'trophy',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 450,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'running_shirt_with_sash',
      'name': 'running shirt with sash',
      'shortcut': 'running_shirt_with_sash',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 451,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'medal',
      'name': 'sports medal',
      'shortcut': 'medal',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 452,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 432,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 6
      },
      'hasSkinVariations': false
    },
    {
      'id': 'military_medal',
      'name': 'military medal',
      'shortcut': 'military_medal',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 453,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'reminder_ribbon',
      'name': 'reminder ribbon',
      'shortcut': 'reminder_ribbon',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 454,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rosette',
      'name': 'rosette',
      'shortcut': 'rosette',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 455,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ticket',
      'name': 'ticket',
      'shortcut': 'ticket',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 456,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tickets',
      'name': 'admission tickets',
      'shortcut': 'tickets',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 457,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'performing_arts',
      'name': 'performing arts',
      'shortcut': 'performing_arts',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 458,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'art',
      'name': 'artist palette',
      'shortcut': 'art',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 459,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'circus_tent',
      'name': 'circus tent',
      'shortcut': 'circus_tent',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 460,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'microphone',
      'name': 'microphone',
      'shortcut': 'microphone',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 461,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'headphones',
      'name': 'headphone',
      'shortcut': 'headphones',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 462,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'musical_score',
      'name': 'musical score',
      'shortcut': 'musical_score',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 463,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'musical_keyboard',
      'name': 'musical keyboard',
      'shortcut': 'musical_keyboard',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 464,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'saxophone',
      'name': 'saxophone',
      'shortcut': 'saxophone',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 465,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'trumpet',
      'name': 'trumpet',
      'shortcut': 'trumpet',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 466,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'guitar',
      'name': 'guitar',
      'shortcut': 'guitar',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 467,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'violin',
      'name': 'violin',
      'shortcut': 'violin',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 468,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clapper',
      'name': 'clapper board',
      'shortcut': 'clapper',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 469,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'video_game',
      'name': 'video game',
      'shortcut': 'video_game',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 470,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'space_invader',
      'name': 'alien monster',
      'shortcut': 'space_invader',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 471,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1008,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dart',
      'name': 'direct hit',
      'shortcut': 'dart',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 472,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'game_die',
      'name': 'game die',
      'shortcut': 'game_die',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 473,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'slot_machine',
      'name': 'slot machine',
      'shortcut': 'slot_machine',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 474,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bowling',
      'name': 'bowling',
      'shortcut': 'bowling',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 475,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cartwheel',
      'name': 'person doing cartwheel',
      'shortcut': 'cartwheel',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10155,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2160,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 30,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2304,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 32,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2448,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 34,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2592,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 36,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'juggling',
      'name': 'juggling',
      'shortcut': 'juggling',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10156,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3096,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 43,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3240,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 45,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3384,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 47,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3528,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 49,
          'yIndex': 35
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 3672,
          'y': 2520,
          'height': 72,
          'width': 72,
          'xIndex': 51,
          'yIndex': 35
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 35
      },
      'hasSkinVariations': true
    },
    {
      'id': 'wrestlers',
      'name': 'wrestlers',
      'shortcut': 'wrestlers',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10157,
      'skinVariations': [
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f93c-1f3fb.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f93c-1f3fc.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f93c-1f3fd.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f93c-1f3fe.png',
          'height': 22,
          'width': 22
        },
        {
          'imagePath': 'https://twemoji.maxcdn.com/2/72x72/1f93c-1f3ff.png',
          'height': 22,
          'width': 22
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'boxing_glove',
      'name': 'boxing glove',
      'shortcut': 'boxing_glove',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10158,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'martial_arts_uniform',
      'name': 'martial arts uniform',
      'shortcut': 'martial_arts_uniform',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10159,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'water_polo',
      'name': 'water polo',
      'shortcut': 'water_polo',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10160,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1152,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 16,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1296,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 18,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1440,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 20,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1584,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 22,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1728,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 24,
          'yIndex': 18
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'handball',
      'name': 'handball',
      'shortcut': 'handball',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10161,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 1944,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 27,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2088,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 29,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2232,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 31,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2376,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 33,
          'yIndex': 18
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2520,
          'y': 1296,
          'height': 72,
          'width': 72,
          'xIndex': 35,
          'yIndex': 18
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 18
      },
      'hasSkinVariations': true
    },
    {
      'id': 'goal',
      'name': 'goal net',
      'shortcut': 'goal',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10162,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fencer',
      'name': 'fencer',
      'shortcut': 'fencer',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10163,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'first_place',
      'name': 'first place medal',
      'shortcut': 'first_place',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10164,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'second_place',
      'name': 'second place medal',
      'shortcut': 'second_place',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10165,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'third_place',
      'name': 'third place medal',
      'shortcut': 'third_place',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10166,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'drum',
      'name': 'drum with drumsticks',
      'shortcut': 'drum',
      'type': 'STANDARD',
      'category': 'ACTIVITY',
      'order': 10167,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2520,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 35
      },
      'hasSkinVariations': false
    },
    {
      'id': 'watch',
      'name': 'watch',
      'shortcut': 'watch',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 591,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'iphone',
      'name': 'mobile phone',
      'shortcut': 'iphone',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 592,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'calling',
      'name': 'mobile phone with rightwards arrow at left',
      'shortcut': 'calling',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 593,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'computer',
      'name': 'personal computer',
      'shortcut': 'computer',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 594,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'keyboard',
      'name': 'keyboard',
      'shortcut': 'keyboard',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 595,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'desktop',
      'name': 'desktop computer',
      'shortcut': 'desktop',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 596,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'printer',
      'name': 'printer',
      'shortcut': 'printer',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 597,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mouse_three_button',
      'name': 'three button mouse',
      'shortcut': 'mouse_three_button',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 598,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'trackball',
      'name': 'trackball',
      'shortcut': 'trackball',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 599,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'joystick',
      'name': 'joystick',
      'shortcut': 'joystick',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 600,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'compression',
      'name': 'compression',
      'shortcut': 'compression',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 601,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'minidisc',
      'name': 'minidisc',
      'shortcut': 'minidisc',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 602,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'floppy_disk',
      'name': 'floppy disk',
      'shortcut': 'floppy_disk',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 603,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cd',
      'name': 'optical disc',
      'shortcut': 'cd',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 604,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dvd',
      'name': 'dvd',
      'shortcut': 'dvd',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 605,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'vhs',
      'name': 'videocassette',
      'shortcut': 'vhs',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 606,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'camera',
      'name': 'camera',
      'shortcut': 'camera',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 607,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'camera_with_flash',
      'name': 'camera with flash',
      'shortcut': 'camera_with_flash',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 608,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'video_camera',
      'name': 'video camera',
      'shortcut': 'video_camera',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 609,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'movie_camera',
      'name': 'movie camera',
      'shortcut': 'movie_camera',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 610,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'projector',
      'name': 'film projector',
      'shortcut': 'projector',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 611,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'film_frames',
      'name': 'film frames',
      'shortcut': 'film_frames',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 612,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'telephone_receiver',
      'name': 'telephone receiver',
      'shortcut': 'telephone_receiver',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 613,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'telephone',
      'name': 'black telephone',
      'shortcut': 'telephone',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 614,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pager',
      'name': 'pager',
      'shortcut': 'pager',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 615,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fax',
      'name': 'fax machine',
      'shortcut': 'fax',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 616,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tv',
      'name': 'television',
      'shortcut': 'tv',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 617,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'radio',
      'name': 'radio',
      'shortcut': 'radio',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 618,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'microphone2',
      'name': 'studio microphone',
      'shortcut': 'microphone2',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 619,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'level_slider',
      'name': 'level slider',
      'shortcut': 'level_slider',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 620,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'control_knobs',
      'name': 'control knobs',
      'shortcut': 'control_knobs',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 621,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stopwatch',
      'name': 'stopwatch',
      'shortcut': 'stopwatch',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 622,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'timer',
      'name': 'timer clock',
      'shortcut': 'timer',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 623,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'alarm_clock',
      'name': 'alarm clock',
      'shortcut': 'alarm_clock',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 624,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock',
      'name': 'mantlepiece clock',
      'shortcut': 'clock',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 625,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hourglass_flowing_sand',
      'name': 'hourglass with flowing sand',
      'shortcut': 'hourglass_flowing_sand',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 626,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hourglass',
      'name': 'hourglass',
      'shortcut': 'hourglass',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 627,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'satellite',
      'name': 'satellite antenna',
      'shortcut': 'satellite',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 628,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'battery',
      'name': 'battery',
      'shortcut': 'battery',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 629,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'electric_plug',
      'name': 'electric plug',
      'shortcut': 'electric_plug',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 630,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bulb',
      'name': 'electric light bulb',
      'shortcut': 'bulb',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 631,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flashlight',
      'name': 'electric torch',
      'shortcut': 'flashlight',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 632,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'candle',
      'name': 'candle',
      'shortcut': 'candle',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 633,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wastebasket',
      'name': 'wastebasket',
      'shortcut': 'wastebasket',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 634,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'oil',
      'name': 'oil drum',
      'shortcut': 'oil',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 635,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'money_with_wings',
      'name': 'money with wings',
      'shortcut': 'money_with_wings',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 636,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dollar',
      'name': 'banknote with dollar sign',
      'shortcut': 'dollar',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 637,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'yen',
      'name': 'banknote with yen sign',
      'shortcut': 'yen',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 638,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'euro',
      'name': 'banknote with euro sign',
      'shortcut': 'euro',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 639,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pound',
      'name': 'banknote with pound sign',
      'shortcut': 'pound',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 640,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'moneybag',
      'name': 'money bag',
      'shortcut': 'moneybag',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 641,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'credit_card',
      'name': 'credit card',
      'shortcut': 'credit_card',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 642,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gem',
      'name': 'gem stone',
      'shortcut': 'gem',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 643,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scales',
      'name': 'scales',
      'shortcut': 'scales',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 644,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wrench',
      'name': 'wrench',
      'shortcut': 'wrench',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 645,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hammer',
      'name': 'hammer',
      'shortcut': 'hammer',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 646,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hammer_pick',
      'name': 'hammer and pick',
      'shortcut': 'hammer_pick',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 647,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tools',
      'name': 'hammer and wrench',
      'shortcut': 'tools',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 648,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pick',
      'name': 'pick',
      'shortcut': 'pick',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 649,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'nut_and_bolt',
      'name': 'nut and bolt',
      'shortcut': 'nut_and_bolt',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 650,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gear',
      'name': 'gear',
      'shortcut': 'gear',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 651,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chains',
      'name': 'chains',
      'shortcut': 'chains',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 652,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gun',
      'name': 'pistol',
      'shortcut': 'gun',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 653,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bomb',
      'name': 'bomb',
      'shortcut': 'bomb',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 654,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'knife',
      'name': 'hocho',
      'shortcut': 'knife',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 655,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dagger',
      'name': 'dagger knife',
      'shortcut': 'dagger',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 656,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crossed_swords',
      'name': 'crossed swords',
      'shortcut': 'crossed_swords',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 657,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shield',
      'name': 'shield',
      'shortcut': 'shield',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 658,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'smoking',
      'name': 'smoking symbol',
      'shortcut': 'smoking',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 659,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'skull_crossbones',
      'name': 'skull and crossbones',
      'shortcut': 'skull_crossbones',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 660,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'coffin',
      'name': 'coffin',
      'shortcut': 'coffin',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 661,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'urn',
      'name': 'funeral urn',
      'shortcut': 'urn',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 662,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'amphora',
      'name': 'amphora',
      'shortcut': 'amphora',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 663,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crystal_ball',
      'name': 'crystal ball',
      'shortcut': 'crystal_ball',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 664,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'prayer_beads',
      'name': 'prayer beads',
      'shortcut': 'prayer_beads',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 665,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'barber',
      'name': 'barber pole',
      'shortcut': 'barber',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 666,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'alembic',
      'name': 'alembic',
      'shortcut': 'alembic',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 667,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'telescope',
      'name': 'telescope',
      'shortcut': 'telescope',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 668,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'microscope',
      'name': 'microscope',
      'shortcut': 'microscope',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 669,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hole',
      'name': 'hole',
      'shortcut': 'hole',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 670,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pill',
      'name': 'pill',
      'shortcut': 'pill',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 671,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'syringe',
      'name': 'syringe',
      'shortcut': 'syringe',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 672,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'thermometer',
      'name': 'thermometer',
      'shortcut': 'thermometer',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 673,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'label',
      'name': 'label',
      'shortcut': 'label',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 674,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bookmark',
      'name': 'bookmark',
      'shortcut': 'bookmark',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 675,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'toilet',
      'name': 'toilet',
      'shortcut': 'toilet',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 676,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shower',
      'name': 'shower',
      'shortcut': 'shower',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 677,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bathtub',
      'name': 'bathtub',
      'shortcut': 'bathtub',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 678,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'key',
      'name': 'key',
      'shortcut': 'key',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 679,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'key2',
      'name': 'old key',
      'shortcut': 'key2',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 680,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'couch',
      'name': 'couch and lamp',
      'shortcut': 'couch',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 681,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sleeping_accommodation',
      'name': 'sleeping accommodation',
      'shortcut': 'sleeping_accommodation',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 682,
      'skinVariations': [
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2664,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 37,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2736,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 38,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2808,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 39,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2880,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 40,
          'yIndex': 11
        },
        {
          'spriteRef': 'twemoji-crushed.png',
          'x': 2952,
          'y': 792,
          'height': 72,
          'width': 72,
          'xIndex': 41,
          'yIndex': 11
        }
      ],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 11
      },
      'hasSkinVariations': true
    },
    {
      'id': 'bed',
      'name': 'bed',
      'shortcut': 'bed',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 683,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'door',
      'name': 'door',
      'shortcut': 'door',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 684,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bellhop',
      'name': 'bellhop bell',
      'shortcut': 'bellhop',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 685,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'frame_photo',
      'name': 'frame with picture',
      'shortcut': 'frame_photo',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 686,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'map',
      'name': 'world map',
      'shortcut': 'map',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 687,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beach_umbrella',
      'name': 'umbrella on ground',
      'shortcut': 'beach_umbrella',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 688,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'moyai',
      'name': 'moyai',
      'shortcut': 'moyai',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 689,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shopping_bags',
      'name': 'shopping bags',
      'shortcut': 'shopping_bags',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 690,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'balloon',
      'name': 'balloon',
      'shortcut': 'balloon',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 691,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flags',
      'name': 'carp streamer',
      'shortcut': 'flags',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 692,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ribbon',
      'name': 'ribbon',
      'shortcut': 'ribbon',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 693,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gift',
      'name': 'wrapped present',
      'shortcut': 'gift',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 694,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'confetti_ball',
      'name': 'confetti ball',
      'shortcut': 'confetti_ball',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 695,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tada',
      'name': 'party popper',
      'shortcut': 'tada',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 696,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1440,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dolls',
      'name': 'japanese dolls',
      'shortcut': 'dolls',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 697,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wind_chime',
      'name': 'wind chime',
      'shortcut': 'wind_chime',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 698,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crossed_flags',
      'name': 'crossed flags',
      'shortcut': 'crossed_flags',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 699,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 936,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': 'izakaya_lantern',
      'name': 'izakaya lantern',
      'shortcut': 'izakaya_lantern',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 700,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'envelope',
      'name': 'envelope',
      'shortcut': 'envelope',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 701,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'envelope_with_arrow',
      'name': 'envelope with downwards arrow above',
      'shortcut': 'envelope_with_arrow',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 702,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'incoming_envelope',
      'name': 'incoming envelope',
      'shortcut': 'incoming_envelope',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 703,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'e-mail',
      'name': 'e-mail symbol',
      'shortcut': 'e-mail',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 704,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'love_letter',
      'name': 'love letter',
      'shortcut': 'love_letter',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 705,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'postbox',
      'name': 'postbox',
      'shortcut': 'postbox',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 706,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mailbox_closed',
      'name': 'closed mailbox with lowered flag',
      'shortcut': 'mailbox_closed',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 707,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mailbox',
      'name': 'closed mailbox with raised flag',
      'shortcut': 'mailbox',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 708,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mailbox_with_mail',
      'name': 'open mailbox with raised flag',
      'shortcut': 'mailbox_with_mail',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 709,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mailbox_with_no_mail',
      'name': 'open mailbox with lowered flag',
      'shortcut': 'mailbox_with_no_mail',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 710,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'package',
      'name': 'package',
      'shortcut': 'package',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 711,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'postal_horn',
      'name': 'postal horn',
      'shortcut': 'postal_horn',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 712,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'inbox_tray',
      'name': 'inbox tray',
      'shortcut': 'inbox_tray',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 713,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'outbox_tray',
      'name': 'outbox tray',
      'shortcut': 'outbox_tray',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 714,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scroll',
      'name': 'scroll',
      'shortcut': 'scroll',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 715,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'page_with_curl',
      'name': 'page with curl',
      'shortcut': 'page_with_curl',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 716,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bookmark_tabs',
      'name': 'bookmark tabs',
      'shortcut': 'bookmark_tabs',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 717,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bar_chart',
      'name': 'bar chart',
      'shortcut': 'bar_chart',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 718,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chart_with_upwards_trend',
      'name': 'chart with upwards trend',
      'shortcut': 'chart_with_upwards_trend',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 719,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chart_with_downwards_trend',
      'name': 'chart with downwards trend',
      'shortcut': 'chart_with_downwards_trend',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 720,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'page_facing_up',
      'name': 'page facing up',
      'shortcut': 'page_facing_up',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 721,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'date',
      'name': 'calendar',
      'shortcut': 'date',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 722,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'calendar',
      'name': 'tear-off calendar',
      'shortcut': 'calendar',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 723,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'calendar_spiral',
      'name': 'spiral calendar pad',
      'shortcut': 'calendar_spiral',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 724,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'card_index',
      'name': 'card index',
      'shortcut': 'card_index',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 725,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'card_box',
      'name': 'card file box',
      'shortcut': 'card_box',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 726,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ballot_box',
      'name': 'ballot box with ballot',
      'shortcut': 'ballot_box',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 727,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'file_cabinet',
      'name': 'file cabinet',
      'shortcut': 'file_cabinet',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 728,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clipboard',
      'name': 'clipboard',
      'shortcut': 'clipboard',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 729,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'notepad_spiral',
      'name': 'spiral note pad',
      'shortcut': 'notepad_spiral',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 730,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'file_folder',
      'name': 'file folder',
      'shortcut': 'file_folder',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 731,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'open_file_folder',
      'name': 'open file folder',
      'shortcut': 'open_file_folder',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 732,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'dividers',
      'name': 'card index dividers',
      'shortcut': 'dividers',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 733,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'newspaper2',
      'name': 'rolled-up newspaper',
      'shortcut': 'newspaper2',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 734,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'newspaper',
      'name': 'newspaper',
      'shortcut': 'newspaper',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 735,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'notebook',
      'name': 'notebook',
      'shortcut': 'notebook',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 736,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'closed_book',
      'name': 'closed book',
      'shortcut': 'closed_book',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 737,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'green_book',
      'name': 'green book',
      'shortcut': 'green_book',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 738,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blue_book',
      'name': 'blue book',
      'shortcut': 'blue_book',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 739,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'orange_book',
      'name': 'orange book',
      'shortcut': 'orange_book',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 740,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'notebook_with_decorative_cover',
      'name': 'notebook with decorative cover',
      'shortcut': 'notebook_with_decorative_cover',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 741,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ledger',
      'name': 'ledger',
      'shortcut': 'ledger',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 742,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'books',
      'name': 'books',
      'shortcut': 'books',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 743,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'book',
      'name': 'open book',
      'shortcut': 'book',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 744,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'link',
      'name': 'link symbol',
      'shortcut': 'link',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 745,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'paperclip',
      'name': 'paperclip',
      'shortcut': 'paperclip',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 746,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'paperclips',
      'name': 'linked paperclips',
      'shortcut': 'paperclips',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 747,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scissors',
      'name': 'black scissors',
      'shortcut': 'scissors',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 748,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'triangular_ruler',
      'name': 'triangular ruler',
      'shortcut': 'triangular_ruler',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 749,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'straight_ruler',
      'name': 'straight ruler',
      'shortcut': 'straight_ruler',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 750,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pushpin',
      'name': 'pushpin',
      'shortcut': 'pushpin',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 751,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'round_pushpin',
      'name': 'round pushpin',
      'shortcut': 'round_pushpin',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 752,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'triangular_flag_on_post',
      'name': 'triangular flag on post',
      'shortcut': 'triangular_flag_on_post',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 753,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_white',
      'name': 'waving white flag',
      'shortcut': 'flag_white',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 754,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_black',
      'name': 'waving black flag',
      'shortcut': 'flag_black',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 755,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'closed_lock_with_key',
      'name': 'closed lock with key',
      'shortcut': 'closed_lock_with_key',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 756,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lock',
      'name': 'lock',
      'shortcut': 'lock',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 757,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'unlock',
      'name': 'open lock',
      'shortcut': 'unlock',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 758,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'lock_with_ink_pen',
      'name': 'lock with ink pen',
      'shortcut': 'lock_with_ink_pen',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 759,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pen_ballpoint',
      'name': 'lower left ballpoint pen',
      'shortcut': 'pen_ballpoint',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 760,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pen_fountain',
      'name': 'lower left fountain pen',
      'shortcut': 'pen_fountain',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 761,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_nib',
      'name': 'black nib',
      'shortcut': 'black_nib',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 762,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pencil',
      'name': 'memo',
      'shortcut': 'pencil',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 763,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pencil2',
      'name': 'pencil',
      'shortcut': 'pencil2',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 764,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'crayon',
      'name': 'lower left crayon',
      'shortcut': 'crayon',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 765,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'paintbrush',
      'name': 'lower left paintbrush',
      'shortcut': 'paintbrush',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 766,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mag',
      'name': 'left-pointing magnifying glass',
      'shortcut': 'mag',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 767,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mag_right',
      'name': 'right-pointing magnifying glass',
      'shortcut': 'mag_right',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 768,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'shopping_cart',
      'name': 'shopping trolley',
      'shortcut': 'shopping_cart',
      'type': 'STANDARD',
      'category': 'OBJECTS',
      'order': 10151,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heart',
      'name': 'heavy black heart',
      'shortcut': 'heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 769,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'yellow_heart',
      'name': 'yellow heart',
      'shortcut': 'yellow_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 770,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'green_heart',
      'name': 'green heart',
      'shortcut': 'green_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 771,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'blue_heart',
      'name': 'blue heart',
      'shortcut': 'blue_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 772,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'purple_heart',
      'name': 'purple heart',
      'shortcut': 'purple_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 773,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'broken_heart',
      'name': 'broken heart',
      'shortcut': 'broken_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 774,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heart_exclamation',
      'name': 'heavy heart exclamation mark ornament',
      'shortcut': 'heart_exclamation',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 775,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'two_hearts',
      'name': 'two hearts',
      'shortcut': 'two_hearts',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 776,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'revolving_hearts',
      'name': 'revolving hearts',
      'shortcut': 'revolving_hearts',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 777,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heartbeat',
      'name': 'beating heart',
      'shortcut': 'heartbeat',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 778,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heartpulse',
      'name': 'growing heart',
      'shortcut': 'heartpulse',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 779,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sparkling_heart',
      'name': 'sparkling heart',
      'shortcut': 'sparkling_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 780,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cupid',
      'name': 'heart with arrow',
      'shortcut': 'cupid',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 781,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gift_heart',
      'name': 'heart with ribbon',
      'shortcut': 'gift_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 782,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heart_decoration',
      'name': 'heart decoration',
      'shortcut': 'heart_decoration',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 783,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'peace',
      'name': 'peace symbol',
      'shortcut': 'peace',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 784,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cross',
      'name': 'latin cross',
      'shortcut': 'cross',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 785,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'star_and_crescent',
      'name': 'star and crescent',
      'shortcut': 'star_and_crescent',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 786,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'om_symbol',
      'name': 'om symbol',
      'shortcut': 'om_symbol',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 787,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wheel_of_dharma',
      'name': 'wheel of dharma',
      'shortcut': 'wheel_of_dharma',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 788,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'star_of_david',
      'name': 'star of david',
      'shortcut': 'star_of_david',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 789,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'six_pointed_star',
      'name': 'six pointed star with middle dot',
      'shortcut': 'six_pointed_star',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 790,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'menorah',
      'name': 'menorah with nine branches',
      'shortcut': 'menorah',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 791,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'yin_yang',
      'name': 'yin yang',
      'shortcut': 'yin_yang',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 792,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'orthodox_cross',
      'name': 'orthodox cross',
      'shortcut': 'orthodox_cross',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 793,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'place_of_worship',
      'name': 'place of worship',
      'shortcut': 'place_of_worship',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 794,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ophiuchus',
      'name': 'ophiuchus',
      'shortcut': 'ophiuchus',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 795,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'aries',
      'name': 'aries',
      'shortcut': 'aries',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 796,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'taurus',
      'name': 'taurus',
      'shortcut': 'taurus',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 797,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gemini',
      'name': 'gemini',
      'shortcut': 'gemini',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 798,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cancer',
      'name': 'cancer',
      'shortcut': 'cancer',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 799,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'leo',
      'name': 'leo',
      'shortcut': 'leo',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 800,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'virgo',
      'name': 'virgo',
      'shortcut': 'virgo',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 801,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'libra',
      'name': 'libra',
      'shortcut': 'libra',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 802,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'scorpius',
      'name': 'scorpius',
      'shortcut': 'scorpius',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 803,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sagittarius',
      'name': 'sagittarius',
      'shortcut': 'sagittarius',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 804,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'capricorn',
      'name': 'capricorn',
      'shortcut': 'capricorn',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 805,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'aquarius',
      'name': 'aquarius',
      'shortcut': 'aquarius',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 806,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pisces',
      'name': 'pisces',
      'shortcut': 'pisces',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 807,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'id',
      'name': 'squared id',
      'shortcut': 'id',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 808,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'atom',
      'name': 'atom symbol',
      'shortcut': 'atom',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 809,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u7a7a',
      'name': 'squared cjk unified ideograph-7a7a',
      'shortcut': 'u7a7a',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 810,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u5272',
      'name': 'squared cjk unified ideograph-5272',
      'shortcut': 'u5272',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 811,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'radioactive',
      'name': 'radioactive sign',
      'shortcut': 'radioactive',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 812,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'biohazard',
      'name': 'biohazard sign',
      'shortcut': 'biohazard',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 813,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mobile_phone_off',
      'name': 'mobile phone off',
      'shortcut': 'mobile_phone_off',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 814,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'vibration_mode',
      'name': 'vibration mode',
      'shortcut': 'vibration_mode',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 815,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u6709',
      'name': 'squared cjk unified ideograph-6709',
      'shortcut': 'u6709',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 816,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u7121',
      'name': 'squared cjk unified ideograph-7121',
      'shortcut': 'u7121',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 817,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u7533',
      'name': 'squared cjk unified ideograph-7533',
      'shortcut': 'u7533',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 818,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u55b6',
      'name': 'squared cjk unified ideograph-55b6',
      'shortcut': 'u55b6',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 819,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u6708',
      'name': 'squared cjk unified ideograph-6708',
      'shortcut': 'u6708',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 820,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eight_pointed_black_star',
      'name': 'eight pointed black star',
      'shortcut': 'eight_pointed_black_star',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 821,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'vs',
      'name': 'squared vs',
      'shortcut': 'vs',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 822,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'accept',
      'name': 'circled ideograph accept',
      'shortcut': 'accept',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 823,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_flower',
      'name': 'white flower',
      'shortcut': 'white_flower',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 824,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ideograph_advantage',
      'name': 'circled ideograph advantage',
      'shortcut': 'ideograph_advantage',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 825,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'secret',
      'name': 'circled ideograph secret',
      'shortcut': 'secret',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 826,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'congratulations',
      'name': 'circled ideograph congratulation',
      'shortcut': 'congratulations',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 827,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u5408',
      'name': 'squared cjk unified ideograph-5408',
      'shortcut': 'u5408',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 828,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u6e80',
      'name': 'squared cjk unified ideograph-6e80',
      'shortcut': 'u6e80',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 829,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u7981',
      'name': 'squared cjk unified ideograph-7981',
      'shortcut': 'u7981',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 830,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'a',
      'name': 'negative squared latin capital letter a',
      'shortcut': 'a',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 831,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'b',
      'name': 'negative squared latin capital letter b',
      'shortcut': 'b',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 832,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ab',
      'name': 'negative squared ab',
      'shortcut': 'ab',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 833,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cl',
      'name': 'squared cl',
      'shortcut': 'cl',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 834,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'o2',
      'name': 'negative squared latin capital letter o',
      'shortcut': 'o2',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 835,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sos',
      'name': 'squared sos',
      'shortcut': 'sos',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 836,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_entry',
      'name': 'no entry',
      'shortcut': 'no_entry',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 837,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'name_badge',
      'name': 'name badge',
      'shortcut': 'name_badge',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 838,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_entry_sign',
      'name': 'no entry sign',
      'shortcut': 'no_entry_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 839,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'x',
      'name': 'cross mark',
      'shortcut': 'x',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 840,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'o',
      'name': 'heavy large circle',
      'shortcut': 'o',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 841,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'anger',
      'name': 'anger symbol',
      'shortcut': 'anger',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 842,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hotsprings',
      'name': 'hot springs',
      'shortcut': 'hotsprings',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 843,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_pedestrians',
      'name': 'no pedestrians',
      'shortcut': 'no_pedestrians',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 844,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'do_not_litter',
      'name': 'do not litter symbol',
      'shortcut': 'do_not_litter',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 845,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_bicycles',
      'name': 'no bicycles',
      'shortcut': 'no_bicycles',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 846,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'non-potable_water',
      'name': 'non-potable water symbol',
      'shortcut': 'non-potable_water',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 847,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'underage',
      'name': 'no one under eighteen symbol',
      'shortcut': 'underage',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 848,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_mobile_phones',
      'name': 'no mobile phones',
      'shortcut': 'no_mobile_phones',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 849,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'exclamation',
      'name': 'heavy exclamation mark symbol',
      'shortcut': 'exclamation',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 850,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'grey_exclamation',
      'name': 'white exclamation mark ornament',
      'shortcut': 'grey_exclamation',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 851,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'question',
      'name': 'black question mark ornament',
      'shortcut': 'question',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 852,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'grey_question',
      'name': 'white question mark ornament',
      'shortcut': 'grey_question',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 853,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bangbang',
      'name': 'double exclamation mark',
      'shortcut': 'bangbang',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 854,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'interrobang',
      'name': 'exclamation question mark',
      'shortcut': 'interrobang',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 855,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': '100',
      'name': 'hundred points symbol',
      'shortcut': '100',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 856,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'low_brightness',
      'name': 'low brightness symbol',
      'shortcut': 'low_brightness',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 857,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'high_brightness',
      'name': 'high brightness symbol',
      'shortcut': 'high_brightness',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 858,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'trident',
      'name': 'trident emblem',
      'shortcut': 'trident',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 859,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fleur-de-lis',
      'name': 'fleur-de-lis',
      'shortcut': 'fleur-de-lis',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 860,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'part_alternation_mark',
      'name': 'part alternation mark',
      'shortcut': 'part_alternation_mark',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 861,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'warning',
      'name': 'warning sign',
      'shortcut': 'warning',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 862,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'children_crossing',
      'name': 'children crossing',
      'shortcut': 'children_crossing',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 863,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'beginner',
      'name': 'japanese symbol for beginner',
      'shortcut': 'beginner',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 864,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'recycle',
      'name': 'black universal recycling symbol',
      'shortcut': 'recycle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 865,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'u6307',
      'name': 'squared cjk unified ideograph-6307',
      'shortcut': 'u6307',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 866,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'chart',
      'name': 'chart with upwards trend and yen sign',
      'shortcut': 'chart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 867,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sparkle',
      'name': 'sparkle',
      'shortcut': 'sparkle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 868,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eight_spoked_asterisk',
      'name': 'eight spoked asterisk',
      'shortcut': 'eight_spoked_asterisk',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 869,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'negative_squared_cross_mark',
      'name': 'negative squared cross mark',
      'shortcut': 'negative_squared_cross_mark',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 870,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_check_mark',
      'name': 'white heavy check mark',
      'shortcut': 'white_check_mark',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 871,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'diamond_shape_with_a_dot_inside',
      'name': 'diamond shape with a dot inside',
      'shortcut': 'diamond_shape_with_a_dot_inside',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 872,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cyclone',
      'name': 'cyclone',
      'shortcut': 'cyclone',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 873,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'loop',
      'name': 'double curly loop',
      'shortcut': 'loop',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 874,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'globe_with_meridians',
      'name': 'globe with meridians',
      'shortcut': 'globe_with_meridians',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 875,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'm',
      'name': 'circled latin capital letter m',
      'shortcut': 'm',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 876,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'atm',
      'name': 'automated teller machine',
      'shortcut': 'atm',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 877,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sa',
      'name': 'squared katakana sa',
      'shortcut': 'sa',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 878,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'passport_control',
      'name': 'passport control',
      'shortcut': 'passport_control',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 879,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'customs',
      'name': 'customs',
      'shortcut': 'customs',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 880,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baggage_claim',
      'name': 'baggage claim',
      'shortcut': 'baggage_claim',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 881,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'left_luggage',
      'name': 'left luggage',
      'shortcut': 'left_luggage',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 882,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wheelchair',
      'name': 'wheelchair symbol',
      'shortcut': 'wheelchair',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 883,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2736,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 38
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_smoking',
      'name': 'no smoking symbol',
      'shortcut': 'no_smoking',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 884,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wc',
      'name': 'water closet',
      'shortcut': 'wc',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 885,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'parking',
      'name': 'negative squared latin capital letter p',
      'shortcut': 'parking',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 886,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 864,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 12
      },
      'hasSkinVariations': false
    },
    {
      'id': 'potable_water',
      'name': 'potable water symbol',
      'shortcut': 'potable_water',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 887,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mens',
      'name': 'mens symbol',
      'shortcut': 'mens',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 888,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'womens',
      'name': 'womens symbol',
      'shortcut': 'womens',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 889,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'baby_symbol',
      'name': 'baby symbol',
      'shortcut': 'baby_symbol',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 890,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'restroom',
      'name': 'restroom',
      'shortcut': 'restroom',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 891,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'put_litter_in_its_place',
      'name': 'put litter in its place symbol',
      'shortcut': 'put_litter_in_its_place',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 892,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 720,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 10
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cinema',
      'name': 'cinema',
      'shortcut': 'cinema',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 893,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'signal_strength',
      'name': 'antenna with bars',
      'shortcut': 'signal_strength',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 894,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'koko',
      'name': 'squared katakana koko',
      'shortcut': 'koko',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 895,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ng',
      'name': 'squared ng',
      'shortcut': 'ng',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 896,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ok',
      'name': 'squared ok',
      'shortcut': 'ok',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 897,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'up',
      'name': 'squared up with exclamation mark',
      'shortcut': 'up',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 898,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'cool',
      'name': 'squared cool',
      'shortcut': 'cool',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 899,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 1296,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': 'new',
      'name': 'squared new',
      'shortcut': 'new',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 900,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'free',
      'name': 'squared free',
      'shortcut': 'free',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 901,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 1368,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': 'zero',
      'name': 'keycap digit zero',
      'shortcut': 'zero',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 902,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0030-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'one',
      'name': 'keycap digit one',
      'shortcut': 'one',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 903,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0031-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'two',
      'name': 'keycap digit two',
      'shortcut': 'two',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 904,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0032-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'three',
      'name': 'keycap digit three',
      'shortcut': 'three',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 905,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0033-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'four',
      'name': 'keycap digit four',
      'shortcut': 'four',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 906,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0034-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'five',
      'name': 'keycap digit five',
      'shortcut': 'five',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 907,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0035-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'six',
      'name': 'keycap digit six',
      'shortcut': 'six',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 908,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0036-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'seven',
      'name': 'keycap digit seven',
      'shortcut': 'seven',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 909,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0037-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eight',
      'name': 'keycap digit eight',
      'shortcut': 'eight',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 910,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0038-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'nine',
      'name': 'keycap digit nine',
      'shortcut': 'nine',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 911,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0039-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'keycap_ten',
      'name': 'keycap ten',
      'shortcut': 'keycap_ten',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 912,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': '1234',
      'name': 'input symbol for numbers',
      'shortcut': '1234',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 913,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_forward',
      'name': 'black right-pointing triangle',
      'shortcut': 'arrow_forward',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 914,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'pause_button',
      'name': 'double vertical bar',
      'shortcut': 'pause_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 915,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'play_pause',
      'name': 'black right-pointing double triangle with double vertical bar',
      'shortcut': 'play_pause',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 916,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'stop_button',
      'name': 'black square for stop',
      'shortcut': 'stop_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 917,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'record_button',
      'name': 'black circle for record',
      'shortcut': 'record_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 918,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'track_next',
      'name': 'black right-pointing double triangle with vertical bar',
      'shortcut': 'track_next',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 919,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'track_previous',
      'name': 'black left-pointing double triangle with vertical bar',
      'shortcut': 'track_previous',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 920,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'fast_forward',
      'name': 'black right-pointing double triangle',
      'shortcut': 'fast_forward',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 921,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'rewind',
      'name': 'black left-pointing double triangle',
      'shortcut': 'rewind',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 922,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'twisted_rightwards_arrows',
      'name': 'twisted rightwards arrows',
      'shortcut': 'twisted_rightwards_arrows',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 923,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'repeat',
      'name': 'clockwise rightwards and leftwards open circle arrows',
      'shortcut': 'repeat',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 924,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'repeat_one',
      'name': 'clockwise rightwards and leftwards open circle arrows with circled one overlay',
      'shortcut': 'repeat_one',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 925,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_backward',
      'name': 'black left-pointing triangle',
      'shortcut': 'arrow_backward',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 926,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_up_small',
      'name': 'up-pointing small red triangle',
      'shortcut': 'arrow_up_small',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 927,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_down_small',
      'name': 'down-pointing small red triangle',
      'shortcut': 'arrow_down_small',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 928,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_double_up',
      'name': 'black up-pointing double triangle',
      'shortcut': 'arrow_double_up',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 929,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_double_down',
      'name': 'black down-pointing double triangle',
      'shortcut': 'arrow_double_down',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 930,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_right',
      'name': 'black rightwards arrow',
      'shortcut': 'arrow_right',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 931,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_left',
      'name': 'leftwards black arrow',
      'shortcut': 'arrow_left',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 932,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_up',
      'name': 'upwards black arrow',
      'shortcut': 'arrow_up',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 933,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_down',
      'name': 'downwards black arrow',
      'shortcut': 'arrow_down',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 934,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_upper_right',
      'name': 'north east arrow',
      'shortcut': 'arrow_upper_right',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 935,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_lower_right',
      'name': 'south east arrow',
      'shortcut': 'arrow_lower_right',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 936,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_lower_left',
      'name': 'south west arrow',
      'shortcut': 'arrow_lower_left',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 937,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_upper_left',
      'name': 'north west arrow',
      'shortcut': 'arrow_upper_left',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 938,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_up_down',
      'name': 'up down arrow',
      'shortcut': 'arrow_up_down',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 939,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'left_right_arrow',
      'name': 'left right arrow',
      'shortcut': 'left_right_arrow',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 940,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrows_counterclockwise',
      'name': 'anticlockwise downwards and upwards open circle arrows',
      'shortcut': 'arrows_counterclockwise',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 941,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_right_hook',
      'name': 'rightwards arrow with hook',
      'shortcut': 'arrow_right_hook',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 942,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'leftwards_arrow_with_hook',
      'name': 'leftwards arrow with hook',
      'shortcut': 'leftwards_arrow_with_hook',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 943,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_heading_up',
      'name': 'arrow pointing rightwards then curving upwards',
      'shortcut': 'arrow_heading_up',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 944,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrow_heading_down',
      'name': 'arrow pointing rightwards then curving downwards',
      'shortcut': 'arrow_heading_down',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 945,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hash',
      'name': 'keycap number sign',
      'shortcut': 'hash',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 946,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/0023-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'asterisk',
      'name': 'keycap asterisk',
      'shortcut': 'asterisk',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 947,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/002a-fe0f-20e3.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'information_source',
      'name': 'information source',
      'shortcut': 'information_source',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 948,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'abc',
      'name': 'input symbol for latin letters',
      'shortcut': 'abc',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 949,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'abcd',
      'name': 'input symbol for latin small letters',
      'shortcut': 'abcd',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 950,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'capital_abcd',
      'name': 'input symbol for latin capital letters',
      'shortcut': 'capital_abcd',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 951,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'symbols',
      'name': 'input symbol for symbols',
      'shortcut': 'symbols',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 952,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'musical_note',
      'name': 'musical note',
      'shortcut': 'musical_note',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 953,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'notes',
      'name': 'multiple musical notes',
      'shortcut': 'notes',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 954,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'wavy_dash',
      'name': 'wavy dash',
      'shortcut': 'wavy_dash',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 955,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'curly_loop',
      'name': 'curly loop',
      'shortcut': 'curly_loop',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 956,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_check_mark',
      'name': 'heavy check mark',
      'shortcut': 'heavy_check_mark',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 957,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'arrows_clockwise',
      'name': 'clockwise downwards and upwards open circle arrows',
      'shortcut': 'arrows_clockwise',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 958,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_plus_sign',
      'name': 'heavy plus sign',
      'shortcut': 'heavy_plus_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 959,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_minus_sign',
      'name': 'heavy minus sign',
      'shortcut': 'heavy_minus_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 960,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_division_sign',
      'name': 'heavy division sign',
      'shortcut': 'heavy_division_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 961,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_multiplication_x',
      'name': 'heavy multiplication x',
      'shortcut': 'heavy_multiplication_x',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 962,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2880,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 40
      },
      'hasSkinVariations': false
    },
    {
      'id': 'heavy_dollar_sign',
      'name': 'heavy dollar sign',
      'shortcut': 'heavy_dollar_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 963,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'currency_exchange',
      'name': 'currency exchange',
      'shortcut': 'currency_exchange',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 964,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'copyright',
      'name': 'copyright sign',
      'shortcut': 'copyright',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 965,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/00a9-fe0f.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'registered',
      'name': 'registered sign',
      'shortcut': 'registered',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 966,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/00ae-fe0f.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'tm',
      'name': 'trade mark sign',
      'shortcut': 'tm',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 967,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'end',
      'name': 'end with leftwards arrow above',
      'shortcut': 'end',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 968,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'back',
      'name': 'back with leftwards arrow above',
      'shortcut': 'back',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 969,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'on',
      'name': 'on with exclamation mark with left right arrow abo',
      'shortcut': 'on',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 970,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'top',
      'name': 'top with upwards arrow above',
      'shortcut': 'top',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 971,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'soon',
      'name': 'soon with rightwards arrow above',
      'shortcut': 'soon',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 972,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'ballot_box_with_check',
      'name': 'ballot box with check',
      'shortcut': 'ballot_box_with_check',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 973,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'radio_button',
      'name': 'radio button',
      'shortcut': 'radio_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 974,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_circle',
      'name': 'medium white circle',
      'shortcut': 'white_circle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 975,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_circle',
      'name': 'medium black circle',
      'shortcut': 'black_circle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 976,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'red_circle',
      'name': 'large red circle',
      'shortcut': 'red_circle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 977,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'large_blue_circle',
      'name': 'large blue circle',
      'shortcut': 'large_blue_circle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 978,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'small_orange_diamond',
      'name': 'small orange diamond',
      'shortcut': 'small_orange_diamond',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 979,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'small_blue_diamond',
      'name': 'small blue diamond',
      'shortcut': 'small_blue_diamond',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 980,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'large_orange_diamond',
      'name': 'large orange diamond',
      'shortcut': 'large_orange_diamond',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 981,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'large_blue_diamond',
      'name': 'large blue diamond',
      'shortcut': 'large_blue_diamond',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 982,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'small_red_triangle',
      'name': 'up-pointing red triangle',
      'shortcut': 'small_red_triangle',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 983,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_small_square',
      'name': 'black small square',
      'shortcut': 'black_small_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 984,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_small_square',
      'name': 'white small square',
      'shortcut': 'white_small_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 985,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_large_square',
      'name': 'black large square',
      'shortcut': 'black_large_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 986,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_large_square',
      'name': 'white large square',
      'shortcut': 'white_large_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 987,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'small_red_triangle_down',
      'name': 'down-pointing red triangle',
      'shortcut': 'small_red_triangle_down',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 988,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_medium_square',
      'name': 'black medium square',
      'shortcut': 'black_medium_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 989,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_medium_square',
      'name': 'white medium square',
      'shortcut': 'white_medium_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 990,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_medium_small_square',
      'name': 'black medium small square',
      'shortcut': 'black_medium_small_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 991,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_medium_small_square',
      'name': 'white medium small square',
      'shortcut': 'white_medium_small_square',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 992,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2664,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_square_button',
      'name': 'black square button',
      'shortcut': 'black_square_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 993,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'white_square_button',
      'name': 'white square button',
      'shortcut': 'white_square_button',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 994,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speaker',
      'name': 'speaker',
      'shortcut': 'speaker',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 995,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'sound',
      'name': 'speaker with one sound wave',
      'shortcut': 'sound',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 996,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'loud_sound',
      'name': 'speaker with three sound waves',
      'shortcut': 'loud_sound',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 997,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mute',
      'name': 'speaker with cancellation stroke',
      'shortcut': 'mute',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 998,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mega',
      'name': 'cheering megaphone',
      'shortcut': 'mega',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 999,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'loudspeaker',
      'name': 'public address loudspeaker',
      'shortcut': 'loudspeaker',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1000,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'bell',
      'name': 'bell',
      'shortcut': 'bell',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1001,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'no_bell',
      'name': 'bell with cancellation stroke',
      'shortcut': 'no_bell',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1002,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_joker',
      'name': 'playing card black joker',
      'shortcut': 'black_joker',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1003,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'mahjong',
      'name': 'mahjong tile red dragon',
      'shortcut': 'mahjong',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1004,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 504,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 7
      },
      'hasSkinVariations': false
    },
    {
      'id': 'spades',
      'name': 'black spade suit',
      'shortcut': 'spades',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1005,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clubs',
      'name': 'black club suit',
      'shortcut': 'clubs',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1006,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'hearts',
      'name': 'black heart suit',
      'shortcut': 'hearts',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1007,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'diamonds',
      'name': 'black diamond suit',
      'shortcut': 'diamonds',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1008,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 2808,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 39
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flower_playing_cards',
      'name': 'flower playing cards',
      'shortcut': 'flower_playing_cards',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1009,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 360,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 5
      },
      'hasSkinVariations': false
    },
    {
      'id': 'thought_balloon',
      'name': 'thought balloon',
      'shortcut': 'thought_balloon',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1010,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'anger_right',
      'name': 'right anger bubble',
      'shortcut': 'anger_right',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1011,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speech_balloon',
      'name': 'speech balloon',
      'shortcut': 'speech_balloon',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1012,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 576,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 8
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock1',
      'name': 'clock face one oclock',
      'shortcut': 'clock1',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1013,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock2',
      'name': 'clock face two oclock',
      'shortcut': 'clock2',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1014,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 2160,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock3',
      'name': 'clock face three oclock',
      'shortcut': 'clock3',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1015,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock4',
      'name': 'clock face four oclock',
      'shortcut': 'clock4',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1016,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock5',
      'name': 'clock face five oclock',
      'shortcut': 'clock5',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1017,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock6',
      'name': 'clock face six oclock',
      'shortcut': 'clock6',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1018,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock7',
      'name': 'clock face seven oclock',
      'shortcut': 'clock7',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1019,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock8',
      'name': 'clock face eight oclock',
      'shortcut': 'clock8',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1020,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock9',
      'name': 'clock face nine oclock',
      'shortcut': 'clock9',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1021,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock10',
      'name': 'clock face ten oclock',
      'shortcut': 'clock10',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1022,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock11',
      'name': 'clock face eleven oclock',
      'shortcut': 'clock11',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1023,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock12',
      'name': 'clock face twelve oclock',
      'shortcut': 'clock12',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1024,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock130',
      'name': 'clock face one-thirty',
      'shortcut': 'clock130',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1025,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock230',
      'name': 'clock face two-thirty',
      'shortcut': 'clock230',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1026,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock330',
      'name': 'clock face three-thirty',
      'shortcut': 'clock330',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1027,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock430',
      'name': 'clock face four-thirty',
      'shortcut': 'clock430',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1028,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 1080,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 15
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock530',
      'name': 'clock face five-thirty',
      'shortcut': 'clock530',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1029,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock630',
      'name': 'clock face six-thirty',
      'shortcut': 'clock630',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1030,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock730',
      'name': 'clock face seven-thirty',
      'shortcut': 'clock730',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1031,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock830',
      'name': 'clock face eight-thirty',
      'shortcut': 'clock830',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1032,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock930',
      'name': 'clock face nine-thirty',
      'shortcut': 'clock930',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1033,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock1030',
      'name': 'clock face ten-thirty',
      'shortcut': 'clock1030',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1034,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock1130',
      'name': 'clock face eleven-thirty',
      'shortcut': 'clock1130',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1035,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'clock1230',
      'name': 'clock face twelve-thirty',
      'shortcut': 'clock1230',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1036,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 2232,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eye_in_speech_bubble',
      'name': 'eye in speech bubble',
      'shortcut': 'eye_in_speech_bubble',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 1037,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 1512,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': 'speech_left',
      'name': 'left speech bubble',
      'shortcut': 'speech_left',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10100,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'eject',
      'name': 'eject symbol',
      'shortcut': 'eject',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10101,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 2592,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': 'gay_pride_flag',
      'name': 'gay_pride_flag',
      'shortcut': 'gay_pride_flag',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10102,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://twemoji.maxcdn.com/2/72x72/.png',
        'height': 22,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': 'black_heart',
      'name': 'black heart',
      'shortcut': 'black_heart',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10124,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 648,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 9
      },
      'hasSkinVariations': false
    },
    {
      'id': 'octagonal_sign',
      'name': 'octagonal sign',
      'shortcut': 'octagonal_sign',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10150,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 792,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 11
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_z',
      'name': 'regional indicator symbol letter z',
      'shortcut': 'regional_indicator_z',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10177,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_y',
      'name': 'regional indicator symbol letter y',
      'shortcut': 'regional_indicator_y',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10178,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_x',
      'name': 'regional indicator symbol letter x',
      'shortcut': 'regional_indicator_x',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10179,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_w',
      'name': 'regional indicator symbol letter w',
      'shortcut': 'regional_indicator_w',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10180,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_v',
      'name': 'regional indicator symbol letter v',
      'shortcut': 'regional_indicator_v',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10181,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_u',
      'name': 'regional indicator symbol letter u',
      'shortcut': 'regional_indicator_u',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10182,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_t',
      'name': 'regional indicator symbol letter t',
      'shortcut': 'regional_indicator_t',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10183,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_s',
      'name': 'regional indicator symbol letter s',
      'shortcut': 'regional_indicator_s',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10184,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_r',
      'name': 'regional indicator symbol letter r',
      'shortcut': 'regional_indicator_r',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10185,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_q',
      'name': 'regional indicator symbol letter q',
      'shortcut': 'regional_indicator_q',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10186,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_p',
      'name': 'regional indicator symbol letter p',
      'shortcut': 'regional_indicator_p',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10187,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_o',
      'name': 'regional indicator symbol letter o',
      'shortcut': 'regional_indicator_o',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10188,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_n',
      'name': 'regional indicator symbol letter n',
      'shortcut': 'regional_indicator_n',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10189,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_m',
      'name': 'regional indicator symbol letter m',
      'shortcut': 'regional_indicator_m',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10190,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_l',
      'name': 'regional indicator symbol letter l',
      'shortcut': 'regional_indicator_l',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10191,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_k',
      'name': 'regional indicator symbol letter k',
      'shortcut': 'regional_indicator_k',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10192,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_j',
      'name': 'regional indicator symbol letter j',
      'shortcut': 'regional_indicator_j',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10193,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_i',
      'name': 'regional indicator symbol letter i',
      'shortcut': 'regional_indicator_i',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10194,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_h',
      'name': 'regional indicator symbol letter h',
      'shortcut': 'regional_indicator_h',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10195,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_g',
      'name': 'regional indicator symbol letter g',
      'shortcut': 'regional_indicator_g',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10196,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_f',
      'name': 'regional indicator symbol letter f',
      'shortcut': 'regional_indicator_f',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10197,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_e',
      'name': 'regional indicator symbol letter e',
      'shortcut': 'regional_indicator_e',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10198,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_d',
      'name': 'regional indicator symbol letter d',
      'shortcut': 'regional_indicator_d',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10199,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_c',
      'name': 'regional indicator symbol letter c',
      'shortcut': 'regional_indicator_c',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10200,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_b',
      'name': 'regional indicator symbol letter b',
      'shortcut': 'regional_indicator_b',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10201,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'regional_indicator_a',
      'name': 'regional indicator symbol letter a',
      'shortcut': 'regional_indicator_a',
      'type': 'STANDARD',
      'category': 'SYMBOLS',
      'order': 10202,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ac',
      'name': 'ascension',
      'shortcut': 'flag_ac',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1038,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_af',
      'name': 'afghanistan',
      'shortcut': 'flag_af',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1039,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_al',
      'name': 'albania',
      'shortcut': 'flag_al',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1040,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_dz',
      'name': 'algeria',
      'shortcut': 'flag_dz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1041,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ad',
      'name': 'andorra',
      'shortcut': 'flag_ad',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1042,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ao',
      'name': 'angola',
      'shortcut': 'flag_ao',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1043,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ai',
      'name': 'anguilla',
      'shortcut': 'flag_ai',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1044,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ag',
      'name': 'antigua and barbuda',
      'shortcut': 'flag_ag',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1045,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ar',
      'name': 'argentina',
      'shortcut': 'flag_ar',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1046,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_am',
      'name': 'armenia',
      'shortcut': 'flag_am',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1047,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_aw',
      'name': 'aruba',
      'shortcut': 'flag_aw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1048,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_au',
      'name': 'australia',
      'shortcut': 'flag_au',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1049,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_at',
      'name': 'austria',
      'shortcut': 'flag_at',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1050,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_az',
      'name': 'azerbaijan',
      'shortcut': 'flag_az',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1051,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bs',
      'name': 'the bahamas',
      'shortcut': 'flag_bs',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1052,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bh',
      'name': 'bahrain',
      'shortcut': 'flag_bh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1053,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bd',
      'name': 'bangladesh',
      'shortcut': 'flag_bd',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1054,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bb',
      'name': 'barbados',
      'shortcut': 'flag_bb',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1055,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_by',
      'name': 'belarus',
      'shortcut': 'flag_by',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1056,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_be',
      'name': 'belgium',
      'shortcut': 'flag_be',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1057,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bz',
      'name': 'belize',
      'shortcut': 'flag_bz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1058,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bj',
      'name': 'benin',
      'shortcut': 'flag_bj',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1059,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bm',
      'name': 'bermuda',
      'shortcut': 'flag_bm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1060,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bt',
      'name': 'bhutan',
      'shortcut': 'flag_bt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1061,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bo',
      'name': 'bolivia',
      'shortcut': 'flag_bo',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1062,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ba',
      'name': 'bosnia and herzegovina',
      'shortcut': 'flag_ba',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1063,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bw',
      'name': 'botswana',
      'shortcut': 'flag_bw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1064,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_br',
      'name': 'brazil',
      'shortcut': 'flag_br',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1065,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bn',
      'name': 'brunei',
      'shortcut': 'flag_bn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1066,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bg',
      'name': 'bulgaria',
      'shortcut': 'flag_bg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1067,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bf',
      'name': 'burkina faso',
      'shortcut': 'flag_bf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1068,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bi',
      'name': 'burundi',
      'shortcut': 'flag_bi',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1069,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cv',
      'name': 'cape verde',
      'shortcut': 'flag_cv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1070,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kh',
      'name': 'cambodia',
      'shortcut': 'flag_kh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1071,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cm',
      'name': 'cameroon',
      'shortcut': 'flag_cm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1072,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ca',
      'name': 'canada',
      'shortcut': 'flag_ca',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1073,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ky',
      'name': 'cayman islands',
      'shortcut': 'flag_ky',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1074,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cf',
      'name': 'central african republic',
      'shortcut': 'flag_cf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1075,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_td',
      'name': 'chad',
      'shortcut': 'flag_td',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1076,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cl',
      'name': 'chile',
      'shortcut': 'flag_cl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1077,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cn',
      'name': 'china',
      'shortcut': 'flag_cn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1078,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_co',
      'name': 'colombia',
      'shortcut': 'flag_co',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1079,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_km',
      'name': 'the comoros',
      'shortcut': 'flag_km',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1080,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cg',
      'name': 'the republic of the congo',
      'shortcut': 'flag_cg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1081,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cd',
      'name': 'the democratic republic of the congo',
      'shortcut': 'flag_cd',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1082,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cr',
      'name': 'costa rica',
      'shortcut': 'flag_cr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1083,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_hr',
      'name': 'croatia',
      'shortcut': 'flag_hr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1084,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cu',
      'name': 'cuba',
      'shortcut': 'flag_cu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1085,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cy',
      'name': 'cyprus',
      'shortcut': 'flag_cy',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1086,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cz',
      'name': 'the czech republic',
      'shortcut': 'flag_cz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1087,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_dk',
      'name': 'denmark',
      'shortcut': 'flag_dk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1088,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_dj',
      'name': 'djibouti',
      'shortcut': 'flag_dj',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1089,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_dm',
      'name': 'dominica',
      'shortcut': 'flag_dm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1090,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_do',
      'name': 'the dominican republic',
      'shortcut': 'flag_do',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1091,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ec',
      'name': 'ecuador',
      'shortcut': 'flag_ec',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1092,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_eg',
      'name': 'egypt',
      'shortcut': 'flag_eg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1093,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sv',
      'name': 'el salvador',
      'shortcut': 'flag_sv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1094,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gq',
      'name': 'equatorial guinea',
      'shortcut': 'flag_gq',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1095,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_er',
      'name': 'eritrea',
      'shortcut': 'flag_er',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1096,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ee',
      'name': 'estonia',
      'shortcut': 'flag_ee',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1097,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_et',
      'name': 'ethiopia',
      'shortcut': 'flag_et',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1098,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fk',
      'name': 'falkland islands',
      'shortcut': 'flag_fk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1099,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fo',
      'name': 'faroe islands',
      'shortcut': 'flag_fo',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1100,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fj',
      'name': 'fiji',
      'shortcut': 'flag_fj',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1101,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fi',
      'name': 'finland',
      'shortcut': 'flag_fi',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1102,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fr',
      'name': 'france',
      'shortcut': 'flag_fr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1103,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pf',
      'name': 'french polynesia',
      'shortcut': 'flag_pf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1104,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ga',
      'name': 'gabon',
      'shortcut': 'flag_ga',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1105,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gm',
      'name': 'the gambia',
      'shortcut': 'flag_gm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1106,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ge',
      'name': 'georgia',
      'shortcut': 'flag_ge',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1107,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_de',
      'name': 'germany',
      'shortcut': 'flag_de',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1108,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gh',
      'name': 'ghana',
      'shortcut': 'flag_gh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1109,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gi',
      'name': 'gibraltar',
      'shortcut': 'flag_gi',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1110,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gr',
      'name': 'greece',
      'shortcut': 'flag_gr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1111,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gl',
      'name': 'greenland',
      'shortcut': 'flag_gl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1112,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gd',
      'name': 'grenada',
      'shortcut': 'flag_gd',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1113,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gu',
      'name': 'guam',
      'shortcut': 'flag_gu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1114,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gt',
      'name': 'guatemala',
      'shortcut': 'flag_gt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1115,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gn',
      'name': 'guinea',
      'shortcut': 'flag_gn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1116,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gw',
      'name': 'guinea-bissau',
      'shortcut': 'flag_gw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1117,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gy',
      'name': 'guyana',
      'shortcut': 'flag_gy',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1118,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ht',
      'name': 'haiti',
      'shortcut': 'flag_ht',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1119,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_hn',
      'name': 'honduras',
      'shortcut': 'flag_hn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1120,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_hk',
      'name': 'hong kong',
      'shortcut': 'flag_hk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1121,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_hu',
      'name': 'hungary',
      'shortcut': 'flag_hu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1122,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_is',
      'name': 'iceland',
      'shortcut': 'flag_is',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1123,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_in',
      'name': 'india',
      'shortcut': 'flag_in',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1124,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_id',
      'name': 'indonesia',
      'shortcut': 'flag_id',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1125,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ir',
      'name': 'iran',
      'shortcut': 'flag_ir',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1126,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_iq',
      'name': 'iraq',
      'shortcut': 'flag_iq',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1127,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ie',
      'name': 'ireland',
      'shortcut': 'flag_ie',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1128,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_il',
      'name': 'israel',
      'shortcut': 'flag_il',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1129,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_it',
      'name': 'italy',
      'shortcut': 'flag_it',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1130,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ci',
      'name': 'côte d’ivoire',
      'shortcut': 'flag_ci',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1131,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_jm',
      'name': 'jamaica',
      'shortcut': 'flag_jm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1132,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_jp',
      'name': 'japan',
      'shortcut': 'flag_jp',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1133,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_je',
      'name': 'jersey',
      'shortcut': 'flag_je',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1134,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_jo',
      'name': 'jordan',
      'shortcut': 'flag_jo',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1135,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kz',
      'name': 'kazakhstan',
      'shortcut': 'flag_kz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1136,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ke',
      'name': 'kenya',
      'shortcut': 'flag_ke',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1137,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ki',
      'name': 'kiribati',
      'shortcut': 'flag_ki',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1138,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_xk',
      'name': 'kosovo',
      'shortcut': 'flag_xk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1139,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kw',
      'name': 'kuwait',
      'shortcut': 'flag_kw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1140,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kg',
      'name': 'kyrgyzstan',
      'shortcut': 'flag_kg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1141,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_la',
      'name': 'laos',
      'shortcut': 'flag_la',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1142,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lv',
      'name': 'latvia',
      'shortcut': 'flag_lv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1143,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lb',
      'name': 'lebanon',
      'shortcut': 'flag_lb',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1144,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ls',
      'name': 'lesotho',
      'shortcut': 'flag_ls',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1145,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lr',
      'name': 'liberia',
      'shortcut': 'flag_lr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1146,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ly',
      'name': 'libya',
      'shortcut': 'flag_ly',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1147,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_li',
      'name': 'liechtenstein',
      'shortcut': 'flag_li',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1148,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lt',
      'name': 'lithuania',
      'shortcut': 'flag_lt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1149,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lu',
      'name': 'luxembourg',
      'shortcut': 'flag_lu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1150,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mo',
      'name': 'macau',
      'shortcut': 'flag_mo',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1151,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mk',
      'name': 'macedonia',
      'shortcut': 'flag_mk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1152,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mg',
      'name': 'madagascar',
      'shortcut': 'flag_mg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1153,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mw',
      'name': 'malawi',
      'shortcut': 'flag_mw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1154,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_my',
      'name': 'malaysia',
      'shortcut': 'flag_my',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1155,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mv',
      'name': 'maldives',
      'shortcut': 'flag_mv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1156,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ml',
      'name': 'mali',
      'shortcut': 'flag_ml',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1157,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mt',
      'name': 'malta',
      'shortcut': 'flag_mt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1158,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mh',
      'name': 'the marshall islands',
      'shortcut': 'flag_mh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1159,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mr',
      'name': 'mauritania',
      'shortcut': 'flag_mr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1160,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mu',
      'name': 'mauritius',
      'shortcut': 'flag_mu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1161,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mx',
      'name': 'mexico',
      'shortcut': 'flag_mx',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1162,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_fm',
      'name': 'micronesia',
      'shortcut': 'flag_fm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1163,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_md',
      'name': 'moldova',
      'shortcut': 'flag_md',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1164,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mc',
      'name': 'monaco',
      'shortcut': 'flag_mc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1165,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mn',
      'name': 'mongolia',
      'shortcut': 'flag_mn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1166,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_me',
      'name': 'montenegro',
      'shortcut': 'flag_me',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1167,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ms',
      'name': 'montserrat',
      'shortcut': 'flag_ms',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1168,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ma',
      'name': 'morocco',
      'shortcut': 'flag_ma',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1169,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mz',
      'name': 'mozambique',
      'shortcut': 'flag_mz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1170,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 288,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 4,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mm',
      'name': 'myanmar',
      'shortcut': 'flag_mm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1171,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_na',
      'name': 'namibia',
      'shortcut': 'flag_na',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1172,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nr',
      'name': 'nauru',
      'shortcut': 'flag_nr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1173,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_np',
      'name': 'nepal',
      'shortcut': 'flag_np',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1174,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nl',
      'name': 'the netherlands',
      'shortcut': 'flag_nl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1175,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nc',
      'name': 'new caledonia',
      'shortcut': 'flag_nc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1176,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nz',
      'name': 'new zealand',
      'shortcut': 'flag_nz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1177,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ni',
      'name': 'nicaragua',
      'shortcut': 'flag_ni',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1178,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 792,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 11,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ne',
      'name': 'niger',
      'shortcut': 'flag_ne',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1179,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 576,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 8,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ng',
      'name': 'nigeria',
      'shortcut': 'flag_ng',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1180,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nu',
      'name': 'niue',
      'shortcut': 'flag_nu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1181,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kp',
      'name': 'north korea',
      'shortcut': 'flag_kp',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1182,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_no',
      'name': 'norway',
      'shortcut': 'flag_no',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1183,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_om',
      'name': 'oman',
      'shortcut': 'flag_om',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1184,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pk',
      'name': 'pakistan',
      'shortcut': 'flag_pk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1185,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1872,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 26,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pw',
      'name': 'palau',
      'shortcut': 'flag_pw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1186,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ps',
      'name': 'palestinian authority',
      'shortcut': 'flag_ps',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1187,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pa',
      'name': 'panama',
      'shortcut': 'flag_pa',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1188,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pg',
      'name': 'papua new guinea',
      'shortcut': 'flag_pg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1189,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_py',
      'name': 'paraguay',
      'shortcut': 'flag_py',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1190,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pe',
      'name': 'peru',
      'shortcut': 'flag_pe',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1191,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ph',
      'name': 'the philippines',
      'shortcut': 'flag_ph',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1192,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pl',
      'name': 'poland',
      'shortcut': 'flag_pl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1193,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pt',
      'name': 'portugal',
      'shortcut': 'flag_pt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1194,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pr',
      'name': 'puerto rico',
      'shortcut': 'flag_pr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1195,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_qa',
      'name': 'qatar',
      'shortcut': 'flag_qa',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1196,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ro',
      'name': 'romania',
      'shortcut': 'flag_ro',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1197,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ru',
      'name': 'russia',
      'shortcut': 'flag_ru',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1198,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2952,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 41,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_rw',
      'name': 'rwanda',
      'shortcut': 'flag_rw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1199,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sh',
      'name': 'saint helena',
      'shortcut': 'flag_sh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1200,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kn',
      'name': 'saint kitts and nevis',
      'shortcut': 'flag_kn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1201,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lc',
      'name': 'saint lucia',
      'shortcut': 'flag_lc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1202,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_vc',
      'name': 'saint vincent and the grenadines',
      'shortcut': 'flag_vc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1203,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2520,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 35,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ws',
      'name': 'samoa',
      'shortcut': 'flag_ws',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1204,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sm',
      'name': 'san marino',
      'shortcut': 'flag_sm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1205,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3888,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 54,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_st',
      'name': 'são tomé and príncipe',
      'shortcut': 'flag_st',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1206,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sa',
      'name': 'saudi arabia',
      'shortcut': 'flag_sa',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1207,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3168,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 44,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sn',
      'name': 'senegal',
      'shortcut': 'flag_sn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1208,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_rs',
      'name': 'serbia',
      'shortcut': 'flag_rs',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1209,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sc',
      'name': 'the seychelles',
      'shortcut': 'flag_sc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1210,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sl',
      'name': 'sierra leone',
      'shortcut': 'flag_sl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1211,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sg',
      'name': 'singapore',
      'shortcut': 'flag_sg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1212,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3528,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 49,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sk',
      'name': 'slovakia',
      'shortcut': 'flag_sk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1213,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_si',
      'name': 'slovenia',
      'shortcut': 'flag_si',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1214,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sb',
      'name': 'the solomon islands',
      'shortcut': 'flag_sb',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1215,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3240,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 45,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_so',
      'name': 'somalia',
      'shortcut': 'flag_so',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1216,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 0,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 0,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_za',
      'name': 'south africa',
      'shortcut': 'flag_za',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1217,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_kr',
      'name': 'korea',
      'shortcut': 'flag_kr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1218,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_es',
      'name': 'spain',
      'shortcut': 'flag_es',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1219,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_lk',
      'name': 'sri lanka',
      'shortcut': 'flag_lk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1220,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sd',
      'name': 'sudan',
      'shortcut': 'flag_sd',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1221,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sr',
      'name': 'suriname',
      'shortcut': 'flag_sr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1222,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sz',
      'name': 'swaziland',
      'shortcut': 'flag_sz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1223,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_se',
      'name': 'sweden',
      'shortcut': 'flag_se',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1224,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ch',
      'name': 'switzerland',
      'shortcut': 'flag_ch',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1225,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3312,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 46,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sy',
      'name': 'syria',
      'shortcut': 'flag_sy',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1226,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 432,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 6,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tw',
      'name': 'the republic of china',
      'shortcut': 'flag_tw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1227,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1728,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 24,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tj',
      'name': 'tajikistan',
      'shortcut': 'flag_tj',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1228,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1080,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 15,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tz',
      'name': 'tanzania',
      'shortcut': 'flag_tz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1229,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1800,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 25,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_th',
      'name': 'thailand',
      'shortcut': 'flag_th',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1230,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tl',
      'name': 'timor-leste',
      'shortcut': 'flag_tl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1231,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1224,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 17,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tg',
      'name': 'togo',
      'shortcut': 'flag_tg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1232,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_to',
      'name': 'tonga',
      'shortcut': 'flag_to',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1233,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1440,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 20,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tt',
      'name': 'trinidad and tobago',
      'shortcut': 'flag_tt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1234,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1584,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 22,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tn',
      'name': 'tunisia',
      'shortcut': 'flag_tn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1235,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1368,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 19,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tr',
      'name': 'turkey',
      'shortcut': 'flag_tr',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1236,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tm',
      'name': 'turkmenistan',
      'shortcut': 'flag_tm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1237,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tv',
      'name': 'tuvalu',
      'shortcut': 'flag_tv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1238,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1656,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 23,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ug',
      'name': 'uganda',
      'shortcut': 'flag_ug',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1239,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ua',
      'name': 'ukraine',
      'shortcut': 'flag_ua',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1240,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1944,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 27,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ae',
      'name': 'the united arab emirates',
      'shortcut': 'flag_ae',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1241,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gb',
      'name': 'great britain',
      'shortcut': 'flag_gb',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1242,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2160,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 30,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_us',
      'name': 'united states',
      'shortcut': 'flag_us',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1243,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_vi',
      'name': 'u.s. virgin islands',
      'shortcut': 'flag_vi',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1244,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_uy',
      'name': 'uruguay',
      'shortcut': 'flag_uy',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1245,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2232,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 31,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_uz',
      'name': 'uzbekistan',
      'shortcut': 'flag_uz',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1246,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_vu',
      'name': 'vanuatu',
      'shortcut': 'flag_vu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1247,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_va',
      'name': 'the vatican city',
      'shortcut': 'flag_va',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1248,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ve',
      'name': 'venezuela',
      'shortcut': 'flag_ve',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1249,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_vn',
      'name': 'vietnam',
      'shortcut': 'flag_vn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1250,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2808,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 39,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_wf',
      'name': 'wallis and futuna',
      'shortcut': 'flag_wf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1251,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_eh',
      'name': 'western sahara',
      'shortcut': 'flag_eh',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1252,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1296,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 18,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ye',
      'name': 'yemen',
      'shortcut': 'flag_ye',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1253,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3384,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 47,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_zm',
      'name': 'zambia',
      'shortcut': 'flag_zm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1254,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_zw',
      'name': 'zimbabwe',
      'shortcut': 'flag_zw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1255,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3744,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 52,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_re',
      'name': 'réunion',
      'shortcut': 'flag_re',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1256,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2736,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 38,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ax',
      'name': 'åland islands',
      'shortcut': 'flag_ax',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1257,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ta',
      'name': 'tristan da cunha',
      'shortcut': 'flag_ta',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1258,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_io',
      'name': 'british indian ocean territory',
      'shortcut': 'flag_io',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1259,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bq',
      'name': 'caribbean netherlands',
      'shortcut': 'flag_bq',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1260,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2304,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 32,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cx',
      'name': 'christmas island',
      'shortcut': 'flag_cx',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1261,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cc',
      'name': 'cocos (keeling) islands',
      'shortcut': 'flag_cc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1262,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3024,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 42,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gg',
      'name': 'guernsey',
      'shortcut': 'flag_gg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1263,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2448,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 34,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_im',
      'name': 'isle of man',
      'shortcut': 'flag_im',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1264,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 216,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 3,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_yt',
      'name': 'mayotte',
      'shortcut': 'flag_yt',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1265,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_nf',
      'name': 'norfolk island',
      'shortcut': 'flag_nf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1266,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 648,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 9,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pn',
      'name': 'pitcairn',
      'shortcut': 'flag_pn',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1267,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bl',
      'name': 'saint barthélemy',
      'shortcut': 'flag_bl',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1268,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_pm',
      'name': 'saint pierre and miquelon',
      'shortcut': 'flag_pm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1269,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2016,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 28,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gs',
      'name': 'south georgia',
      'shortcut': 'flag_gs',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1270,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3096,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 43,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tk',
      'name': 'tokelau',
      'shortcut': 'flag_tk',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1271,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1152,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 16,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_bv',
      'name': 'bouvet island',
      'shortcut': 'flag_bv',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1272,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2592,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 36,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_hm',
      'name': 'heard island and mcdonald islands',
      'shortcut': 'flag_hm',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1273,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sj',
      'name': 'svalbard and jan mayen',
      'shortcut': 'flag_sj',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1274,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 936,
        'y': 216,
        'height': 72,
        'width': 72,
        'xIndex': 13,
        'yIndex': 3
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_um',
      'name': 'united states minor outlying islands',
      'shortcut': 'flag_um',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1275,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2088,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 29,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ic',
      'name': 'canary islands',
      'shortcut': 'flag_ic',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1276,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3960,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 55,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ea',
      'name': 'ceuta, melilla',
      'shortcut': 'flag_ea',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1277,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1008,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 14,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cp',
      'name': 'clipperton island',
      'shortcut': 'flag_cp',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1278,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_dg',
      'name': 'diego garcia',
      'shortcut': 'flag_dg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1279,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 504,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 7,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_as',
      'name': 'american samoa',
      'shortcut': 'flag_as',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1280,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_aq',
      'name': 'antarctica',
      'shortcut': 'flag_aq',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1281,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_vg',
      'name': 'british virgin islands',
      'shortcut': 'flag_vg',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1282,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2664,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 37,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ck',
      'name': 'cook islands',
      'shortcut': 'flag_ck',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1283,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3456,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 48,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_cw',
      'name': 'curaçao',
      'shortcut': 'flag_cw',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1284,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 72,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 1,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_eu',
      'name': 'european union',
      'shortcut': 'flag_eu',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1285,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 1512,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 21,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gf',
      'name': 'french guiana',
      'shortcut': 'flag_gf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1286,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2376,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 33,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tf',
      'name': 'french southern territories',
      'shortcut': 'flag_tf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1287,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 864,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 12,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_gp',
      'name': 'guadeloupe',
      'shortcut': 'flag_gp',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1288,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 2880,
        'y': 72,
        'height': 72,
        'width': 72,
        'xIndex': 40,
        'yIndex': 1
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mq',
      'name': 'martinique',
      'shortcut': 'flag_mq',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1289,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3672,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 51,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mp',
      'name': 'northern mariana islands',
      'shortcut': 'flag_mp',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1290,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3600,
        'y': 144,
        'height': 72,
        'width': 72,
        'xIndex': 50,
        'yIndex': 2
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_sx',
      'name': 'sint maarten',
      'shortcut': 'flag_sx',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1291,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 360,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 5,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_ss',
      'name': 'south sudan',
      'shortcut': 'flag_ss',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1292,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 144,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 2,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_tc',
      'name': 'turks and caicos islands',
      'shortcut': 'flag_tc',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1293,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 720,
        'y': 288,
        'height': 72,
        'width': 72,
        'xIndex': 10,
        'yIndex': 4
      },
      'hasSkinVariations': false
    },
    {
      'id': 'flag_mf',
      'name': 'saint martin',
      'shortcut': 'flag_mf',
      'type': 'STANDARD',
      'category': 'FLAGS',
      'order': 1294,
      'skinVariations': [],
      'representation': {
        'spriteRef': 'twemoji-crushed.png',
        'x': 3816,
        'y': 0,
        'height': 72,
        'width': 72,
        'xIndex': 53,
        'yIndex': 0
      },
      'hasSkinVariations': false
    },
    {
      'id': '105216',
      'name': null,
      'shortcut': 'allthethings',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/allthethings-1414024836.png',
        'height': 30,
        'width': 36
      },
      'hasSkinVariations': false
    },
    {
      'id': '105187',
      'name': null,
      'shortcut': 'android',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/android-1414024011.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105195',
      'name': null,
      'shortcut': 'areyoukiddingme',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/areyoukiddingme-1414024355.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105179',
      'name': null,
      'shortcut': 'arrington',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/arrington-1414023805.png',
        'height': 25,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '105287',
      'name': null,
      'shortcut': 'arya',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/arya-1414028821.png',
        'height': 30,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105225',
      'name': null,
      'shortcut': 'ashton',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ashton-1414025136.png',
        'height': 25,
        'width': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': '105230',
      'name': null,
      'shortcut': 'atlassian',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/atlassian-1414025304.png',
        'height': 23,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118609',
      'name': null,
      'shortcut': 'awesome',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/awesome-1417754492.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105239',
      'name': null,
      'shortcut': 'awthanks',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/awthanks-1414025485.png',
        'height': 30,
        'width': 31
      },
      'hasSkinVariations': false
    },
    {
      'id': '118611',
      'name': null,
      'shortcut': 'awwyiss',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/awwyiss-1417754513.png',
        'height': 26,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '118561',
      'name': null,
      'shortcut': 'awyeah',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/awyeah-1417750835.png',
        'height': 18,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118563',
      'name': null,
      'shortcut': 'badass',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/badass-1417750950.png',
        'height': 23,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118564',
      'name': null,
      'shortcut': 'badjokeeel',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/badjokeeel-1417751014.png',
        'height': 22,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105697',
      'name': null,
      'shortcut': 'badpokerface',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/badpokerface-1414089953.png',
        'height': 25,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '118612',
      'name': null,
      'shortcut': 'badtime',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/badtime-1417754523.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '162164',
      'name': null,
      'shortcut': 'bamboo',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bamboo-1431522312.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '547612',
      'name': null,
      'shortcut': 'ban',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ban-1466106001.jpg',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '502018',
      'name': null,
      'shortcut': 'banks',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/banks-1461790674.gif',
        'height': 23,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105181',
      'name': null,
      'shortcut': 'basket',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/basket-1414023854.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105136',
      'name': null,
      'shortcut': 'beer',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/beer-1414022661.png',
        'height': 20,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '118614',
      'name': null,
      'shortcut': 'bicepleft',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bicepleft-1417754567.png',
        'height': 30,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118615',
      'name': null,
      'shortcut': 'bicepright',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bicepright-1417754576.png',
        'height': 30,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '162165',
      'name': null,
      'shortcut': 'bitbucket',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bitbucket-1431522339.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105798',
      'name': null,
      'shortcut': 'boom',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/boom-1414103101.gif',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118616',
      'name': null,
      'shortcut': 'borat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/borat-1417754598.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105273',
      'name': null,
      'shortcut': 'branch',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/branch-1414026601.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '118565',
      'name': null,
      'shortcut': 'bumble',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bumble-1417751030.png',
        'height': 28,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105182',
      'name': null,
      'shortcut': 'bunny',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/bunny-1414023876.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105184',
      'name': null,
      'shortcut': 'cadbury',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cadbury-1414023926.png',
        'height': 18,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105188',
      'name': null,
      'shortcut': 'cake',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cake-1414024030.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '615705',
      'name': null,
      'shortcut': 'cancer',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cancer-1473442882.png',
        'height': 29,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '105209',
      'name': null,
      'shortcut': 'candycorn',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/candycorn-1414024689.png',
        'height': 27,
        'width': 14
      },
      'hasSkinVariations': false
    },
    {
      'id': '118617',
      'name': null,
      'shortcut': 'carl',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/carl-1417754606.png',
        'height': 20,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118566',
      'name': null,
      'shortcut': 'caruso',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/caruso-1417751051.png',
        'height': 22,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118618',
      'name': null,
      'shortcut': 'catchemall',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/catchemall-1417754614.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105236',
      'name': null,
      'shortcut': 'ceilingcat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ceilingcat-1414025417.png',
        'height': 14,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '120617',
      'name': null,
      'shortcut': 'celeryman',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/celeryman-1418247558.gif',
        'height': 30,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '105163',
      'name': null,
      'shortcut': 'cereal',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cereal-1414023343.png',
        'height': 24,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105259',
      'name': null,
      'shortcut': 'cerealspit',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cerealspit-1414026180.png',
        'height': 24,
        'width': 41
      },
      'hasSkinVariations': false
    },
    {
      'id': '118567',
      'name': null,
      'shortcut': 'challengeaccepted',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/challengeaccepted-1417751095.png',
        'height': 28,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '118619',
      'name': null,
      'shortcut': 'chef',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/chef-1417754621.png',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '118568',
      'name': null,
      'shortcut': 'chewie',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/chewie-1417751139.png',
        'height': 25,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105185',
      'name': null,
      'shortcut': 'chocobunny',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/chocobunny-1414023949.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105226',
      'name': null,
      'shortcut': 'chompy',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/chompy-1414025208.gif',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118569',
      'name': null,
      'shortcut': 'chucknorris',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/chucknorris-1417751159.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118573',
      'name': null,
      'shortcut': 'clarence',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/clarence-1417751942.png',
        'height': 29,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '106474',
      'name': null,
      'shortcut': 'coffee',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/coffee-1414375635.png',
        'height': 17,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '162166',
      'name': null,
      'shortcut': 'confluence',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/confluence-1431522360.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105165',
      'name': null,
      'shortcut': 'content',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/content-1414023392.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105269',
      'name': null,
      'shortcut': 'continue',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/continue-1414026510.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '118620',
      'name': null,
      'shortcut': 'cookie',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cookie-1417754631.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105145',
      'name': null,
      'shortcut': 'cornelius',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/cornelius-1414022924.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118621',
      'name': null,
      'shortcut': 'corpsethumb',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/corpsethumb-1417754640.png',
        'height': 20,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '162167',
      'name': null,
      'shortcut': 'crucible',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/crucible-1431522372.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105293',
      'name': null,
      'shortcut': 'daenerys',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/daenerys-1414028947.png',
        'height': 24,
        'width': 32
      },
      'hasSkinVariations': false
    },
    {
      'id': '105229',
      'name': null,
      'shortcut': 'dance',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/dance-1414025267.gif',
        'height': 23,
        'width': 26
      },
      'hasSkinVariations': false
    },
    {
      'id': '105221',
      'name': null,
      'shortcut': 'dealwithit',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/dealwithit-1414024955.gif',
        'height': 22,
        'width': 35
      },
      'hasSkinVariations': false
    },
    {
      'id': '118574',
      'name': null,
      'shortcut': 'derp',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/derp-1417751963.png',
        'height': 29,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '118622',
      'name': null,
      'shortcut': 'disappear',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/disappear-1417754650.gif',
        'height': 24,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105200',
      'name': null,
      'shortcut': 'disapproval',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/disapproval-1414024448.png',
        'height': 18,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '105298',
      'name': null,
      'shortcut': 'doge',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/doge-1414029048.png',
        'height': 25,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118629',
      'name': null,
      'shortcut': 'doh',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/doh-1417755734.png',
        'height': 30,
        'width': 26
      },
      'hasSkinVariations': false
    },
    {
      'id': '118630',
      'name': null,
      'shortcut': 'donotwant',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/donotwant-1417755746.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105192',
      'name': null,
      'shortcut': 'dosequis',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/dosequis-1414024105.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118631',
      'name': null,
      'shortcut': 'downvote',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/downvote-1417755753.png',
        'height': 30,
        'width': 29
      },
      'hasSkinVariations': false
    },
    {
      'id': '105232',
      'name': null,
      'shortcut': 'drevil',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/drevil-1414025327.png',
        'height': 25,
        'width': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': '118632',
      'name': null,
      'shortcut': 'drool',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/drool-1417755763.png',
        'height': 30,
        'width': 26
      },
      'hasSkinVariations': false
    },
    {
      'id': '105186',
      'name': null,
      'shortcut': 'ducreux',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ducreux-1414023991.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118575',
      'name': null,
      'shortcut': 'dumb',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/dumb-1417751988.png',
        'height': 30,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '356949',
      'name': null,
      'shortcut': 'dwaboutit',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/dwaboutit-1448505588.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118633',
      'name': null,
      'shortcut': 'evilburns',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/evilburns-1417755772.png',
        'height': 30,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118634',
      'name': null,
      'shortcut': 'excellent',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/excellent-1417755785.png',
        'height': 30,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '118576',
      'name': null,
      'shortcut': 'facepalm',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/facepalm-1417752010.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105270',
      'name': null,
      'shortcut': 'failed',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/failed-1414026532.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '634757',
      'name': null,
      'shortcut': 'feelsbadman',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/feelsbadman-1475680700.png',
        'height': 24,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '634758',
      'name': null,
      'shortcut': 'feelsgoodman',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/feelsgoodman-1475680733.png',
        'height': 24,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118638',
      'name': null,
      'shortcut': 'finn',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/finn-1417755835.png',
        'height': 23,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '125576',
      'name': null,
      'shortcut': 'fireworks',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fireworks-1420575887.gif',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '162168',
      'name': null,
      'shortcut': 'fisheye',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fisheye-1431522386.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118577',
      'name': null,
      'shortcut': 'fonzie',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fonzie-1417752102.png',
        'height': 25,
        'width': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': '105155',
      'name': null,
      'shortcut': 'foreveralone',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/foreveralone-1414023140.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '152241',
      'name': null,
      'shortcut': 'forscale',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/forscale-1428536097.png',
        'height': 18,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '118578',
      'name': null,
      'shortcut': 'freddie',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/freddie-1417752152.png',
        'height': 35,
        'width': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': '105228',
      'name': null,
      'shortcut': 'fry',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fry-1414025241.png',
        'height': 25,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '118639',
      'name': null,
      'shortcut': 'ftfy',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ftfy-1417755844.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105149',
      'name': null,
      'shortcut': 'fu',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fu-1414023026.png',
        'height': 25,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105180',
      'name': null,
      'shortcut': 'fuckyeah',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fuckyeah-1414023828.png',
        'height': 23,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105245',
      'name': null,
      'shortcut': 'fwp',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/fwp-1414025600.png',
        'height': 25,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118579',
      'name': null,
      'shortcut': 'gangnamstyle',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/gangnamstyle-1417752182.gif',
        'height': 36,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '118580',
      'name': null,
      'shortcut': 'gates',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/gates-1417752311.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105208',
      'name': null,
      'shortcut': 'ghost',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ghost-1414024665.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118640',
      'name': null,
      'shortcut': 'giggity',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/giggity-1417755851.png',
        'height': 30,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '118641',
      'name': null,
      'shortcut': 'goldstar',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/goldstar-1417755861.png',
        'height': 20,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '118582',
      'name': null,
      'shortcut': 'goodnews',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/goodnews-1417752451.png',
        'height': 29,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105176',
      'name': null,
      'shortcut': 'greenbeer',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/greenbeer-1414023735.png',
        'height': 20,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '105265',
      'name': null,
      'shortcut': 'grumpycat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/grumpycat-1414026366.png',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '105278',
      'name': null,
      'shortcut': 'gtfo',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/gtfo-1414026923.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118642',
      'name': null,
      'shortcut': 'haha',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/haha-1417755876.png',
        'height': 20,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118583',
      'name': null,
      'shortcut': 'haveaseat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/haveaseat-1417752572.png',
        'height': 25,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '118584',
      'name': null,
      'shortcut': 'heart',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/heart-1417752586.png',
        'height': 14,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '103756',
      'name': null,
      'shortcut': 'heygirl',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/heygirl-1413684451.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '162169',
      'name': null,
      'shortcut': 'hipchat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/hipchat-1431522405.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105224',
      'name': null,
      'shortcut': 'hipster',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/hipster-1414025113.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105286',
      'name': null,
      'shortcut': 'hodor',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/hodor-1414028801.png',
        'height': 30,
        'width': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': '118643',
      'name': null,
      'shortcut': 'huehue',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/huehue-1417755882.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118644',
      'name': null,
      'shortcut': 'hugefan',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/hugefan-1417755893.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105279',
      'name': null,
      'shortcut': 'huh',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/huh-1414026942.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118585',
      'name': null,
      'shortcut': 'ilied',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ilied-1417752608.png',
        'height': 25,
        'width': 29
      },
      'hasSkinVariations': false
    },
    {
      'id': '118586',
      'name': null,
      'shortcut': 'indeed',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/indeed-1417752694.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105255',
      'name': null,
      'shortcut': 'iseewhatyoudidthere',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/iseewhatyoudidthere-1414026019.png',
        'height': 25,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '118587',
      'name': null,
      'shortcut': 'itsatrap',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/itsatrap-1417752711.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118588',
      'name': null,
      'shortcut': 'jackie',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jackie-1417752827.png',
        'height': 18,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105289',
      'name': null,
      'shortcut': 'jaime',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jaime-1414028872.png',
        'height': 30,
        'width': 26
      },
      'hasSkinVariations': false
    },
    {
      'id': '119068',
      'name': null,
      'shortcut': 'jake',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jake-1417807978.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '162170',
      'name': null,
      'shortcut': 'jira',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jira-1431522426.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118581',
      'name': null,
      'shortcut': 'jobs',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jobs-1417752336.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118669',
      'name': null,
      'shortcut': 'joffrey',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/joffrey-1417760026.png',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '105292',
      'name': null,
      'shortcut': 'jonsnow',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/jonsnow-1414028921.png',
        'height': 25,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118589',
      'name': null,
      'shortcut': 'kennypowers',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/kennypowers-1417752920.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118590',
      'name': null,
      'shortcut': 'krang',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/krang-1417752938.png',
        'height': 28,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105143',
      'name': null,
      'shortcut': 'kwanzaa',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/kwanzaa-1414022870.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118591',
      'name': null,
      'shortcut': 'lincoln',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/lincoln-1417752959.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105167',
      'name': null,
      'shortcut': 'lol',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/lol-1414023491.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118592',
      'name': null,
      'shortcut': 'lolwut',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/lolwut-1417753079.png',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '105168',
      'name': null,
      'shortcut': 'megusta',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/megusta-1414023519.png',
        'height': 25,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118646',
      'name': null,
      'shortcut': 'meh',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/meh-1417755922.png',
        'height': 20,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105144',
      'name': null,
      'shortcut': 'menorah',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/menorah-1414022898.png',
        'height': 25,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '118647',
      'name': null,
      'shortcut': 'motherofgod',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/motherofgod-1417755937.gif',
        'height': 23,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105290',
      'name': null,
      'shortcut': 'ned',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ned-1414028897.png',
        'height': 25,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '105285',
      'name': null,
      'shortcut': 'nextgendev',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/nextgendev-1414028778.png',
        'height': 29,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '118648',
      'name': null,
      'shortcut': 'nice',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/nice-1417756761.png',
        'height': 28,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105243',
      'name': null,
      'shortcut': 'ninja',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ninja-1414025554.png',
        'height': 18,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '118649',
      'name': null,
      'shortcut': 'noidea',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/noidea-1417756770.png',
        'height': 30,
        'width': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': '118593',
      'name': null,
      'shortcut': 'notbad',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/notbad-1417754112.png',
        'height': 28,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '105222',
      'name': null,
      'shortcut': 'nothingtodohere',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/nothingtodohere-1414025069.png',
        'height': 25,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '118650',
      'name': null,
      'shortcut': 'notit',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/notit-1417756777.png',
        'height': 30,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118594',
      'name': null,
      'shortcut': 'notsureif',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/notsureif-1417754143.png',
        'height': 25,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '105249',
      'name': null,
      'shortcut': 'notsureifgusta',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/notsureifgusta-1414025677.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105262',
      'name': null,
      'shortcut': 'obama',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/obama-1414026271.png',
        'height': 25,
        'width': 33
      },
      'hasSkinVariations': false
    },
    {
      'id': '105178',
      'name': null,
      'shortcut': 'ohcrap',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ohcrap-1414023779.png',
        'height': 21,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105234',
      'name': null,
      'shortcut': 'ohgodwhy',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ohgodwhy-1414025393.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118651',
      'name': null,
      'shortcut': 'ohmy',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/ohmy-1417756786.png',
        'height': 30,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '105169',
      'name': null,
      'shortcut': 'okay',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/okay-1414023544.png',
        'height': 25,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '105170',
      'name': null,
      'shortcut': 'omg',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/omg-1414023574.png',
        'height': 23,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105223',
      'name': null,
      'shortcut': 'orly',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/orly-1414025090.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118652',
      'name': null,
      'shortcut': 'paddlin',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/paddlin-1417756794.png',
        'height': 24,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105191',
      'name': null,
      'shortcut': 'pbr',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pbr-1414024081.png',
        'height': 24,
        'width': 13
      },
      'hasSkinVariations': false
    },
    {
      'id': '118595',
      'name': null,
      'shortcut': 'philosoraptor',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/philosoraptor-1417754200.png',
        'height': 21,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105237',
      'name': null,
      'shortcut': 'pingpong',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pingpong-1414025441.png',
        'height': 22,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '615714',
      'name': null,
      'shortcut': 'pinkribbon',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pinkribbon-1473443004.png',
        'height': 29,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '104546',
      'name': null,
      'shortcut': 'pirate',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pirate-1413932391.png',
        'height': 18,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '105701',
      'name': null,
      'shortcut': 'pokerface',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pokerface-1414090721.png',
        'height': 23,
        'width': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': '104547',
      'name': null,
      'shortcut': 'poo',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/poo-1413932426.png',
        'height': 21,
        'width': 23
      },
      'hasSkinVariations': false
    },
    {
      'id': '118596',
      'name': null,
      'shortcut': 'present',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/present-1417754218.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '174629',
      'name': null,
      'shortcut': 'pride',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pride-1435338809.png',
        'height': 25,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105207',
      'name': null,
      'shortcut': 'pumpkin',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/pumpkin-1414024641.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105147',
      'name': null,
      'shortcut': 'rageguy',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/rageguy-1414022976.png',
        'height': 25,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105189',
      'name': null,
      'shortcut': 'rebeccablack',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/rebeccablack-1414024054.png',
        'height': 25,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '118597',
      'name': null,
      'shortcut': 'reddit',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/reddit-1417754241.png',
        'height': 25,
        'width': 18
      },
      'hasSkinVariations': false
    },
    {
      'id': '118653',
      'name': null,
      'shortcut': 'rockon',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/rockon-1417756812.gif',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118598',
      'name': null,
      'shortcut': 'romney',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/romney-1417754260.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105141',
      'name': null,
      'shortcut': 'rudolph',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/rudolph-1414022810.png',
        'height': 16,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118599',
      'name': null,
      'shortcut': 'sadpanda',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/sadpanda-1417754292.png',
        'height': 30,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '105171',
      'name': null,
      'shortcut': 'sadtroll',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/sadtroll-1414023623.png',
        'height': 20,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118654',
      'name': null,
      'shortcut': 'salute',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/salute-1417756826.png',
        'height': 22,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118600',
      'name': null,
      'shortcut': 'samuel',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/samuel-1417754316.png',
        'height': 25,
        'width': 19
      },
      'hasSkinVariations': false
    },
    {
      'id': '105142',
      'name': null,
      'shortcut': 'santa',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/santa-1414022839.png',
        'height': 23,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118655',
      'name': null,
      'shortcut': 'sap',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/sap-1417756835.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '103754',
      'name': null,
      'shortcut': 'scumbag',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/scumbag-1413684123.png',
        'height': 16,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105173',
      'name': null,
      'shortcut': 'seomoz',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/seomoz-1414023675.png',
        'height': 25,
        'width': 21
      },
      'hasSkinVariations': false
    },
    {
      'id': '105175',
      'name': null,
      'shortcut': 'shamrock',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/shamrock-1414023710.png',
        'height': 21,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '105322',
      'name': null,
      'shortcut': 'shrug',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/shrug-1414032234.png',
        'height': 15,
        'width': 64
      },
      'hasSkinVariations': false
    },
    {
      'id': '118601',
      'name': null,
      'shortcut': 'skyrim',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/skyrim-1417754336.png',
        'height': 30,
        'width': 17
      },
      'hasSkinVariations': false
    },
    {
      'id': '162171',
      'name': null,
      'shortcut': 'sourcetree',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/sourcetree-1431522444.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118656',
      'name': null,
      'shortcut': 'standup',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/standup-1417756844.gif',
        'height': 30,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '105214',
      'name': null,
      'shortcut': 'stare',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/stare-1414024815.png',
        'height': 25,
        'width': 34
      },
      'hasSkinVariations': false
    },
    {
      'id': '162172',
      'name': null,
      'shortcut': 'stash',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/stash-1431522460.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105254',
      'name': null,
      'shortcut': 'success',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/success-1414025948.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105271',
      'name': null,
      'shortcut': 'successful',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/successful-1414026553.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '118602',
      'name': null,
      'shortcut': 'sweetjesus',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/sweetjesus-1417754353.png',
        'height': 25,
        'width': 28
      },
      'hasSkinVariations': false
    },
    {
      'id': '105315',
      'name': null,
      'shortcut': 'tableflip',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/tableflip-1414031937.png',
        'height': 16,
        'width': 147
      },
      'hasSkinVariations': false
    },
    {
      'id': '118657',
      'name': null,
      'shortcut': 'taco',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/taco-1417756862.png',
        'height': 26,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118603',
      'name': null,
      'shortcut': 'taft',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/taft-1417754373.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105238',
      'name': null,
      'shortcut': 'tea',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/tea-1414025463.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '118659',
      'name': null,
      'shortcut': 'thatthing',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/thatthing-1417756953.png',
        'height': 22,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118660',
      'name': null,
      'shortcut': 'theyregreat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/theyregreat-1417756964.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105138',
      'name': null,
      'shortcut': 'tree',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/tree-1414022753.png',
        'height': 24,
        'width': 24
      },
      'hasSkinVariations': false
    },
    {
      'id': '105148',
      'name': null,
      'shortcut': 'troll',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/troll-1414023002.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '104455',
      'name': null,
      'shortcut': 'truestory',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/truestory-1413920318.png',
        'height': 27,
        'width': 29
      },
      'hasSkinVariations': false
    },
    {
      'id': '105264',
      'name': null,
      'shortcut': 'trump',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/trump-1414026327.png',
        'height': 25,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105282',
      'name': null,
      'shortcut': 'turkey',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/turkey-1414028694.png',
        'height': 17,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118604',
      'name': null,
      'shortcut': 'twss',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/twss-1417754388.png',
        'height': 25,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '105288',
      'name': null,
      'shortcut': 'tyrion',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/tyrion-1414028850.png',
        'height': 31,
        'width': 27
      },
      'hasSkinVariations': false
    },
    {
      'id': '105296',
      'name': null,
      'shortcut': 'tywin',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/tywin-1414028997.png',
        'height': 30,
        'width': 22
      },
      'hasSkinVariations': false
    },
    {
      'id': '118662',
      'name': null,
      'shortcut': 'unacceptable',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/unacceptable-1417756981.png',
        'height': 30,
        'width': 20
      },
      'hasSkinVariations': false
    },
    {
      'id': '105272',
      'name': null,
      'shortcut': 'unknown',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/unknown-1414026584.png',
        'height': 16,
        'width': 16
      },
      'hasSkinVariations': false
    },
    {
      'id': '118663',
      'name': null,
      'shortcut': 'upvote',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/upvote-1417756989.png',
        'height': 30,
        'width': 29
      },
      'hasSkinVariations': false
    },
    {
      'id': '109665',
      'name': null,
      'shortcut': 'vote',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/vote-1415153517.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118664',
      'name': null,
      'shortcut': 'waiting',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/waiting-1417756997.gif',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105157',
      'name': null,
      'shortcut': 'washington',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/washington-1414023164.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105219',
      'name': null,
      'shortcut': 'wat',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/wat-1414024905.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118665',
      'name': null,
      'shortcut': 'whoa',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/whoa-1417757013.png',
        'height': 28,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105300',
      'name': null,
      'shortcut': 'whynotboth',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/whynotboth-1414029073.gif',
        'height': 37,
        'width': 37
      },
      'hasSkinVariations': false
    },
    {
      'id': '118605',
      'name': null,
      'shortcut': 'wtf',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/wtf-1417754405.png',
        'height': 30,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '105150',
      'name': null,
      'shortcut': 'yey',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/yey-1414023049.png',
        'height': 25,
        'width': 25
      },
      'hasSkinVariations': false
    },
    {
      'id': '118606',
      'name': null,
      'shortcut': 'yodawg',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/yodawg-1417754419.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118667',
      'name': null,
      'shortcut': 'youdontsay',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/youdontsay-1417757028.png',
        'height': 18,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '105267',
      'name': null,
      'shortcut': 'yougotitdude',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/yougotitdude-1414026430.gif',
        'height': 25,
        'width': 48
      },
      'hasSkinVariations': false
    },
    {
      'id': '118607',
      'name': null,
      'shortcut': 'yuno',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/yuno-1417754433.png',
        'height': 30,
        'width': 30
      },
      'hasSkinVariations': false
    },
    {
      'id': '118608',
      'name': null,
      'shortcut': 'zoidberg',
      'type': 'ATLASSIAN',
      'category': 'ATLASSIAN',
      'order': 2147483647,
      'skinVariations': [],
      'representation': {
        'imagePath': 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/zoidberg-1417754444.png',
        'height': 24,
        'width': 30
      },
      'hasSkinVariations': false
    }
  ]
};


const denormaliseEmojis = (emojiData: any) => (
  emojiData.emojis.map((emoji) => {
    const newEmoji = { ...emoji };
    if (emoji.representation && emoji.representation.spriteRef) {
      newEmoji.representation.sprite = emojiData.meta.spriteSheets[emoji.representation.spriteRef];
    }

    if (emoji.skinVariations) {
      newEmoji.skinVariations = emoji.skinVariations.map((skinVariation) => {
        if (skinVariation.spriteRef) {
          return {
            ...skinVariation,
            sprite: emojiData.meta.spriteSheets[emoji.representation.spriteRef],
          };
        }

        return skinVariation;
      });
    }

    return newEmoji;
  })
);

const emojiData = denormaliseEmojis(emojis);
export const emojiService = new EmojiService(emojiData);

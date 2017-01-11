import { PropTypes } from 'react';

const spriteRepresentation = PropTypes.shape({
  xIndex: PropTypes.number,
  yIndex: PropTypes.number,
  sprite: PropTypes.shape({
    url: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
  }),
});

const imageRepresentation = {
  imagePath: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const representation = PropTypes.oneOfType([spriteRepresentation, imageRepresentation]);

const emoji = {
  shortcut: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  skinVariations: PropTypes.arrayOf(representation),
  representation,
};

const emojiService = {
  all: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  findByShortcut: PropTypes.func.isRequired,
};

export default {
  emojiPropType: emoji,
  emoji: PropTypes.shape(emoji),
  emojiServicePropType: emojiService,
  emojiService: PropTypes.shape(emojiService),
};

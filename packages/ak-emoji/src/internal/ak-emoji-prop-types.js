import { PropTypes } from 'react';

const spriteRepresentation = PropTypes.shape({
  xIndex: PropTypes.number,
  yIndex: PropTypes.number,
  sprite: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
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

export default {
  emojiPropType: emoji,
  emoji: PropTypes.shape(emoji),
};

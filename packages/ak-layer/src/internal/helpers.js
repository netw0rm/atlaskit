const positionMap = {
  'top left': { position: 'top-start', animation: 'top' },
  'top center': { position: 'top', animation: 'top' },
  'top right': { position: 'top-end', animation: 'top' },
  'right top': { position: 'right-start', animation: 'right' },
  'right middle': { position: 'right', animation: 'right' },
  'right bottom': { position: 'right-end', animation: 'right' },
  'bottom left': { position: 'bottom-start', animation: 'bottom' },
  'bottom center': { position: 'bottom', animation: 'bottom' },
  'bottom right': { position: 'bottom-end', animation: 'bottom' },
  'left top': { position: 'left-start', animation: 'left' },
  'left middle': { position: 'left', animation: 'left' },
  'left bottom': { position: 'left-end', animation: 'left' },
};

export const POSITION_ATTRIBUTE_ENUM = {
  attribute: 'position',
  values: [
    'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
    'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
  ],
  missingDefault: 'right middle',
  invalidDefault: 'right middle',
};

export const CONSTRAIN_ATTRIBUTE_ENUM = {
  attribute: 'constrain',
  values: [
    'window', 'scrollParent',
  ],
  missingDefault: 'window',
  invalidDefault: 'window',
};

function positionPropToPopperPosition(position) {
  return positionMap[position].position;
}

export {
  positionPropToPopperPosition,
};

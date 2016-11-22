// https://github.com/babel/babel/issues/892
import 'core-js/fn/array/find';
import Popper from 'popper.js';

import { flippedSymbol } from './symbols';
import Alignment from './Alignment';

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

function popperPositionToAlignmentPosition(position) {
  const alignmentPosition = Object.keys(positionMap)
    .find(positionKey => positionMap[positionKey].position === position);

  return alignmentPosition;
}

// creates a new Popper instance from the reference to an AKLayer
function createNewPopper(LayerRef) {
  // we disable the applyStyle modifier so that popper does not manipulate the DOM
  return new Popper(LayerRef.targetRef, LayerRef.contentRef, {
    placement: positionPropToPopperPosition(LayerRef.props.position),
    modifiers: { applyStyle: { enabled: false } },
  })
  .onCreate(popperState => LayerRef.setState({ popperState }))
  .onUpdate(popperState => LayerRef.setState({ popperState }));
}

function handlePopperUpdate(elem, data) {
  // data.flipped is not always set, so we cast it to a boolean.
  elem[flippedSymbol] = !!data.flipped;

  if (elem.onUpdate) {
    // we don't want to expose implementation details of popperjs, so we pull out the things we want
    const dataToPass = {
      isFlipped: elem[flippedSymbol],
      originalPosition: popperPositionToAlignmentPosition(data.originalPlacement),
      actualPostion: popperPositionToAlignmentPosition(data.placement),
    };
    elem.onUpdate(dataToPass);
  }
}

function createNewAlignment(props) {
  const options = {
    elem: props.children,
    target: props.target,
    position: props.position,
    enableFlip: props.enableFlip,
    offset: props.offset,
  };

  if (props.boundariesElement) {
    options.boundariesElement = props.boundariesElement;
  }

  return new Alignment(options);
}

function reCreateAlignmentIfNeeded(elem, data) {
  if (elem.alignment) {
    if (data.newValue !== data.oldValue) {
      elem.alignment.destroy();
      elem.alignment = createNewAlignment(elem);
    } else {
      elem.alignment.reposition();
    }
  }
}

export {
  handlePopperUpdate,
  createNewAlignment,
  reCreateAlignmentIfNeeded,
  positionPropToPopperPosition,
  createNewPopper,
};

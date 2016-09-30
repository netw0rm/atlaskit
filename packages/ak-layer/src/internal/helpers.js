import Alignment from './Alignment';
// https://github.com/babel/babel/issues/892
import 'babel-runtime/core-js/array/find';

function popperPositionToAlignmentPosition(position) {
  const positionMap = Alignment.attachmentMap;
  const alignmentPosition = Object.keys(positionMap)
    .find(positionKey => positionMap[positionKey].position === position);

  return alignmentPosition;
}

function handlePopperUpdate(elem, data) {
  // data.flipped is not always set, so we cast it to a boolean.
  elem._isFlipped = !!data.flipped; // eslint-disable-line no-underscore-dangle

  if (elem.onUpdate) {
    // we don't want to expose implementation details of popperjs, so we pull out the things we want
    const dataToPass = {
      isFlipped: elem._isFlipped, // eslint-disable-line no-underscore-dangle
      originalPosition: popperPositionToAlignmentPosition(data.originalPlacement),
      actualPostion: popperPositionToAlignmentPosition(data.placement),
    };
    elem.onUpdate(dataToPass);
  }
}

function createNewAlignment(elem) {
  const options = {
    elem: elem.positionedDOM,
    target: elem.target,
    position: elem.position,
    enableFlip: elem.enableFlip,
    offset: elem.offset,
    onUpdate: (data) => handlePopperUpdate(elem, data),
  };

  if (elem.boundariesElement) {
    options.boundariesElement = elem.boundariesElement;
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
};

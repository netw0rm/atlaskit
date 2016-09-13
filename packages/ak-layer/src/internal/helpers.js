import Alignment from './Alignment';

function handlePopperUpdate(elem, data) {
  // data.flipped is not always set, so we cast it to a boolean.
  elem._isFlipped = !!data.flipped; // eslint-disable-line no-underscore-dangle
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

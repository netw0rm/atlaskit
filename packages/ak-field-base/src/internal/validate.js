import {
  inputSlot,
  validatorSlot,
  errorDialog,
  hasError,
} from './symbols';

function getValidators(elem) {
  const nodes = elem[validatorSlot] ? elem[validatorSlot].assignedNodes() : [];
  return nodes.filter(el => el.validate);
}

function getInput(elem) {
  if (!elem || !elem[inputSlot]) {
    return null;
  }
  return elem[inputSlot].assignedNodes()[0];
}

function getInputValue(elem) {
  const input = getInput(elem);
  return input ? input.value : null;
}

function validate(elem) {
  const value = getInputValue(elem);
  let inputValid = true;

  if (value) {
    getValidators(elem).forEach((validator) => {
      if (!validator.validate(value)) {
        inputValid = false;
      }
    });
  }

  elem.invalid = elem[hasError] = !inputValid;
  elem[errorDialog].reposition();
}

export default validate;

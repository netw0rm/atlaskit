import { inputSlot, validatorSlot } from './symbols';

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

function validate(value, validators = []) {
  let inputValid = true;
  validators.forEach((validator) => {
    if (!validator.validate(value)) {
      inputValid = false;
    }
  });
  return inputValid;
}

export {
  getInputValue,
  getValidators,
  validate,
};

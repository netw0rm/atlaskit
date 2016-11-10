import { define } from 'skatejs';
import { ValidatorBase } from 'ak-field-validator';

const createDefinition = dom => ({
  render() {
    return dom;
  },
});

// Creates a light DOM input, slots it into a components input-slot slot and returns the reference
// to the input
const insertLightDomInput = (component) => {
  const inputChild = document.createElement('input');
  inputChild.type = 'text';
  inputChild.slot = 'input-slot';
  component.appendChild(inputChild);

  return inputChild;
};

const defineTestValidator = (tagName, cb) => (
  define(tagName, class extends ValidatorBase {
    validatorFunction(value) {  // eslint-disable-line class-methods-use-this
      return cb(value);
    }
  })
);

const insertValidator = (component, validator) => {
  validator.slot = 'validator-slot';
  component.appendChild(validator);

  return validator;
};

export { createDefinition, insertLightDomInput, defineTestValidator, insertValidator };

// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import AkField from '../src';
import AkFieldText from 'ak-field-text';
import { SuccessIcon, ErrorIcon } from 'ak-icon';

function setupComponent(component) {
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

function generateAkField(opts = {}) {
  const akField = new AkField();

  const akTextField = new AkFieldText();
  akTextField.setAttribute('slot', 'input');
  akField.appendChild(akTextField);

  opts.validators && opts.validators.forEach((validatorOpt) => {
    const validator = new validatorOpt.constructor();
    validator.setAttribute('slot', 'validator');
    const props = validatorOpt.props || {};
    Object.keys(props).forEach((key) => {
      validator[key] = props[key];
    });
    akField.appendChild(validator);
  });

  return akField;
}

function getIconEl(elem) {
  const children = getShadowRoot(elem).children[1].children[1].children;
  return (children && children.length) ? children[0] : null;
}

function hasErrorIcon(elem) {
  const iconEl = getIconEl(elem);
  return iconEl instanceof ErrorIcon;
}

function hasSuccessIcon(elem) {
  const iconEl = getIconEl(elem);
  return iconEl instanceof SuccessIcon;
}

function getInputField(elem) {
  return elem.querySelector('[slot=input]');
}

export {
  setupComponent,
  tearDownComponent,
  generateAkField,
  hasErrorIcon,
  hasSuccessIcon,
  getInputField,
};

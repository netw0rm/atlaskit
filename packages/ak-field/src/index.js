import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

import { events } from 'ak-field-text';
const { focus, blur } = events;
import InlineDialog from 'ak-inline-dialog';

const inputSlot = Symbol();
const validatorSlot = Symbol();
const helpDialog = Symbol();

// Props
const errors = Symbol('errors');
const helpOpen = Symbol('helpOpen');

function getValidators(elem) {
  return elem[validatorSlot].assignedNodes().filter(el => el.validate);
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
  const foundErrors = [];
  const value = getInputValue(elem);

  if (value) {
    getValidators(elem).forEach((validator) => {
      if (!validator.validate(value)) {
        foundErrors.push(validator.message);
      }
    });
  }

  return foundErrors;
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Field
 * @example @js import Field from 'ak-field';
 * const component = new Field();
 */
export default define('ak-field', {
  created(elem) {
    // Listen for changes to the input, and then validate everything
    elem.addEventListener('input', () => (elem[errors] = validate(elem)));
    elem.addEventListener('change', () => (elem[errors] = validate(elem)));

    elem.addEventListener(focus, () => {
      elem[errors] = validate(elem);
      elem[helpOpen] = true;
    });
    elem.addEventListener(blur, () => (elem[helpOpen] = false));
  },
  render(elem) {
    return ([
      <style>{shadowStyles.toString()}</style>,
      <slot
        name="validator"
        ref={el => (elem[validatorSlot] = el)}
      />,
      <div>
        <div className={shadowStyles.locals.contentSlot}>
          <slot
            name="input"
            ref={el => (elem[inputSlot] = el)}
            onSlotchange={() => (elem[helpDialog].target = elem.querySelector('input'))}
          />
        </div>
        <div className={shadowStyles.locals.rightSlot}></div>
        <InlineDialog
          open={elem[helpOpen] && elem[errors].length}
          hasBlanket={false}
          padding="3px"
          position="right middle"
          ref={el => (elem[helpDialog] = el)}
        >
          <ul class={shadowStyles.locals.errorList}>
            {elem[errors] && elem[errors].map(msg =>
              <li>{msg}</li>
            )}
          </ul>
        </InlineDialog>
      </div>,
    ]);
  },
  props: {
    [helpOpen]: prop.boolean({}),
    [errors]: prop.array({}),
  },
});

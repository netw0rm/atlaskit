import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

import { events } from 'ak-text-field';
const { focus, blur } = events;
import InlineDialog from 'ak-inline-dialog';
import * as icons from 'ak-icon';
const { QuestionIcon } = icons;

const inputSlot = Symbol();
const validatorSlot = Symbol();
const helpIcon = Symbol();
const helpDialog = Symbol();

// Props
const errors = Symbol();
const helpOpen = Symbol();


function getValidators(elem) {
  return elem[validatorSlot].assignedNodes().filter(el => el.validate);
}

function getInputValue(elem) {
  if (!elem || !elem[inputSlot]) {
    return null;
  }
  return elem[inputSlot].assignedNodes()[0].value;
}

function validate(elem) {
  const foundErrors = [];
  const value = getInputValue(elem);

  getValidators(elem).forEach((validator) => {
    if (!validator.validate(value)) {
      foundErrors.push(validator.message);
    }
  });

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
    elem.addEventListener(focus, () => (elem[helpOpen] = true));
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
          />
        </div>
        <div className={shadowStyles.locals.rightSlot}>
          <QuestionIcon
            ref={el => (elem[helpIcon] = el)}
            onClick={() => (elem[helpOpen] = !elem[helpOpen])}
          />
        </div>
      </div>,
      <InlineDialog
        open={elem[helpOpen]}
        position="right middle"
        hasBlanket={false}
        ref={el => {
          elem[helpDialog] = el;
          el.target = elem[helpIcon];
        }}
      >
        <ul>
          {elem[errors].map(msg =>
            <li>{msg}</li>
          )}
        </ul>
      </InlineDialog>,
    ]);
  },
  props: {
    helpIcon: prop.boolean({ attribute: true }),
    [helpOpen]: prop.boolean({}),
    [errors]: prop.array({}),
  },
});

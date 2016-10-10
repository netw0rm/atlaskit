import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

import { events } from 'ak-field-text';
const { focus, blur } = events;
import InlineDialog from 'ak-inline-dialog';
import { SuccessIcon, ErrorIcon } from 'ak-icon';

const inputSlot = Symbol();
const validatorSlot = Symbol();
const helpDialog = Symbol();
const dialogTarget = Symbol();

// Props
const errors = Symbol('errors');
const helpOpen = Symbol('helpOpen');

const dialogBorderColor = '#D93A35'; // R400

function getValidators(elem) {
  const nodes = elem[validatorSlot] && elem[validatorSlot].assignedNodes();
  return nodes ? nodes.filter(el => el.validate) : null;
}

function hasValidators(elem) {
  return !!getValidators(elem);
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
  let hasError = false;

  if (value) {
    getValidators(elem).forEach((validator) => {
      if (!validator.validate(value)) {
        hasError = true;
      }
    });
  }

  return hasError;
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
      <div>
        <div className={shadowStyles.locals.contentSlot}>
          <slot
            name="input"
            ref={el => (elem[inputSlot] = el)}
          />
        </div>
        <div className={shadowStyles.locals.rightSlot}>
          {(() => {
            // Use an IIFE here to ensure that the icon is rendered in the correct place.
            if (getInputValue(elem) && hasValidators(elem)) {
              return elem[errors] ?
                <ErrorIcon
                  class={shadowStyles.locals.errorIcon}
                  ref={el => (elem[dialogTarget] = el)}
                />
              :
                <SuccessIcon
                  class={shadowStyles.locals.successIcon}
                  ref={el => (elem[dialogTarget] = el)}
                />;
            }
            return null;
          })()}
        </div>
        <InlineDialog
          borderColor={dialogBorderColor}
          open={elem[helpOpen] && elem[errors]}
          hasBlanket={false}
          padding="3px"
          position="right middle"
          ref={el => {
            elem[helpDialog] = el;
            el.target = elem[dialogTarget];
          }}
        >
          <ul class={shadowStyles.locals.errorList}>
            <slot
              class={shadowStyles.locals.validatorSlot}
              name="validator"
              ref={el => (elem[validatorSlot] = el)}
            />
          </ul>
        </InlineDialog>
      </div>,
    ]);
  },
  props: {
    [helpOpen]: prop.boolean({}),
    [errors]: prop.boolean({
      set(elem) {
        if (elem[helpOpen]) {
          elem[helpDialog].reposition();
        }
      },
    }),
  },
});

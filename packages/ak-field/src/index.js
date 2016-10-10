import 'style!./host.less';
import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';
import {
  inputSlot,
  validatorSlot,
  helpDialog,
  dialogTarget,
  errors,
  showIcon,
  helpOpen,
} from './internal/symbols';

import { events } from 'ak-field-text';
const { focus, blur } = events;
import InlineDialog from 'ak-inline-dialog';
import { SuccessIcon, ErrorIcon } from 'ak-icon';


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

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Field
 * @example @js import Field from 'ak-field';
 * const component = new Field();
 */
export default define('ak-field', {
  created(elem) {
    // Listen for changes to the input, and then validate everything
    elem.addEventListener('input', () => (elem.validate()));
    elem.addEventListener('change', () => (elem.validate()));

    elem.addEventListener(focus, () => {
      elem.validate();
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
            if (elem[showIcon]) {
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
    [showIcon]: prop.boolean({}),
  },
  prototype: {
    validate() {
      const value = getInputValue(this);
      let hasError = false;

      if (value) {
        getValidators(this).forEach((validator) => {
          if (!validator.validate(value)) {
            hasError = true;
          }
        });
      }

      this[errors] = hasError;
      this[showIcon] = getInputValue(this) && hasValidators(this);
    },
  },
});

import { vdom, define, emit, prop, Component } from 'skatejs';
import base from 'ak-component-base';

import Label from './Label';
import Root from './Root';
import Content from './Content';
import Dialog from './Dialog';
import shadowStyles from './shadow.less';

import { standard as standardAppearance } from './internal/appearance';
import { beforeFocusedChange, labelClick } from './internal/events';
import safeProps from './internal/safeProps';
import {
  inputSlot,
  validatorSlot,
  inputWrapper,
  errorDialog,
  hasError,
} from './internal/symbols';
import {
  getInputValue,
  getValidators,
  validate,
} from './internal/validate';


// need to inject Component and prop to create the base Component;
const Base = base({ Component, prop });

// we use this so that we can pass a function down to Content so that it can update the
// [focused] prop.
function setFocused(elem, focus) {
  safeProps(elem, { focused: focus });
}

function performValidation(elem) {
  const valid = validate(getInputValue(elem), getValidators(elem));
  elem.invalid = elem[hasError] = !valid;
  elem[errorDialog].reposition(); // Ensure that the dialog is correctly positioned.
}

function getValidationEventHandlers(elem) {
  // Strip out focus and blur, as they are special cases
  const events = elem.validateOn.filter(e => (e !== 'focus' && e !== 'blur'));
  return events.reduce((val, next) => {
    val[`on-${next}`] = () => (performValidation(elem));
    return val;
  }, {});
}

function emitLabelClickEvent(elem) {
  return () => (emit(elem, labelClick));
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @extends ComponentBase
 * @example @html <ak-field-base label="Email" />
 * @example @js import FieldBase from 'ak-field-base';
 *
 * const field = new FieldBase();
 * field.label = 'Email';
 * document.body.appendChild(field);
 */
export default define('ak-field-base', Base.extend({
  render(elem) {
    const validateOnFocus = elem.validateOn.indexOf('focus') > -1;
    const validateOnBlur = elem.validateOn.indexOf('blur') > -1;
    const validationEventHandlers = getValidationEventHandlers(elem);
    return ([
      <Root>
        <Label
          label={elem.label}
          hideLabel={elem.hideLabel}
          required={elem.required}
          onLabelClick={emitLabelClickEvent(elem)}
        >
          <Content
            appearance={elem.appearance}
            focused={elem.focused}
            disabled={elem.disabled}
            invalid={elem.invalid}
            ref={el => (elem[inputWrapper] = el)}
            onFocus={() => {
              setFocused(elem, true);
              if (validateOnFocus) {
                performValidation(elem);
              }
            }}
            onBlur={() => {
              setFocused(elem, false);
              if (validateOnBlur) {
                performValidation(elem);
              }
            }}
            eventHandlers={validationEventHandlers}
          >
            <slot
              name="input-slot"
              ref={el => (elem[inputSlot] = el)}
            />
          </Content>
        </Label>
        <Dialog
          open={elem[hasError]}
          ref={(el) => {
            elem[errorDialog] = el;
            el.target = elem[inputWrapper];
          }}
        >
          <slot
            className={shadowStyles.locals.validatorSlot}
            name="validator-slot"
            ref={el => (elem[validatorSlot] = el)}
          />
        </Dialog>
      </Root>,
    ]);
  },
  props: Object.assign({}, {
    /**
     * @description The appearance of the field.
     *
     * Valid values for this property are: 'standard' (default), 'compact' and 'subtle'.
     *
     * Compact will make the field have less padding and subtle will remove the background/border
     * until a user hovers over it.
     * @memberof FieldBase
     * @instance
     * @type {string}
     * @default standard
     * @example @html <ak-field-base appearance="compact"></ak-field-base>
     * @example @js field.appearance = 'compact';
     */
    appearance: prop.string({
      attribute: true,
      default: standardAppearance,
    }),
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
    /**
     * @description Whether the field should show a label above it.
     *
     * If set to true no label will be shown and no space will be reserved for it.
     *
     * **Note**: You must still provide a label for the component regardless of this prop.
     * The label is also used to make the field accessible to screen readers.
     *
     * Defaults to false.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @example @html <ak-field-base label="First Name" hideLabel></ak-field-base>
     * @example @js field.label = 'First Name';
     * field.hideLabel = true;
     */
    hideLabel: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a red border currently but will also include error messages
     * in a future release.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base invalid></ak-field-base>
     * @example @js field.invalid = true;
     */
    invalid: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show it's focused styles.
     *
     * By default, this component will automatically add and remove this prop if itself or any child
     * of it receives focus or blur events. You can override this behaviour by using the override
     * prop.
     *
     * See [Override behaviour](#override-behaviour) for more information.
     *
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base focused></ak-field-base>
     * @example @js field.focused = true;
     */
    focused: prop.boolean(),
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base label="First Name" required"></ak-field-base>
     * @example @js field.required = true;
     */
    required: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field is disabled.
     *
     * This is shown to the user through a disabled cursor icon when hovering over the field.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base disabled></ak-field-base>
     * @example @js field.disabled = true;
     */
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description A list of events which should trigger validation on the field.
     *
     * You may supply an array of strings containing the event names for events that should trigger
     * validation on the field. Alternatively, you may supply the event names as space-separated
     * values in the matching attribute.
     *
     * **Note**: You may also bind validation to custom events. In this case, ensure that your
     * custom event bubbles, and that it is dispatched from the internal input element, e.g.:
     * ```js
     * const myCustomEvent = new CustomEvent('my-custom-event', { bubbles: true });
     * field.validateOn = ['my-custom-event'];
     * field.querySelector('input').dispatchEvent(myCustomEvent);
     * ```
     * @memberof FieldBase
     * @instance
     * @type {string[]}
     * @default false
     * @example @html <ak-field-base validate-on="input blur"></ak-field-base>
     * @example @js field.validateOn = ['input', 'blur'];
     */
    validateOn: {
      attribute: true,
      coerce: val => (Array.isArray(val) ? val : [val]),
      default: ['blur'],
      deserialize: val => val.split(' '),
      serialize: val => val.join(' '),
    },
  }, Base.props),
}));

export const events = { beforeFocusedChange, labelClick };

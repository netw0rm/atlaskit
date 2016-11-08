import { vdom, define, prop, props } from 'skatejs';
import { akColorR400 } from 'akutil-shared-styles';
import Label from './Label';
import Root from './Root';
import Content from './Content';
import ValidatorDialog from './ValidatorDialog';
import shadowStyles from './shadow.less';
import { focused } from './internal/symbols';
import { standard as standardAppearance } from './internal/appearance';

const inputSlot = Symbol('inputSlot');
const validatorSlot = Symbol('validatorSlot');
const inputWrapper = Symbol('inputWrapper');
const hasError = Symbol('hasError');

// we use this so that we can pass a function down to Content so that it can update the
// [focused] prop.
function setFocused(elem, focus) {
  props(elem, { [focused]: focus });
}

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

// TODO: Ensure that dialog repositions correctly when the number of valid validators changes.
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
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @example @html <ak-field-base label="Email" />
 * @example @js import FieldBase from 'ak-field-base';
 *
 * const field = new FieldBase();
 * field.label = 'Email';
 * document.body.appendChild(field);
 */
export default define('ak-field-base', {
  render(elem) {
    return ([
      <Root>
        <Label
          label={elem.label}
          hideLabel={elem.hideLabel}
          required={elem.required}
        >
          <Content
            appearance={elem.appearance}
            focused={elem[focused]}
            disabled={elem.disabled}
            invalid={elem.invalid}
            ref={el => (elem[inputWrapper] = el)}
            onInput={() => (elem.validate())}
            onFocus={() => {
              elem.validate();
              setFocused(elem, true);
            }}
            onBlur={() => {
              elem.validate();
              setFocused(elem, false);
            }}
          >
            <slot
              name="input-slot"
              ref={el => (elem[inputSlot] = el)}
            />
          </Content>
        </Label>
        <ValidatorDialog
          border-color={akColorR400}
          hasBlanket={false}
          open={elem[hasError]}
          padding="3px"
          position="right middle"
          ref={el => (el.target = elem[inputWrapper])}
        >
          <slot
            className={shadowStyles.locals.validatorSlot}
            name="validator-slot"
            ref={el => (elem[validatorSlot] = el)}
          />
        </ValidatorDialog>
      </Root>,
    ]);
  },
  props: {
    /**
     * @description The appearance of the field.
     *
     * Valid values for this property are: 'standard' (default), 'compact'.
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
    [focused]: prop.boolean(),
  },
  prototype: {
    validate() {
      validate(this);
    },
  },
});

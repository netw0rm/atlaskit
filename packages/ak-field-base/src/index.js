import { vdom, define, prop, props } from 'skatejs';
import Label from './Label';
import Root from './Root';
import Content from './Content';
import { focused } from './internal/symbols';

// we use this so that we can pass a function down to Content so that it can update the
// [focused] prop.
function setFocused(elem, focus) {
  props(elem, { [focused]: focus });
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
    return (
      <Root>
        <Label
          label={elem.label}
          hideLabel={elem.hideLabel}
          required={elem.required}
        >
          <Content
            setFocused={focus => setFocused(elem, focus)}
            focused={elem[focused]}
            invalid={elem.invalid}
          />
        </Label>
      </Root>
    );
  },
  props: {
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
     * @example @html <ak-field-base invalid></ak-field-base>
     * @example @js field.invalid = true;
     */
    invalid: prop.boolean({ attribute: true }),
    [focused]: prop.boolean(),
    /**
     * @description Whether or not the field is required.
     *
     * If set to true, an asterisk will be appended to the label text.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @default false
     * @example @html <ak-field-base label="First Name" required"></ak-field-base>
     */
    required: prop.boolean({ attribute: true }),
  },
});

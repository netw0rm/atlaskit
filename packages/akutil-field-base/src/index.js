import { vdom, define, prop, props, emit } from 'skatejs';
import 'style!./host.less';
// import shadowStyles from './shadow.less';
import { showEditingView, showViewingView } from './internal/events';
import Editing from './Editing';
import Viewing from './Viewing';
import Label from './Label';
import Root from './Root';


/* By default, ak-field-base will display the view mode, that is to say, the content in its
   default slot.  */

function switchToEditing(elem) {
  if (!elem.editing) {
    props(elem, { editing: true });

    emit(elem, showEditingView, {
      bubbles: true,
      cancelable: true,
    });
  }
}

function handleEditConfirmation(elem) {
  emit(elem, showViewingView, {
    bubbles: true,
    cancelable: true,
    detail: {
      canceled: false,
    },
  });
  props(elem, { editing: false });
}

function handleEditCancel(elem) {
  emit(elem, showViewingView, {
    bubbles: true,
    cancelable: true,
    detail: {
      canceled: true,
    },
  });
  props(elem, { editing: false });
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class FieldBase
 * @fires FieldBase#cancelEditPressed
 * @fires FieldBase#confirmEditPressed
 * @example @html <ak-field-base label="Email" />
 * @example @js import FieldBase from 'akutil-field-base';
 *
 * const field = new FieldBase();
 * field.label = 'Email';
 * document.body.appendChild(field);
 */
export default define('ak-field-base', {
  render(elem) {
    const ViewingView = !elem.editing ? Viewing : () => null;
    const EditingView = elem.editing ? Editing : () => null;

    return (
      <Root>
        <Label
          label={elem.label}
          switchToEditingCallback={() => switchToEditing(elem)}
          hideLabel={elem.hideLabel}
        >
          <ViewingView
            switchToEditingCallback={() => switchToEditing(elem)}
          />
        </Label>
        <EditingView
          focused={elem.focused}
          onConfirm={() => handleEditConfirmation(elem)}
          onCancel={() => handleEditCancel(elem)}
          waiting={elem.waiting}
          invalid={elem.invalid}
        />
      </Root>
    );
  },
  props: {
    /**
     * @description The label to be rendered above the form field. This props is still required,
     * even if the hideLabel prop is set as the label is also used to make the field accessible
     * for screen readers.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
     /**
     * @description Whether the editing mode or viewing mode should be shown.
     * Defaults to false.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @example @html <ak-field-base editing></ak-field-base>
     * @example @js field.editing = true;
     */
    editing: prop.boolean({ attribute: true }),
     /**
     * @description Whether the field should show it's focus ring. This would usually be controlled
     * by a component extending FieldBase and setting this when needed.
     * Defaults to false.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @example @html <ak-field-base focused></ak-field-base>
     * @example @js field.focused = true;
     */
    focused: prop.boolean({ attribute: true }),
    /**
     * @description Whether the field should show a label above it. If set to true no label will be
     * shown and no space will be reserved for it.
     *
     * **Note**: You must still provide a label for the component regardless of this prop. The label
     * is also used to make the field accessible to screen readers.
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
     * @description Whether or not to display a loading spinner next to the field. This is usually
     * used when you need to do some sort of async validation. Note that whilst the editing spinner
     * is visible a user will not be able to click the confirm or cancel buttons from edit mode.
     * The spinner is only shown when the editing prop is true and will be ignored otherwise.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @example @html <ak-field-base label="First Name" hideLabel></ak-field-base>
     * @example @js field.label = 'First Name';
     * field.hideLabel = true;
     */
    waiting: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show a validation error.
     * This is shown to the user through a red border currently but will also include error messages
     * in a future release.
     * This prop only applies to a field without the `dirty` prop set.
     * This prop is ignored if `editing` is not set to true.
     * @memberof FieldBase
     * @instance
     * @type {boolean}
     * @example @html <ak-field-base invalid></ak-field-base>
     * @example @js field.invalid = true;
     */
    invalid: prop.boolean({ attribute: true }),
  },
});

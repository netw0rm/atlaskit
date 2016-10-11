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
          onClick={() => switchToEditing(elem)}
        >
          <ViewingView
            switchToEditingCallback={() => switchToEditing(elem)}
          />
        </Label>
        <EditingView
          focused={elem.focused}
          onConfirm={() => handleEditConfirmation(elem)}
          onCancel={() => handleEditCancel(elem)}
        />
      </Root>
    );
  },
  props: {
    /**
     * @description The label to be rendered above the form field.
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
  },
});

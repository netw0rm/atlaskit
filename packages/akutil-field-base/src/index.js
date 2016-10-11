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
          focus={elem.focus}
          onConfirm={() => handleEditConfirmation(elem)}
          onCancel={() => handleEditCancel(elem)}
        />
      </Root>
    );
  },
  props: {
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof FieldBase
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
    editing: prop.boolean({ attribute: true }),
    focus: prop.boolean({ attribute: true }),
  },
});

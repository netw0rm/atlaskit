import { vdom, define, prop, props, emit } from 'skatejs';
import { exitViewingView, exitEditingView } from './internal/events';
import EditingView from './Editing';
import ViewingView from './Viewing';
import Root from './Root';

function switchToEditing(elem) {
  const cancelled = !emit(elem, exitViewingView, {
    bubbles: true,
    cancelable: true,
  });
  if (!cancelled) {
    props(elem, { editing: true });
  }
}

function switchToViewing(elem, cancelPressed) {
  const cancelled = !emit(elem, exitEditingView, {
    bubbles: true,
    cancelable: true,
    detail: {
      cancelButtonPressed: cancelPressed,
    },
  });
  if (!cancelled) {
    props(elem, { editing: false });
  }
}

// we use this so that we can pass a function down to the EditingView so that it can update the
// focus prop.
function setFocus(elem, focus) {
  props(elem, { focused: focus });
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class InlineEdit
 * @fires InlineEdit#exitViewingView
 * @fires InlineEdit#exitEditingView
 * @example @html <ak-inline-edit label="Email" />
 * @example @js import InlineEdit from 'ak-inline-edit';
 *
 * const field = new InlineEdit();
 * field.label = 'Email';
 * document.body.appendChild(field);
 */
export default define('ak-inline-edit', {
  render(elem) {
    const viewingViewHidden = elem.editing;
    const editingViewHidden = !elem.editing;

    return (
      <Root>
        <ViewingView
          switchToEditingCallback={() => switchToEditing(elem)}
          setFocus={focus => setFocus(elem, focus)}
          focused={elem.focused}
          hideViewing={viewingViewHidden}
          label={elem.label}
        />
        <EditingView
          focused={elem.focused}
          onConfirm={() => switchToViewing(elem, false)}
          onCancel={() => switchToViewing(elem, true)}
          waiting={elem.waiting}
          invalid={elem.invalid}
          hideEditing={editingViewHidden}
        />
      </Root>
    );
  },
  props: {
    /**
     * @description The label to be rendered above the form field.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     * @memberof InlineEdit
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
     /**
     * @description Whether the editing mode or viewing mode should be shown.
     *
     * Defaults to false.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit editing></ak-inline-edit>
     * @example @js field.editing = true;
     */
    editing: prop.boolean({ attribute: true }),
     /**
     * @description Whether the field should show it's focus ring.
     *
     * This would usually be controlled by a component extending InlineEdit and setting this when
     * needed.
     *
     * Defaults to false.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit focused></ak-inline-edit>
     * @example @js field.focused = true;
     */
    focused: prop.boolean({ attribute: true }),
    /**
     * @description Whether the field should show a label above it.
     *
     * If set to true no label will be shown and no space will be reserved for it.
     *
     * **Note**: You must still provide a label for the component regardless of this prop.
     * The label is also used to make the field accessible to screen readers.
     *
     * Defaults to false.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit label="First Name" hideLabel></ak-inline-edit>
     * @example @js field.label = 'First Name';
     * field.hideLabel = true;
     */
    hideLabel: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not to display a loading spinner next to the field.
     *
     * This is usually used when you need to do some sort of async validation.
     * Note that whilst the editing spinner is visible a user will not be able to click the confirm
     * or cancel buttons from edit mode.
     *
     * The spinner is only shown when the editing prop is true and will be ignored otherwise.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit editing waiting></ak-inline-edit>
     * @example @js field.editing = true;
     * field.waiting = true;
     */
    waiting: prop.boolean({ attribute: true }),
    /**
     * @description Whether or not a field should show a validation error.
     *
     * This is shown to the user through a red border currently but will also include error messages
     * in a future release.
     *
     * This prop is ignored if `editing` is not set to true.
     * @memberof InlineEdit
     * @instance
     * @type {boolean}
     * @example @html <ak-inline-edit editing invalid></ak-inline-edit>
     * @example @js field.invalid = true;
     */
    invalid: prop.boolean({ attribute: true }),
  },
});

export const events = {
  exitViewingView,
  exitEditingView,
};

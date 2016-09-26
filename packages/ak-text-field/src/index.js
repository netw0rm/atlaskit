import 'style!./host.less';
import { vdom, prop, define, props } from 'skatejs';
import shadowStyles from './shadow.less';

import Root from './Root';
import Label from './Label';
import Editing from './Editing';
import Viewing from './Viewing';

function switchToEditing(elem) {
  if (!elem.editing) {
    elem.editing = true;
  }
}

function switchToViewing(elem) {
  if (elem.editing) {
    const input = elem.querySelector(`[slot=${shadowStyles.locals.editModeSlot}]`);
    elem.editing = false;
    props(elem, {
      value: input.value,
    });
  }
}

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class TextField
 * @example @js import TextField from 'ak-text-field';
 * const component = new TextField();
 */
export default define('ak-text-field', {
  render(elem) {
    const isEditing = !elem.editable || (elem.editable && elem.editing);
    const isViewing = elem.editable && !elem.editing;
    const ViewingView = isViewing ? Viewing : () => null;
    const EditingView = isEditing ? Editing : () => null;

    return (
      <Root>
        <Label
          onClick={() => switchToEditing(elem)}
          className={shadowStyles.locals.label}
          label={elem.label}
        >
          <ViewingView
            value={elem.value}
            onClick={() => switchToEditing(elem)}
          />
          <EditingView
            value={elem.value}
            onBlur={elem.editable ? () => switchToViewing(elem) : null}
          />
        </Label>
      </Root>
    );
  },
  rendered(elem) {
    let input = elem.querySelector(`[slot=${shadowStyles.locals.editModeSlot}]`);
    if (!input) {
      input = document.createElement('input');
      input.slot = shadowStyles.locals.editModeSlot;
      input.type = 'text';
      input.placeholder = 'placeholder';
      input.addEventListener('blur', () => (switchToViewing(elem)), true);

      elem.appendChild(input);
    }

    if (elem.editable && elem.editing) {
      input.focus();
    }
  },
  props: {
    /**
     * @description The label to be rendered next to the supplied text input.
     * @memberof TextField
     * @instance
     * @type {string}
     */
    label: prop.string({ attribute: true }),
    editing: prop.boolean(),
    editable: prop.boolean(),
    value: prop.string(),
  },
});

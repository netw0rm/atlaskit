import 'style!./host.less';
import { vdom, define, prop, props } from 'skatejs';
import FieldBase from './FieldBase';
import Editing from './Editing';
import Viewing from './Viewing';

/* By default, ak-field-base will display the view mode, that is to say, the content in its
   default slot.  */

function switchToEditing(elem) {
  if (!elem.editing) {
    props(elem, { editing: true });
  }
}


export default define('ak-field-editable', {
  render(elem) {
    const ViewingView = !elem.editing ? Viewing : () => null;
    const EditingView = elem.editing ? Editing : () => null;

    return (
      <FieldBase label={elem.label}>
        <ViewingView
          onClick={() => switchToEditing(elem)}
        />
        <EditingView />
      </FieldBase>
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
  },
});

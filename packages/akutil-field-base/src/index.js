import { vdom, define, prop, props } from 'skatejs';
import 'style!./host.less';
// import shadowStyles from './shadow.less';
import Editing from './Editing';
import Viewing from './Viewing';
import Label from './Label';
import Root from './Root';

/* By default, ak-field-base will display the view mode, that is to say, the content in its
   default slot.  */

function switchToEditing(elem) {
  if (!elem.editing) {
    props(elem, { editing: true });
  }
}

function switchToViewing(elem) {
  // console.log(`Switchign to viewing`);
  props(elem, { editing: false });
}


export default define('ak-field-base', {
  render(elem) {
    const ViewingView = !elem.editing ? Viewing : () => null;
    const EditingView = elem.editing ? Editing : () => null;

    return (
      <Root>
        <Label label={elem.label}>
          <ViewingView
            onClick={() => switchToEditing(elem)}
          />
          <EditingView
            onBlur={() => switchToViewing(elem)}
          />
        </Label>
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
  },
});

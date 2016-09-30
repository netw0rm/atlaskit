import { vdom, define, prop } from 'skatejs';
import FieldBaseEditable from '../../src/FieldBaseEditable';

/* This is an example of how to extend FieldBaseEditable. We are creating the simple text field  */

export default define('ak-textfield', {
  render(elem) {
    return (
      <FieldBaseEditable label={elem.label}>
        <div is="" slot="viewmode">
          <b>{elem.value}</b>
        </div>
        <div is="" slot="editmode">
          <input type="text" defaultValue={elem.value} />
        </div>
      </FieldBaseEditable>
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
    value: prop.string({ attribute: true }),
  },
});

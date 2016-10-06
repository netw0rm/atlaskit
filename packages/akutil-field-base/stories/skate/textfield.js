import { vdom, define, prop } from 'skatejs';
import FieldBase from '../../src/';

/* This is an example of how to extend FieldBase. We are creating the simple text field  */

export default define('ak-textfield', {
  render(elem) {
    return (
      <FieldBase label={elem.label}>
        <div is="" slot="viewmode">
          <b>{elem.value}</b>
        </div>
        <div is="" slot="editmode">
          <input type="text" defaultValue={elem.value} />
        </div>
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
    editable: prop.boolean({ attribute: true }),
    value: prop.string({ attribute: true }),
  },
});

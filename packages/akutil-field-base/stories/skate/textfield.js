import { vdom, define, prop, props } from 'skatejs';
import FieldBase from '../../src/';
import { showEditingView, showViewingView } from '../../src/internal/events';

function handleEditingViewSwitch(elem) {
  if (elem.inputField) {
    elem.inputField.focus();
    elem.inputField.setSelectionRange(0, elem.inputField.value.length || 0);
  }
}

function handleViewingViewSwitch(elem, e) {
  if (e.detail.canceled) {
    // if the event was cancelled, we'll put the old value back in the field
    elem.inputField.value = elem.value;
  } else {
    // otherwise, reflect the value into our component, ready for viewmode
    props(elem, { value: elem.inputField.value });
  }
}


/* This is an example of how to extend FieldBase. We are creating the simple text field  */
export default define('ak-textfield', {
  render(elem) {
    const inputStyles = {
      border: '0px',
      fontSize: '14px',
      outline: 0,
    };
    return (
      <div>
        <style>
          {`
            input {
              background-color: #f7f8f9;
            }
            input:focus {
              background-color: white;
            }
          `}
        </style>
        <FieldBase label={elem.label}>
          <div is="" slot="viewmode">
            {elem.value}
          </div>
          <div is="" slot="editmode">
            <input
              type="text"
              defaultValue={elem.value}
              style={inputStyles}
              ref={ref => (elem.inputField = ref)}
            />
          </div>
        </FieldBase>
      </div>
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
    onConfirm: {},
  },
  attached(elem) {
    elem.addEventListener(showEditingView, (e) => handleEditingViewSwitch(elem, e));
    elem.addEventListener(showViewingView, (e) => handleViewingViewSwitch(elem, e));
  },
});

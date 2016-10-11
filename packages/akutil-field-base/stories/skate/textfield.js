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
    return (
      <div>
        <FieldBase label={elem.label}>
          <div is="" slot="viewmode">
            {elem.value}
          </div>
          <div is="" slot="editmode">
            <slot />
          </div>
        </FieldBase>
      </div>
    );
  },
  props: {
    label: prop.string({ attribute: true }),
    editing: prop.boolean({ attribute: true }),
    editable: prop.boolean({ attribute: true }),
    value: prop.string({
      attribute: true,
      set(elem, data) {
        if (data.newValue !== data.oldValue) {
          elem.inputField.value = data.newValue;
        }
      },
    }),
  },
  rendered(elem) {
    // This logic needs to live in rendered so that the input field is inserted as lightDOM
    // and can be picked up by forms, pw managers, etc
    if (!elem.inputField) {
      const inputStyles = `
        input {
          background-color: #f7f8f9;
          border: 0px;
          font-size: 14px;
          outline: 0;
        }
        input:focus {
          background-color: white;
        }
      `;
      const styleTag = document.createElement('style');
      const inputField = document.createElement('input');
      styleTag.innerHTML = inputStyles;
      inputField.type = 'text';
      inputField.value = elem.value;
      elem.inputField = inputField;
      elem.appendChild(styleTag);
      elem.appendChild(inputField);
    }
  },
  attached(elem) {
    elem.addEventListener(showEditingView, (e) => handleEditingViewSwitch(elem, e));
    elem.addEventListener(showViewingView, (e) => handleViewingViewSwitch(elem, e));
  },
});

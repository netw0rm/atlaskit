import { vdom, define, prop, props } from 'skatejs';
import FieldBase from '../../src/';
import { exitViewingView, exitEditingView } from '../../src/internal/events';

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

function handleInputFocus(elem) {
  props(elem.fieldBase, { focused: true });
}

function handleInputBlur(elem) {
  props(elem.fieldBase, { focused: false });
}

/* This is an example of how to extend FieldBase. We are creating the simple text field  */
export default define('x-editable-field', {
  render(elem) {
    return (
      <div>
        <FieldBase label={elem.label} ref={ref => (elem.fieldBase = ref)} editing={elem.editing}>
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
    value: prop.string({
      attribute: true,
      set(elem, data) {
        if (data.newValue !== data.oldValue) {
          // we have to do this check because React-wrapped components using the polyfill will
          // have their props set *before* render/rendered are called
          if (elem.inputField) {
            elem.inputField.value = data.newValue;
          }
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
          background: transparent;
          border: 0px;
          font-size: 14px;
          outline: 0;
          width: 100%;
        }
      `;
      const styleTag = document.createElement('style');
      const inputField = document.createElement('input');
      styleTag.innerHTML = inputStyles;

      inputField.type = 'text';
      inputField.value = elem.value;
      inputField.addEventListener('focus', e => handleInputFocus(elem, e));
      inputField.addEventListener('blur', e => handleInputBlur(elem, e));

      elem.inputField = inputField;
      elem.appendChild(styleTag);
      elem.appendChild(inputField);
    }
  },
  attached(elem) {
    elem.addEventListener(exitViewingView, e => handleEditingViewSwitch(elem, e));
    elem.addEventListener(exitEditingView, e => handleViewingViewSwitch(elem, e));
  },
});

# FieldBase

This component contains all the common behaviour of fields across Atlaskit. Sizing, labels, hover states, inline-editablability, etc.
FieldBase's *will* work by themselves but are really meant to be extended into a full `ak-field-X` component.

## Try it out

Interact with a [live demo of the akutil-field-base component](https://aui-cdn.atlassian.com/atlaskit/stories/akutil-field-base/@VERSION@/).

## Installation

```sh
npm install akutil-field-base
```

## Using the component

As stated above, although this component is consumable by itself, it is a lot more useful to extend it.
FieldBase is library agnostic and you can extend it any way you like.

To extend FieldBase you should:
* Pass a `label` prop to FieldBase (probably from your components own props).
* Pass an `editing` prop to FieldBase (probably from your components own props).
* Pass in two children with the appropriate slotnames (`editmode` and `viewmode` respectively).
* Add and remove the `focused` prop of FieldBase where appropriate.
* Respond to the `cancelEditPressed` and `confirmEditPressed` events fired from FieldBase appropriately.

We'll look at two such ways of doing this below using [Skatejs](https://github.com/skatejs/skatejs) and [React](https://facebook.github.io/react/).

### Skatejs

This is a very simple `text-field` component that extends `FieldBase` using composition.

```javascript
import { vdom, define, prop, props } from 'skatejs';
import FieldBase, { events } from 'akutil-field-base';

const { showEditingView, showViewingView } = events;

// when switching to editing view, focus on our input field.
function handleEditingViewSwitch(elem) {
  if (elem.inputField) {
    elem.inputField.focus();
  }
}

// when switching to the viewing view, we'll check if we are switching because of a cancel event or not
// if we are, just do nothing, otherwise we'll set our value prop to the value of the input field
function handleViewingViewSwitch(elem, e) {
  if (!e.detail.canceled) {
    props(elem, { value: elem.inputField.value });
  }
}

// we have disabled the focus styles on the input element, for that reason, we need to pass the focused
// prop down to FieldBase
function handleInputFocus(elem) {
  props(elem.fieldBase, { focused: true });
}

// and then remove it if the text field is blurred.
function handleInputBlur(elem) {
  props(elem.fieldBase, { focused: false });
}

export default define('simple-textfield', {
  render(elem) {
    // we use null instead of false so that when we pass it as an attribute to FieldBase it doesnt
    // get rendered as editing=""
    const isEditing = elem.editing || null;
    return (
      <div>
        <FieldBase label={elem.label} ref={ref => (elem.fieldBase = ref)} editing={isEditing} >
          <div is slot="viewmode">
            {elem.value}
          </div>
          <div is slot="editmode">
            <style>
              input { background-color: #f7f8f9; border: 0px; font-size: 14px; outline: 0; }
              input:focus { background-color: white; }
            </style>
            <input
              type="text"
              defaultValue={elem.value}
              onfocus={() => handleInputFocus(elem)}
              onblur={() => handleInputBlur(elem)}
              ref={ref => elem.inputField = ref}
            >
          </div>
        </FieldBase>
      </div>
    );
  },
  props: {
    // we expose label and editing props that we can pass to FieldBase
    label: prop.string({ attribute: true }),
    editing: prop.boolean({ attribute: true }),
    // and introduce the value prop that will reflect the value from out input field
    value: prop.string({ attribute: true }),
  },
  attached(elem) {
    // we'll need event handlers to be able to react to the FieldBase telling us to switch views
    elem.addEventListener(showEditingView, (e) => handleEditingViewSwitch(elem));
    elem.addEventListener(showViewingView, (e) => handleViewingViewSwitch(elem, e));
  },
});
```

Keep in mind, this is a **very** simplified version of textfield that is just meant to show the bare minimum to get started extending FieldBase.
For more in depth examples, check out some of the `ak-field` components in the Atlaskit repo.

Here are the main things we are doing in this code:
* Reflecting `label` and `editing` props into `FieldBase`.
* Exposing a `value` prop and reflecting it in the DOM.
* Listening for the `showEditingView` event so that we can focus on our input.
* Listening for the `showViewingView` event so that we can update our `value` prop.
* Inserting an element with `slot="viewmode"` to display our components value.
* Inserting an element with `slot="editmode"` to allow users to edit a value.
  * We insert a style tag so that the background colors, font sizes, etc match. Also to remove the normal focus styles.
  * Add focus and blur handlers to the input so that we can pass a `focused` prop to `FieldBase` to apply our styles.

Some notes:
* In the real world, you would not be able to use an input in the shadowDOM to reflect our values.
You would need to insert them as lightDOM using a `<slot />` (see examples of this in Atlaskit).



### React

```js
/* React example coming soon! */
```
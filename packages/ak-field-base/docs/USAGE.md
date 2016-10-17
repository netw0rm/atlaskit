# FieldBase

This component contains all the common behaviour and styles for fields

FieldBase provides an ADG3 compatible implementation for:
* Labels: spacing, margins, accessibility and click-to-focus functionality
* Fields: sizing, borders, colors, wrapping behaviour, hover/focus states
* InlineEdit pattern: view switching, edit/confirm/cancel buttons, focus handling
* Validation: styles, waiting states (built in validation coming soon!)
* Keyboard navigation: view switching, confirm/cancel behaviour with associated focus styles

FieldBase's *will* work by themselves but are really meant to be extended into a full field component.

## Try it out

Interact with a [live demo of the ak-field-base component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field-base/@VERSION@/).

## Installation

```sh
npm install ak-field-base
```


## Using the component

FieldBase makes no assumptions about libraries or frameworks and can be extended any way you like; Skatejs, React or even Vanilla JS.

#### Creating your views

FieldBase works using two 'views' for your component `editmode` and `viewmode`.
To set these up, simply pass them as children to your FieldBase with the appropriate `slot` attribute.

```html
<ak-field-base label="My awesome field" id="myCustomField">
  <div slot="viewmode">
    <span id="viewModeValue">Your text here</span>
  </div>
  <div slot="editmode">
    <input type="text" id="inputField" value="Your text here" />
  </div>
</ak-field-base>
```

**Note**: It is very important to pass in the `label` attribute even if you are hiding it using the
`hideLabel` attribute as the label is used to make your field accessible for screen readers.

At this point you will already have a component that can switch between views, handle keyboard navigation and set aside an appropriate amount of space.

However, this isn't particularly useful because our changes aren't saved!

#### Updating views

To keep our two views in sync, we'll need to set up some event handlers to tell us when a user is switching views.

The two events for this are `show-editing-view` and `show-viewing-view` respectively.

We'll simply listen for the `show-viewing-view` event and if a user clicked confirm, we'll update our `viewmode`.
If they click cancel we'll take their last value and put that back into the input field so that the next time they enter `editmode` it has the correct value.

```javascript
// import the custom event from the FieldBase package
import { events } from 'ak-field-base';

const fieldBase = document.getElementById('myCustomField');
const inputField = document.getElementById('inputField');
const viewModeSpan = document.getElementById('viewModeValue');

// We'll need to keep track of the value of our field
let fieldValue = inputField.value;

// now set up our event listener
fieldBase.addEventListener(events.showViewingView, (e) => {
  // we can check if the change was caused by hitting cancel or not
  if (e.detail.cancelButtonPressed) {
    // we'll reset the value to the last one before the cancel
    inputField.value = fieldValue;
  } else {
    // we'll update our state and reflect it into the viewmode
    fieldValue = inputField.value;
    viewModeSpan.innerHTML = fieldValue;
  }
})
```

#### Styling content

You'll almost definitely want to apply some styles to your views so that they blend in with the ADG3 theme.

In our example above for example, you would want to:
* Remove default focus styles from the input
* Remove borders and background-color from the input
* Reflect the inputs focus onto fieldBase (so that we get the correct focus styles in editmode)

To fix the styles we can either set them through javascript/regular css **or**
if you are using webcomponents, you can pass in a `<style>` tag to `editmode`
(it's reccomended that you namespace your rules in case an end user is using a shadowDOM polyfill).

```html
<ak-field-base label="My awesome field" id="myCustomField">
  <div slot="viewmode">
    <span id="viewModeValue">Your text here</span>
  </div>
  <div slot="editmode">
    <style>
      input { background: transparent; border: 0; outline: 0; }
    </style>
    <input type="text" id="inputField" value="Your text here" />
  </div>
</ak-field-base>
```

```javascript
inputField.style.background = 'transparent';
inputField.style.border = '0';
inputField.style.outline = 'none';
```

To fix the focus styling we can set up event listers on the input that can set the `focused` prop on FieldBase.

```javascript
inputField.addEventListener('focus', () => {
  fieldBase.focused = true;
});
inputField.addEventListener('blur', () => {
  fieldBase.focused = false;
});
```

#### Validation

Performing validation is as easy listening for the `show-viewing-view` event and responding appropriately.

If the validation can be performed client-side, simply check the value, if it is invalid cancel the event
and set the `invalid` prop on fieldBase.

```javascript
fieldBase.addEventListener(events.showViewingView, (e) => {
  if (!e.detail.canceled) {
    if (inputField.value.length % 2 !== 0) {
      // error! the field only accepts strings that have an even number of characters!
      e.cancel();
      fieldBase.invalid = true;
    }
  }
});
```

To perform async validation it is reccomended that you use the `waiting` prop whilst you wait.

```javascript
fieldBase.addEventListener(events.showViewingView, (e) => {
  if (!e.detail.canceled) {
    // we'll cancel the event so that we don't go to viewmode yet
    e.cancel();
    // now we'll call some long running validation function
    validateValueOnServer(inputField.value).then(isValid => {
      if (isValid) {
        // the value was valid, remove the waiting prop and the editing prop to send us back to viewingmode
        fieldBase.waiting = false;
        fieldBase.editing = false;
      } else {
        // the value wasn't valid, we'll mark fieldBase as invalid and let the user handle that
        fieldBase.waiting = false;
        fieldBase.invalid = true;
      }
    });
  }
})
```

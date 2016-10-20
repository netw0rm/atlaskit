# FieldBase

This component contains all the common behaviour and styles for fields and it provides you with an implementation of the Atlassian Design Guidelines, compatible with the following elements:
* *Labels*: spacing, margins, accessibility and click-to-focus functionality.
* *Fields*: sizing, borders, colors, wrapping behaviour, hover/focus states.
* *Inline edit pattern*: view switching, edit/confirm/cancel buttons, focus handling
* *Validation*: styles, waiting states (built in validation coming soon!).
* *Keyboard navigation*: view switching, confirm/cancel behaviour with associated focus styles.

![Example ak-field-base ](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-field-base /docs/ak-field-base.png)

## Try it out

Interact with a [live demo of the ak-field-base component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field-base/@VERSION@/).

## Installation

```sh
npm install ak-field-base
```


## Using the component

FieldBase is library and framework-agnositc and can be extended any way you like using Skatejs, React or even Vanilla JS.

#### How to create your views

FieldBase works using two 'views' for your component `editmode` and `viewmode`.
Set these views by passing them as children to your FieldBase with the appropriate `slot` attribute.
For example:

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

Remember to pass in the `label` prop even if you are hiding it using the
`hideLabel` prop since the `label` is used to make your field accessible for screen readers.

At this point you will already have a component that can switch between views, handle keyboard navigation and set aside an appropriate amount of space.

However, this isn't particularly useful because our changes aren't saved!

#### How to update views

To keep our two views in sync, we'll need to set up some event handlers to tell us when a user is switching views.

The two events for this are `exitViewingView` and `exitEditingView` respectively.

We'll simply listen for the `exitEditingView` event and if a user clicked confirm, we'll update our `viewmode`.
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
fieldBase.addEventListener(events.exitEditingView, (e) => {
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

#### How to style content

You can apply the ADG (Atlassian Desgin Guidelines) styles.

In our example above, you would want to:
* Remove default focus styles from the input
* Remove borders and background-color from the input
* Reflect the input's focus state onto fieldBase (so that we get the correct focus styles in editmode)

To fix the styles we can either set them through javascript/regular css or just use inline styles.

```html
<ak-field-base label="My awesome field" id="myCustomField">
  <div slot="viewmode">
    <span id="viewModeValue">Your text here</span>
  </div>
  <div slot="editmode">
    <input type="text" id="inputField" value="Your text here" style="background: transparent; border: 0; outline: 0; width: 100%;" />
  </div>
</ak-field-base>
```

```javascript
inputField.style.background = 'transparent';
inputField.style.border = '0';
inputField.style.outline = 'none';
inputField.style.width = '100%';
```

To fix the focus styling, you can set up event listeners on the input that can set the `focused` prop on FieldBase.

```javascript
inputField.addEventListener('focus', () => {
  fieldBase.focused = true;
});
inputField.addEventListener('blur', () => {
  fieldBase.focused = false;
});
```

#### How to perform a validation

Performing validation is as easy listening for the `exitEditingView` event and responding appropriately.

If the validation can be performed client-side, check the value and if it's invalid,  cancel the event
and set the `invalid` prop on fieldBase.

For example:

```javascript
fieldBase.addEventListener(events.exitEditingView, (e) => {
  if (!e.detail.cancelButtonPressed) {
    if (inputField.value.length % 2 !== 0) {
      // error! the field only accepts strings that have an even number of characters!
      e.preventDefault();
      fieldBase.invalid = true;
    }
  }
});
```

To perform async validation it's recommended that you use the `waiting` prop whilst you wait.

```javascript
fieldBase.addEventListener(events.exitEditingView, (e) => {
  if (!e.detail.cancelButtonPressed) {
    // we'll cancel the event so that we don't go to viewmode yet
    e.preventDefault();
    fieldBase.waiting = true;
    // now we'll call some long running validation function
    validateValueOnServer(inputField.value).then(isValid => {
      if (isValid) {
        // the value was valid, remove the waiting, editing and invalid props
        fieldBase.waiting = false;
        fieldBase.editing = false;
        fieldBase.invalid = false;
        // and update our state
        fieldValue = inputField.value;
      } else {
        // the value wasn't valid, we'll mark fieldBase as invalid and let the user handle that
        fieldBase.waiting = false;
        fieldBase.invalid = true;
      }
    });
  }
})
```
### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).


```
import fieldBase from 'ak-field-base';
import reactify from 'skatejs-react-integration';

const ReactComponent = reactify(ak-field-base, {});

ReactDOM.render(<ReactComponent />, container);
```


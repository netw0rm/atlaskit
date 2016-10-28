# FieldBase

This component contains all the common behaviour and styles for fields

FieldBase provides an Atlassian Design Guidelines compatible implementation for:
* Labels: spacing, margins, accessibility.
* Fields: sizing, borders, colors, wrapping behaviour, hover/focus states.
* Validation: styles (built in validation coming soon!)

FieldBase's *will* work by themselves but are really meant to be extended into a full field component.

## Try it out

Interact with a [live demo of the ak-field-base component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field-base/@VERSION@/).

## Installation

```sh
npm install ak-field-base
```

#### Using the component

The typical use-case for an `ak-field-base` is to create a new component. It makes not assumptions about libraries or tools and can be extended
however you like (React, Skatejs, Vanilla JS, etc).

Usually you will want some form of input for the extended component. You can add that to fieldBase using the `input-slot` slot like so:

```html
<ak-field-base label="A slotted input">
  <input slot="input-slot" type="text" value="I am slotted in a field-base!" />
</ak-field-base>
```

**Note**: React consumers will need to use the `is` prop to tell React to treat the input as a Custom Element, otherwise it will not recognise the `slot` attribute.
```html
<ak-field-base label="A slotted input">
 <input is slot="input-slot" type="text" defaultValue="I am slotted in a field-base!" />
</ak-field-base>
```

You'll also want to style the input to make it blend in with the fieldBase.

#### Styling Content

You'll typically want to apply some styles to any input fields/text areas you use inside a `field-base`.

In general you'll want to fix the following:
* Remove default focus styles (these are handled by `field-base`)
* Remove borders and background-color.
* Set the width to 100%.

This would look something like this in CSS

```CSS
input.styledInput {
  background: transparent;
  border: 0;
  outline: 0;
  width: 100%;
}
```

or in JavaScript

```javascript
inputField.style.background = 'transparent';
inputField.style.border = '0';
inputField.style.outline = 'none';
inputField.style.width = '100%';
```

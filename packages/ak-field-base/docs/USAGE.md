# FieldBase

This component contains all the common behaviour and styles for fields

FieldBase provides an Atlassian Design Guidelines compatible implementation for:
* Labels: spacing, margins, accessibility.
* Fields: sizing, borders, colors, wrapping behaviour, hover/focus states.
* Validation: styles (built in validation coming soon!)

FieldBase's *will* work by themselves but are really meant to be extended into a full field component.

![Example Fieldbase](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/FieldBase/docs/fieldbase.png)

## Try it out

Interact with a [live demo of the FieldBase component](https://aui-cdn.atlassian.com/atlaskit/stories/FieldBase/@VERSION@/).

## Installation

```sh
npm install ak-field-base
```

#### Using the component

Import the component in your React app as follows:

```
import FieldBase from 'ak-field-base';
ReactDOM.render(<FieldBase />, container);
```

The typical use-case for an `FieldBase` is to create a new component.

Usually you will want some form of input for the extended component.

```html
<FieldBase label="A slotted input">
  <input type="text" value="I am slotted in a field-base!" />
</FieldBase>
```

This way, the component will tell you when it **wants** to update its props, without actually changing them.
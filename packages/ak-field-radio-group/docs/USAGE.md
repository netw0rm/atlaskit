# RadioGroup

Provides a standard way to select a single option from a list.


## Try it out

Interact with a [live demo of the ak-field-radio-group component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-field-radio-group/@VERSION@/).

## Installation

```sh
npm install ak-field-radio-group
```

## Using the component

Import the component in your React app as follows:

```
import FieldRadioGroup from 'ak-field-radio-group';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', isSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

ReactDOM.render(
  <FieldRadioGroup
    items={items}
    label="Pick your favourite color:"
  />,
  container);
```

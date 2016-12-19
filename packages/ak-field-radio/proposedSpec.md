# ak-field-radio

Radio form fields component used to select a single option out of a list.

[Design spec (latest)](https://extranet.atlassian.com/display/ADG/Radios+product)

## Proposal

### API:

Expose a `RadioGroup` component, which generates radio items from data provided as a property.

```
<form>
  <RadioGroup
    label="Pick an animal:"
    onRadioChange={handler}
    items={[
      { name: 'animal', value: 'dog', label: 'Dog' },
      { name: 'animal', value: 'cat', label: (<b>Cat</b>), selected: true },
      { name: 'animal', value: 'hippo', disabled: true, label: 'Hippo' },
    ]}
  />
</form>
```

#### RadioGroup

* `label`: String - Renders a label for the group
* `onRadioChange`: Function - called when a radio item is selected
* `items`: Array - An array of objects containing the data of the items.

Each object in the `items` array should contain:

* `name`: String - The `name` property of the input
* `value`: String - The `value` property of the input
* `disabled`: Boolean - Whether the radio input is disabled
* `label`: React node - The content to display in the label to the right of the

### Smart component

#### RadioGroup

* The smart component will automatically set up the `onRadioChange` handler to update the `value` property.
* This component also needs to expose a way to allow the initial value to be set up.

```
<form>
  <RadioGroup
    label="Pick an animal:"
    items={[
      { name: 'animal', value: 'dog', label: 'Dog' },
      { name: 'animal', value: 'cat', label: (<b>Cat</b>), defaultSelected: true },
      { name: 'animal', value: 'hippo', disabled: true, label: 'Hippo' },
    ]}
  />
</form>
```

## Notes and questions

* It would be useful to be able to float repetitive properties up to the wrapper element - e.g. `name`, so that it doesn't need to be specified for each item in the `items` array.

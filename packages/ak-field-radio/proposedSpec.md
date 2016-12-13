# ak-radio

Radio form fields component used to select a single option out of a list.

[Design spec (latest)](https://extranet.atlassian.com/display/ADG/Radios+product)

## Proposal

### API:

Expose a `Radio` component, which simply wraps an `<input type="radio">` element.

Expose a `RadioGroup` component, which wraps a set of related `Radio` items.

```
<form>
  <RadioGroup
    label="Pick an animal:"
    selectedValue={"cat"}
    onRadioSelect={handler}
  >
    <Radio name="animal" value="dog">Dog</Radio>
    <Radio name="animal" value="cat">Cat</Radio>
    <Radio name="animal" value="hippo">Hippo</Radio>
  </RadioGroup>
</form>
```

#### RadioGroup

* `label`: String - Renders a label for the group
* `selectedValue`: String - the value of the currently selected `Radio` item
* `onRadioSelect`: Function - called when a radio item is selected

#### Radio

* `name`: String - The name which is submitted with the data
* `value`: String - The value of the radio input

### Smart component

* The smart component will automatically set up the `onRadioSelect` handler to update the `selectedValue` property.
* This may need to expose a `defaultSelectedValue` property to allow the initial value to be set up.

## Notes and questions

* Is it best to use a `selectedValue` prop on the `RadioGroup` wrapper, or should we expose a `selected`/`checked` property on the `Radio` items, which would more closely mirror the HTML spec?
   * Having `selectedValue` will be useful for form validation, so we can simply check the value instead of searching through the children.
* It would be useful to be able to float repetitive properties up to the wrapper element - e.g. `name`:

```
<RadioGroup name="animal">
  <Radio value="dog" />
  <Radio value="cat" />
</RadioGroup>
```

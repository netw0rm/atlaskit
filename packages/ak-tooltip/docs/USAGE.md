# Tooltip

Use this component to display extra information about an element by displaying a floating description.

![Example tooltip](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-tooltip/docs/exampleTooltip.gif)

## Installation

```sh
npm install ak-tooltip
```

## Using the component

`ak-tooltip` exports two tooltip components, one "smart" and one "dumb". The smart component allows you to simply place the tooltip around an element and all the state handling will
be handled for you. The dumb one on the other hand allows you to hook into events and to manage the state yourself.

### Smart Component

```js
import Tooltip from 'ak-tooltip';

ReactDOM.render(<div>
  <Tooltip description="Opens the user preferences screen in a new window" position="bottom">
    <button>I do something!</button>
  </Tooltip>
</div>, container);
```

In this case, the only props you need to use are `description` and `position` (and the content you want to bind the tooltip to).

If a user were to hover over this button, they would see a tooltip rendered underneath it. If there was not enought space below, the tooltip would automatically move to the top.

### Dumb Component


```js
import { AKTooltip } from 'ak-tooltip';
let tooltipVisibleState = false;

function handleMouseOver() {
  tooltipVisibleState = true;
  renderButtonInContainer();
}

function handleMouseOut() {
  tooltipVisibleState = false;
  renderButtonInContainer();
}

function renderButtonInContainer() {
  ReactDOM.render(<div>
    <AKTooltip
      description="Opens the user preferences screen in a new window"
      position="bottom"
      visible={tooltipVisibleState}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <button>I do something!</button>
    </AKTooltip>
  </div>, container);
}
```

This is a contrived example to show the usage of `onMouseOver` and `onMouseOut` as a way of controlling your own state.

Obviously your state would normally be stored in a component or value store.

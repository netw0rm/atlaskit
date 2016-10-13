# Tooltip

Use this component to display extra information about an element by displaying a floating description. 

You can use the tooltip alone, but it is reccomended to use it in conjunction with `ak-tooltip-trigger` , which is exported from this same package and will take care of all the event handling/binding.

![Example tooltip](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-tooltip/docs/exampleTooltip.gif)

##### Some Tips
* You can have multiple tooltips on the page but it's generally advised to have one tooltip
and multiple tooltip-triggers that are each bound to the same one.
* Make sure your tooltip always has an `id`. Although it's possible to imperatively pass a reference
of the tooltip to a trigger for example, it's much easier to declaratively use it's `id`.
* Don't place the tooltip in any component's ShadowDOM as you wont be able to look it up by `id`.

## Installation

```sh
npm install ak-tooltip
```

## Using the component

### HTML

The `ak-tooltip` package exports the Tooltip [Skate](https://github.com/skatejs/skatejs) component
as well as the Tooltip-Trigger component.

Import both components in your JS resource:

#### bundle.js

```javascript
import 'ak-tooltip';
```

Now we can use both defined tags in our HTML markup, e.g.:

#### index.html

```html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body>
  <!-- ... -->
  <ak-tooltip id="myTooltip"></ak-tooltip>
  <ak-tooltip-trigger
    description="Submit the form and save all your data to the server"
    position="bottom"
  >
    <input type="button" value="Do the thing" aria-describedby="myTooltip" />
  </ak-tooltip-trigger>
</body>
```

The simplest way to create a tooltip is to:
* Put an `ak-tooltip` element on the page with an id
* Wrap whichever element you want to bind the tooltip to in an `ak-tooltip-trigger`
  * Put the description, position, etc on the trigger
* Add an `aria-describedby="tooltipID"` attribute to the element you are wrapping (where
`tooltipID` is the id of your tooltip above).

You can also use the components directly in JavaScript by importing the default and named exports.

```js
import Tooltip, { TooltipTrigger } from 'ak-tooltip';

const tooltip = new Tooltip();
const trigger = new TooltipTrigger();

tooltip.id = 'myTooltip';
trigger.description = 'This is a tooltip';
trigger.innerHTML = '<input type="button" value="Do the thing" aria-describedby="myTooltip" />';

document.body.appendChild(tooltip);
document.body.appendChild(trigger);
```

### React

This is a standard web component, if you want to use it in your React app, use the Skate.js [React integration](https://github.com/webcomponents/react-integration).

```js
import Tooltip, { TooltipTrigger } from 'ak-tooltip';
import reactify from 'skatejs-react-integration';

const ReactTooltip = reactify(Tooltip);
const ReactTrigger = reactify(TooltipTrigger);

ReactDOM.render(<div>
  <ReactTooltip id="myTooltip" />
  <ReactTrigger description="This is a tooltip">
    <input type="button" value="Do the thing" aria-describedby="myTooltip" />
  </ReactTrigger>
</div>, container);
```

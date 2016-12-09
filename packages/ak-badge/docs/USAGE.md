# Badge

Badges are visual indicators for numeric values such as tallies and scores. They're commonly used before and after the label of the thing they're quantifying.
They must be used singly after a single item name, and have only numbers.

* Use lozenges for statuses.
* Use labels to call out tags and high-visibility attributes.
* Use a tooltip if you want to indicate units.

![Example badge](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-badge/docs/badge.png)

## Try it out

Interact with a [live demo of the ak-badge component](https://aui-cdn.atlassian.com/atlaskit/stories/ak-badge/@VERSION@/).

## Installation

```sh
npm install ak-badge
```

## Using the component

### HTML

The `ak-badge` package exports the Badge React component.

Import the component in your React app as follows:

```javascript
import Badge from 'ak-badge';
ReactDOM.render(<Badge />, container);
```

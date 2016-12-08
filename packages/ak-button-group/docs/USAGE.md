# ButtonGroup

A button group provides a visual grouping for related Button (`<ak-button>`) elements. You can use this component whenever you have multiple buttons with related actions, such as as the pull requests Approve and Decline buttons.

![Example button group](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-button-group/docs/button_group.png)

## Try it out

Interact with a [live demo of the ak-button-group](https://aui-cdn.atlassian.com/atlaskit/stories/ak-button-group/@VERSION@/).

## Setup and install

```
npm install ak-button-group
```

## Using the component

### React

Import the component in your React app as follows:

```
import ButtonGroup from 'ak-button-group';
import Button from 'ak-button';

ReactDOM.render((
  <ButtonGroup>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
), container)
```

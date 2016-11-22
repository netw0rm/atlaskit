# ButtonGroup

A button group provides a visual grouping for related Button (`<ak-button>`) elements. You can use this component whenever you have multiple buttons with related actions, such as as the pull requests Approve and Decline buttons.

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

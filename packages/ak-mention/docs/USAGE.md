# Mention

The mention picker is used to select people for mentioning in other components such as input fields or editors

![Example mention](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/ak-mention/docs/mention.png)

## Try it out

Interact with a [live demo of the ak-mention](https://aui-cdn.atlassian.com/atlaskit/stories/ak-mention/@VERSION@/).

## Installation

```sh
npm install ak-blanket
```

## Using the component
Import the component in your React app as follows:
```js
import MentionPicker, { MentionResource } from 'ak-mention';
const mentionProvider = new MentionResource({
  url: 'http://example-mention-server/service',
  securityProvider: () => {
    return {
        headers: {
            Authorization: getSecurityTokenForService(...)
        }
    };
  }
});
ReactDOM.render(
  <MentionPicker 
    resourceProvider={mentionResource} 
    query="John"
    onSelection={(mention) => { /* do something */ }}
  />, container);
```
If a ```target``` property is provided with a ```position``` property, then the 
Picker will automatically be positioned floating above that element. The ```target```
is a id of an element on the page. ```position``` may be one of ```above```, 
```below``` or ```auto```. If these are omitted, the picker will be rendered
directly inline, and any positioning will need to be managed by the consumer.
An optional ```zIndex``` may be provided, if required to ensure that MentionPicker
appears above other elements on the page. The MentionPicker will be rendered
at the bottom of the DOM.
Key navigation can be bound to ```selectNext``` (e.g. down arrow), 
```selectPrevious``` (e.g. up arrow), and ```chooseCurrentSelection```
(e.g. enter and tab).

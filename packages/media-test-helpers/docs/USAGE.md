# AkMediaTestHelpers

Contains all utilities related with stories and specs that affect media-* components

## Using the component

Use the component in your React app as follows:

```js
import { ContextFactory } from '@atlaskit/media-core';
import { StoryBookAuthProvider } from '@atlaskit/media-test-helpers';

const isAsapEnvironment = true;
const authProvider = StoryBookAuthProvider.create(isAsapEnvironment);
const serviceHost = '//example.com';
const context = ContextFactory.create({ serviceHost, authProvider});
```

```javascript
import {StoryList} from '@atlaskit/media-test-helpers';

storiesOf('My story', {})
  .add('Examples', () => (
    <StoryList>
      {[{
          title: 'Example 1',
          content: <div>One</div>
        },
        {
          title: 'Example 2',
          content: <div>Two</div>
        }
      ]}
    </StoryList>
  )

```

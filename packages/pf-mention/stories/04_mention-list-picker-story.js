import MentionTextInput from './demo-mention-text-input';
import { resourceProvider, slowResourceProvider, MockPresenceProvider } from './story-data';
import { storiesOf, action } from '@kadira/storybook';
// import reactify from 'akutil-react';
// import { define } from 'skatejs';
// import { definition } from '../src/wc/pf-mention-list';
// import { mentions } from './story-data';

import React from 'react';

const bottomStyle = {
  position: 'absolute',
  bottom: '30px',
};

storiesOf('Mention List Picker', module)
  .add('Input field mention list. Mock API. Key binding', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={resourceProvider}
    />
  ))
  .add('Input field mention list. Mock slow API. Key binding', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={slowResourceProvider}
    />
  ))
  .add('Input field at bottom mention list. Mock API. Key binding', () => (
    <div style={bottomStyle} >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        relativePosition="above"
      />
    </div>
  ))
  .add('Input field at top mention list. Mock API. Mocked presence', () => (
    <MentionTextInput
      label="User search"
      onSelection={action('mention selected')}
      resourceProvider={resourceProvider}
      presenceProvider={new MockPresenceProvider()}
    />
  ))
  .add('Input field at bottom mention list. Mock API. Mocked presence', () => (
    <div style={bottomStyle} >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        presenceProvider={new MockPresenceProvider()}
        relativePosition="above"
      />
    </div>
  ))
  .add('Input field at bottom mention list. Mock API. Mocked presence (slow)', () => (
    <div
      style={bottomStyle}
    >
      <MentionTextInput
        label="User search"
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        presenceProvider={new MockPresenceProvider(200, 500)}
        relativePosition="above"
      />
    </div>
  ));

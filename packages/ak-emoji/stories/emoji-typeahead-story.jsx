import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import EmojiTextInput from './demo-emoji-text-input';
import emojiService from './story-data';

// const bottomStyle = {
//   position: 'absolute',
//   bottom: '30px',
// };
//
// const tallPageStyle = {
//   height: '2000px',
// };
//
// const downPage = {
//   position: 'absolute',
//   top: '400px',
// };

storiesOf(`${name}/EmojiTypeAhead`, module)
  .add('Input field emoji list. Key binding', () => (
    <EmojiTextInput
      label="Emoji search"
      onSelection={action('emoji selected')}
      emojiService={emojiService}
    />
  // ))
  // .add('Input field emoji list. Mock slow API. Key binding', () => (
  //   <EmojiTextInput
  //     label="User search"
  //     onSelection={action('emoji selected')}
  //     resourceProvider={slowResourceProvider}
  //   />
  // ))
  // .add('Input field at bottom emoji list. Mock API. Key binding', () => (
  //   <div style={bottomStyle} >
  //     <EmojiTextInput
  //       label="User search"
  //       onSelection={action('emoji selected')}
  //       resourceProvider={resourceProvider}
  //       relativePosition="above"
  //     />
  //   </div>
  // ))
  // .add('Input field at top emoji list. Mock API. Mocked presence', () => (
  //   <EmojiTextInput
  //     label="User search"
  //     onSelection={action('emoji selected')}
  //     resourceProvider={resourceProvider}
  //     presenceProvider={new MockPresenceProvider()}
  //   />
  // ))
  // .add('Input field at bottom emoji list. Mock API. Mocked presence', () => (
  //   <div style={bottomStyle} >
  //     <EmojiTextInput
  //       label="User search"
  //       onSelection={action('emoji selected')}
  //       resourceProvider={resourceProvider}
  //       presenceProvider={new MockPresenceProvider()}
  //       relativePosition="above"
  //     />
  //   </div>
  // ))
  // .add('Input field at bottom emoji list. Mock API. Mocked presence (slow)', () => (
  //   <div
  //     style={bottomStyle}
  //   >
  //     <EmojiTextInput
  //       label="User search"
  //       onSelection={action('emoji selected')}
  //       resourceProvider={resourceProvider}
  //       presenceProvider={new MockPresenceProvider(200, 500)}
  //       relativePosition="above"
  //     />
  //   </div>
  // ))
  // .add('Input field at part down tall page. Mock API. Mocked presence', () => (
  //   <div style={tallPageStyle} >
  //     <div style={downPage} >
  //       <EmojiTextInput
  //         label="User search"
  //         onSelection={action('emoji selected')}
  //         resourceProvider={resourceProvider}
  //         presenceProvider={new MockPresenceProvider()}
  //         relativePosition="above"
  //       />
  //     </div>
  //   </div>
  ));

import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/dist/es5/renderer';

import DecisionItem from '../src/components/DecisionItem';
import { document } from '../src/support/story-data';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<DecisionItem/>', module)
  .add('Simple DecisionItem', () => (
    <DecisionItem contentRef={dumpRef}>
      Hello <b>world</b>.
    </DecisionItem>
  ))
  .add('Long DecisionItem', () => (
    <DecisionItem contentRef={dumpRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </DecisionItem>
  ))
  .add('Simple DecisionItem with renderer', () => (
    <DecisionItem contentRef={dumpRef}>
      <Renderer document={document} />
    </DecisionItem>
  ))
  .add('Simple DecisionItem with placeholder', () => (
    <DecisionItem contentRef={dumpRef} showPlaceholder={true} />
  ))
;

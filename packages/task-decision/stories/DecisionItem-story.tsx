import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Renderer from '@atlaskit/renderer';

import DecisionItem from '../src/components/DecisionItem';
import { document } from './story-data';

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
  .add('Simple DecisionItem with renderer', () => (
    <DecisionItem contentRef={dumpRef}>
      <Renderer document={document} />
    </DecisionItem>
  ));

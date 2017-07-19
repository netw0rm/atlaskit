import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Renderer from '@atlaskit/renderer';

import DecisionList from '../src/components/DecisionList';
import DecisionItem from '../src/components/DecisionItem';
import { document } from './story-data';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<DecisionList/>', module)
  .add('Simple DecisionList', () => (
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
      <DecisionItem contentRef={dumpRef}>
        <Renderer document={document} />
      </DecisionItem>
    </DecisionList>
  ))
  .add('Single item DecisionList', () => (
    <DecisionList>
      <DecisionItem contentRef={dumpRef}>
        Hello <b>world</b>.
      </DecisionItem>
    </DecisionList>
  ))
  .add('Empty DecisionList', () => (
    <DecisionList/>
  ));

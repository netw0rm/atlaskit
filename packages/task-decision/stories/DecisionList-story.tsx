import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

import DecisionList from '../src/components/DecisionList';
import DecisionItem from '../src/components/DecisionItem';
import { document } from '../src/support/story-data';
import { MessageContainer } from './story-utils';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<DecisionList/>', module)
  .add('Simple DecisionList', () => (
    <MessageContainer>
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
    </MessageContainer>
  ))
  .add('Single item DecisionList', () => (
    <MessageContainer>
      <DecisionList>
        <DecisionItem contentRef={dumpRef}>
          Hello <b>world</b>.
        </DecisionItem>
      </DecisionList>
    </MessageContainer>
  ))
  .add('Empty DecisionList', () => (
    <MessageContainer>
      <DecisionList/>
    </MessageContainer>
  ));

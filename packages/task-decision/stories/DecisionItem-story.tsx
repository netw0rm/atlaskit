import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

import DecisionItem from '../src/components/DecisionItem';
import { document, getParticipants } from '../src/support/story-data';
import { MessageContainer, SidebarContainer } from './story-utils';

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
  .add('Simple DecisionItem with 1 participant, inline (shouldn\'t render participants)', () => (
    <MessageContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(1)}
        appearance="inline"
      >
        <Renderer document={document} />
      </DecisionItem>
    </MessageContainer>
  ))
  .add('Simple DecisionItem with no participants', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ))
  .add('Simple DecisionItem with 1 participant', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(1)}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ))
  .add('Simple DecisionItem with 2 participant', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(2)}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ))
  .add('Simple DecisionItem with 3 participants', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(3)}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ))
  .add('Simple DecisionItem with 4 participants', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(4)}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ))
  .add('Simple DecisionItem with 5 participants', () => (
    <SidebarContainer>
      <DecisionItem
        contentRef={dumpRef}
        participants={getParticipants(5)}
        appearance="card"
      >
        <Renderer document={document} />
      </DecisionItem>
    </SidebarContainer>
  ));

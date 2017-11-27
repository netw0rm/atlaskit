import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { ReactRenderer as Renderer } from '@atlaskit/renderer';

import TaskItem from '../src/components/TaskItem';
import { document, getParticipants } from '../src/support/story-data';
import { MessageContainer, SidebarContainer } from './story-utils';

const dumpRef = (ref: HTMLElement) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

storiesOf('<TaskItem/>', module)
  .add('Simple TaskItem', () => (
    <MessageContainer>
      <TaskItem taskId="task-1" contentRef={dumpRef} onChange={action('onChange')}>
        Hello <b>world</b>.
      </TaskItem>
    </MessageContainer>
  ))
  .add('Long TaskItem', () => (
    <MessageContainer>
      <TaskItem taskId="task-1" contentRef={dumpRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </TaskItem>
    </MessageContainer>
  ))
  .add('Simple Completed TaskItem ', () => (
    <MessageContainer>
      <TaskItem taskId="task-2" isDone={true} contentRef={dumpRef} onChange={action('onChange')}>
        <Renderer document={document} />
      </TaskItem>
    </MessageContainer>
  ))
  .add('Simple TaskItem with renderer', () => (
    <MessageContainer>
      <TaskItem taskId="task-3" contentRef={dumpRef} onChange={action('onChange')}>
        <Renderer document={document} />
      </TaskItem>
    </MessageContainer>
  ))
  .add('Simple TaskItem with placeholder', () => (
    <MessageContainer>
      <TaskItem taskId="task-1" contentRef={dumpRef} onChange={action('onChange')} showPlaceholder={true} />
    </MessageContainer>
  ))
  .add('Simple TaskItem with 1 participant, inline (shouldn\'t render participants)', () => (
    <MessageContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(1)}
        appearance="inline"
      >
        <Renderer document={document} />
      </TaskItem>
    </MessageContainer>
  ))
  .add('Simple TaskItem with no participants', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  .add('Simple TaskItem with 1 participant', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(1)}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  .add('Simple TaskItem with 2 participant', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(2)}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  .add('Simple TaskItem with 3 participants', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(3)}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  .add('Simple TaskItem with 4 participants', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(4)}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  .add('Simple TaskItem with 5 participants', () => (
    <SidebarContainer>
      <TaskItem
        taskId="task-3"
        contentRef={dumpRef}
        onChange={action('onChange')}
        participants={getParticipants(5)}
        appearance="card"
      >
        <Renderer document={document} />
      </TaskItem>
    </SidebarContainer>
  ))
  ;

import { storiesOf } from '@kadira/storybook';
import Button from 'ak-button';
import React from 'react';
import Lorem from 'react-lorem-component';
import { name } from '../package.json';
import ModalDemo from './ModalDemo';
import SubmitDemo from './SubmitDemo';

storiesOf(name, module)
  .add('simple modal', () => <ModalDemo />)
  .add('demo with form submission', () => <SubmitDemo />)
  .add('with content overflow', () => (
    <ModalDemo>
      <Lorem count="15" />
    </ModalDemo>
  ))
  .add('with footer that is taller than usual', () => (
    <ModalDemo
      footer={
        <div>
          <Button appearance="primary">Create issue</Button>
          <br />
          <Button>Why am i down here</Button>
          <br />
          <Button>I really should be on one line</Button>
        </div>
      }
    />
  ))
  .add('with animated content', () => (
    <ModalDemo>
      <style>{`
        @keyframes example {
          0%   { height: 200px; }
          50%  { height: 1300px; }
          100% { height: 200px; }
        }

        .animate-height {
          height: 200px;
          overflow: hidden;
          animation-name: example;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div className="animate-height">
        <Lorem count="15" />
      </div>
    </ModalDemo>
  ));

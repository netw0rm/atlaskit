import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButton from 'ak-button';
import React from 'react';
import Lorem from 'react-lorem-component';
import WebComponent from '../src';
import { name } from '../package.json';
import ModalDemo from './ModalDemo';
import SubmitDemo from './SubmitDemo';

const ReactButton = reactify(AkButton);
const ReactModal = reactify(WebComponent);

storiesOf(name, module)
  .add('demo with button', () => <ModalDemo />)
  .add('demo with form submission', () => <SubmitDemo />)
  .add('simple modal', () => (
    <ReactModal open>
      <div is slot="header">New issue</div>
      <div is slot="footer">
        <ReactButton appearance="primary">Create issue</ReactButton>
      </div>
      <div>
        <Lorem count="1" />
      </div>
    </ReactModal>
  ))
  .add('with content overflow', () => (
    <ReactModal open>
      <div is slot="header">New issue</div>
      <div is slot="footer">
        <ReactButton appearance="primary">Create issue</ReactButton>
      </div>
      <div>
        <Lorem count="15" />
      </div>
    </ReactModal>
  ))
  .add('with footer that is taller than usual', () => (
    <ReactModal open>
      <div is slot="header">New issue</div>
      <div is slot="footer">
        <ReactButton appearance="primary">Create issue</ReactButton>
        <br />
        <ReactButton>Why am i down here</ReactButton>
        <br />
        <ReactButton>I really should be on one line</ReactButton>
      </div>
      <div>
        <Lorem count="15" />
      </div>
    </ReactModal>
  ))
  .add('with animated content', () => (
    <ReactModal open>
      <div is slot="header">New issue</div>
      <div is slot="footer">
        <ReactButton appearance="primary">Create issue</ReactButton>
      </div>
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
    </ReactModal>
  ));

import { storiesOf } from '@kadira/storybook';
import Button from 'ak-button';
import Layer from 'ak-layer';
import Navigation from 'ak-navigation';
import DropdownMenu from 'ak-dropdown-menu';
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
  ))
  .add('width="small"', () => (
    <ModalDemo width="small" />
  ))
  .add('width="medium"', () => (
    <ModalDemo width="medium" />
  ))
  .add('width="large"', () => (
    <ModalDemo width="large" />
  ))
  .add('width="x-large"', () => (
    <ModalDemo width="x-large" />
  ))
  .add('z-index test', () => (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflowY: 'scroll',
        padding: 32,
        boxSizing: 'border-box',
      }}
    >
      <style>{'body { margin: 0 }'}</style>
      <ModalDemo>
        <p>Open the dropdown to make sure that looks ok too:</p>
        <p>
          <DropdownMenu
            appearance="default"
            items={[
              {
                heading: 'Cities',
                items: [
                  { content: 'Sydney', type: 'radio' },
                  { content: 'Canberra', type: 'radio' },
                  { content: 'Melbourne', type: 'radio' },
                  { content: 'Perth', type: 'radio' },
                ],
              },
            ]}
            position="right middle"
            triggerType="button"
          >
            Choose
          </DropdownMenu>
        </p>
      </ModalDemo>
      <Navigation />
      <Layer
        content={
          <span>I am the popup content</span>
        }
      >
        <p style={{ border: '1px solid yellow' }}>
          There should be a popup attached to this
        </p>
      </Layer>
    </div>
  ));

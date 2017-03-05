import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';
import Layer from '@atlaskit/layer';
import Navigation from '@atlaskit/navigation';
import DropdownMenu from '@atlaskit/dropdown-menu';
import React from 'react';
import Lorem from 'react-lorem-component';
import { name } from '../package.json';
import ModalDialog from '../src';
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
  .add('width={300}', () => (
    <div>
      <p>Width should be 100 px smaller than width=small</p>
      <ModalDemo width={300} />
    </div>
  ))
  .add('width="300px"', () => (
    <div>
      <p>Width should be 100 px smaller than width=small</p>
      <ModalDemo width="300px" />
    </div>
  ))
  .add('width="75%"', () => (
    <div>
      <p>Width should be 75% of the viewport width</p>
      <ModalDemo width="75%" />
    </div>
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
    <div>
      <style>{'body { margin: 0 }'}</style>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflowY: 'scroll',
          padding: 32,
          boxSizing: 'border-box',
        }}
      >
        <Navigation />
        <div style={{ flexGrow: 1 }}>
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
      </div>
      <div>
        <ModalDialog
          footer={
            <Button appearance="primary">Create issue</Button>
          }
          header={<span>New issue</span>}
          isOpen
          width="medium"
        >
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
        </ModalDialog>
      </div>
    </div>
  ));

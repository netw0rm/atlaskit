import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { name } from '../package.json';
import LayerManager, { Modal } from '../src';

console.log('components?', LayerManager, Modal);

const imports = [['React', 'react'], ['LayerManager', '@atlaskit/TEST']];

storiesOf(name, module)
  .addCodeExampleStory('LayerManager', () => (
    <LayerManager>
      <div id="app">
        <Modal>
          <p>Some Content</p>
          <p>
            <button onClick={action('onButtonClick')}>Click</button>
          </p>
        </Modal>
      </div>
    </LayerManager>
  ), { imports });

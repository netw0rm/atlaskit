import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Modal from '@atlaskit/modal-dialog';

import AnimationDemo from './components/AnimationDemo';
import { name } from '../package.json';
import Flag, { FlagGroup } from '../src';
import GreenSuccessIcon from './components/GreenSuccessIcon';

storiesOf(name, module)
  .add('Interactive flag example', () => (
    <AnimationDemo />
  ))
  .addCodeExampleStory('Flag dumb component without FlagGroup', () => (
    <div style={{ padding: 24 }}>
      <p>
        This is the Flag component. It is a dumb component as it does not maintain any state, and
        all animations are managed by the parent FlagGroup component.
      </p>
      <p>
        <Flag
          actions={[
            { content: 'Show me', onClick: action('Show me clicked') },
            { content: 'No thanks', onClick: action('No thanks clicked') },
          ]}
          description="We got fun an games. We got everything you want honey, we know the names."
          icon={<GreenSuccessIcon />}
          id="1"
          key="1"
          title="Welcome to the jungle"
        />
      </p>
    </div>
  ))
  .add('Flag on top of Modal', () => (
    <div style={{ padding: 24 }}>
      <Modal header="Modal" isOpen>
        <div style={{ minHeight: 240 }}>
          I am a modal, flag should be visible above me
        </div>
      </Modal>
      <FlagGroup>
        <Flag
          description="I should be above the modal dialog"
          icon={<GreenSuccessIcon />}
          id="1"
          key="1"
          title="I am a Flag"
        />
      </FlagGroup>
    </div>
  ))
  .add('with a description containing a link', () => (
    <FlagGroup>
      <Flag
        description={
          <span>
            My favourite issue is <a href="https://ecosystem.atlassian.net/browse/AK-90210">AK-90210</a>
          </span>
        }
        icon={<GreenSuccessIcon />}
        id="1"
        key="1"
        title="I am a Flag"
      />
    </FlagGroup>
  ));

import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import LayerManager from '@atlaskit/layer-manager';

import SpotlightBackground from './examples/spotlight/target-background';
import SpotlightBasic from './examples/spotlight/basic';
import SpotlightLayout from './examples/spotlight/layout';
import SpotlightPlacement from './examples/spotlight/dialog-placement';
import SpotlightRadius from './examples/spotlight/target-radius';
import SpotlightReplacement from './examples/spotlight/target-replacement';
import SpotlightScroll from './examples/spotlight/autoscroll';
import SpotlightWidth from './examples/spotlight/dialog-width';

import ModalBasic from './examples/modal/basic';
import ModalLayout from './examples/modal/layout';

import { SpotlightManager } from '../src';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  width: 600px;
`;

storiesOf('Spotlight', module)
  .addDecorator(story => (
    <LayerManager>
      <SpotlightManager component={Wrapper}>
        {story()}
      </SpotlightManager>
    </LayerManager>
  ))
  .add('Basic Usage', () => <SpotlightBasic />)
  .add('Dialog Placement', () => <SpotlightPlacement />)
  .add('Dialog Width', () => <SpotlightWidth />)
  .add('Target Radius', () => <SpotlightRadius />)
  .add('Target Background', () => <SpotlightBackground />)
  .add('Target Replacement', () => <SpotlightReplacement />)
  .add('Auto Scroll', () => <SpotlightScroll />)
  .add('Layout Props', () => <SpotlightLayout />)
;

storiesOf('Modal', module)
  .addDecorator(story => (
    <div style={{ padding: 20, margin: '0 auto', width: 600 }}>
      {story()}
    </div>
  ))
  .add('Basic Usage', () => <ModalBasic />)
  .add('Layout Props', () => <ModalLayout />)
;

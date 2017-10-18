import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';

import Tooltip from '../src';
import { name } from '../package.json';

import { Container, Target } from './styled';

storiesOf(name, module)
  .add('Marshall', () => (
    <Container pad>
      <Lorem count={2} />
      <div style={{ display: 'flex', margin: '20px 0' }}>
        <Tooltip description="Description 1" placement="top">
          <Target style={{ marginRight: 8 }}>Target 1</Target>
        </Tooltip>
        <Tooltip description="Description 2" placement="top">
          <Target>Target 2</Target>
        </Tooltip>
      </div>
      <p>Hover from one target to the other for a seamless transition.</p>
      <Lorem count={10} style={{ marginTop: '1em' }} />
    </Container>
  ))
;

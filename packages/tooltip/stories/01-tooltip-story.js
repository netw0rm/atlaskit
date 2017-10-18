import { storiesOf } from '@kadira/storybook';
import React from 'react';
import LayerManager from '@atlaskit/layer-manager';

import Tooltip from '../src';
import { name } from '../package.json';

import PositionExample from './PositionExample';
import { Box, Center, Container, Spacer, Target } from './styled';

const POSITIONS = {
  top: {
    left: '50%',
    position: 'absolute',
    top: 8,
    transform: 'translateX(-50%)',
  },
  right: {
    top: '50%',
    position: 'absolute',
    right: 8,
    transform: 'translateY(-50%)',
  },
  bottom: {
    left: '50%',
    position: 'absolute',
    bottom: 8,
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    position: 'absolute',
    left: 8,
    transform: 'translateY(-50%)',
  },
};

storiesOf(name, module)
  .add('Placement', () => (
    <Container pad>
      <PositionExample />
      <p>Hover the target to display, click the to change position.</p>
    </Container>
  ))
  .add('Flip Behavior', () => (
    <Container>
      <Center pad>
        {Object.keys(POSITIONS).map(p => (
          <div key={p} style={POSITIONS[p]}>
            <Tooltip position={p} description={`Position "${p}"`} isVisible>
              <Target>Target</Target>
            </Tooltip>
          </div>
        ))}
        <p>
          When there isn&apos;t enough space the tooltip will &ldquo;flip&rdquo; to
          maintain visibility.
        </p>
      </Center>
    </Container>
  ))
  .add('Layer Manager', () => (
    <LayerManager>
      <Container pad>
        <PositionExample />
        <p>Hover the target to display, click the to change position.</p>
      </Container>
    </LayerManager>
  ))
  .add('CSS Position', () => (
    <Container pad>
      <Spacer style={{ height: 140 }}>
        <Box>
          <PositionExample />
        </Box>
        <p>The parent is <code>postion: relative;</code></p>
      </Spacer>
      <Spacer style={{ height: 140 }}>
        <Box position="absolute">
          <PositionExample />
        </Box>
        <p style={{ position: 'relative', top: 150 }}>The parent is <code>postion: absolute;</code></p>
      </Spacer>
      <Spacer style={{ height: 140 }}>
        <Box position="fixed">
          <PositionExample />
        </Box>
        <p style={{ position: 'relative', top: 150 }}>The parent is <code>postion: fixed;</code></p>
      </Spacer>
    </Container>
  ));

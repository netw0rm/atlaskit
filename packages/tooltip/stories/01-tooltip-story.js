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
      <PositionExample color="purple" />
      <p>Mouse over the target to display, click the to change placement.</p>
      <p>(rendered in a portal, before body close)</p>
    </Container>
  ))
  .add('Flip Behavior', () => (
    <Container>
      <Center pad>
        {Object.keys(POSITIONS).map(p => (
          <div key={p} style={POSITIONS[p]}>
            <Tooltip placement={p} content={`Position "${p}"`}>
              <Target color="blue">Target</Target>
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
        <PositionExample color="teal" />
        <p>Mouse over the target to display, click the to change placement.</p>
        <p>(rendered in the <em>last</em> slot of <code>@atlaskit/layer-manager</code>)</p>
      </Container>
    </LayerManager>
  ))
  .add('CSS Position', () => (
    <Container pad>
      <Spacer style={{ height: 140 }}>
        <Box>
          <PositionExample color="green" />
        </Box>
        <p>The parent is <code>postion: relative;</code></p>
      </Spacer>
      <Spacer style={{ height: 140 }}>
        <Box position="absolute">
          <PositionExample color="yellow" />
        </Box>
        <p style={{ position: 'relative', top: 150 }}>The parent is <code>postion: absolute;</code></p>
      </Spacer>
      <Spacer style={{ height: 140 }}>
        <Box position="fixed">
          <PositionExample color="red" />
        </Box>
        <p style={{ position: 'relative', top: 150 }}>The parent is <code>postion: fixed;</code></p>
      </Spacer>
    </Container>
  ))
  .add('Hover Intent', () => (
    <Container pad>
      <p>
        Tooltips should only appear when the user has paused on the target element.
        They should remain visible if the user briefly moves the mouse off and back on
        to the target.
      </p>
      <p>
        Similarly tooltips should not immediately disappear, unless the user hovers
        over another element with a tooltip.
      </p>
      <div style={{ display: 'flex', margin: '20px 0' }}>
        <Tooltip content="Content 1" placement="top">
          <Target color="purple" style={{ marginRight: 8 }}>Target 1</Target>
        </Tooltip>
        <Tooltip content="Content 2" placement="top">
          <Target color="blue" style={{ marginRight: 8 }}>Target 2</Target>
        </Tooltip>
        <Tooltip content="Content 3" placement="top">
          <Target color="teal" style={{ marginRight: 8 }}>Target 3</Target>
        </Tooltip>
        <Tooltip content="Content 4" placement="top">
          <Target color="green">Target 4</Target>
        </Tooltip>
      </div>
      <ol>
        <li>Mouse over, then off, a single target for a fade transition.</li>
        <li>Mouse between each target for an immediate transition.</li>
        <li>Mouse over, off briefly, then back over &mdash; there will be no transition.</li>
      </ol>
    </Container>
  ))
;

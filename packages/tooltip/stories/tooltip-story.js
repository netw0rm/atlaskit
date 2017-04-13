import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Tooltip, { TooltipStateless } from '../src/index';
import { name } from '../package.json';

import PositionExample from './PositionExample';
import { Container, Relative, Target } from './styled';

storiesOf(name, module)
  .add('a dumb tooltip', () => (
    <Container>
      <TooltipStateless position="top" description='Tooltip with position "top"' isVisible>
        <Target>Tooltips are great!</Target>
      </TooltipStateless>
    </Container>
  ))
  .add('a smart tooltip', () => (
    <Container>
      <Tooltip position="top" description='Tooltip with position "top"'>
        <Target>Hover over me</Target>
      </Tooltip>
    </Container>
  ))
  .add('a smart tooltip that changes position', () => (
    <Container>
      <PositionExample />
    </Container>
  ))
  .add('a smart tooltip in a relatively positioned parent', () => (
    <Relative>
      <PositionExample />
    </Relative>
  ));

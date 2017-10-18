import { storiesOf } from '@kadira/storybook';
import React, { Component } from 'react';

import Tooltip, { TooltipStateless } from '../src/index';
import { name } from '../package.json';

import PositionExample from './PositionExample';
import { Container, Relative, Target } from './styled';

const RelativeTrigger = props => <span style={{ display: 'inline-block' }} {...props} />;

class OldAPI extends Component {
  state ={ isVisible: false }
  render() {
    return (
      <Container>
        <TooltipStateless
          position="top"
          description='Tooltip with position "top"'
          isVisible={this.state.isVisible}
          onMouseOver={() => this.setState({ isVisible: true })}
          onMouseOut={() => this.setState({ isVisible: false })}
        >
          <Target>Tooltips are great!</Target>
        </TooltipStateless>
      </Container>
    );
  }
}

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
      <PositionExample trigger="div" />
    </Container>
  ))
  .add('a smart tooltip in a relatively positioned parent', () => (
    <Relative>
      <PositionExample trigger={RelativeTrigger} />
    </Relative>
  ))
  .add('old tooltip api', () => (
    <OldAPI />
  ))
;

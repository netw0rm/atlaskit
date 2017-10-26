import React, { Component } from 'react';
import styled from 'styled-components';

import { Spotlight, SpotlightTarget } from '../../../src';
import { Code, Highlight } from '../../styled';

const options = ['top right', 'top center', 'top left', 'right bottom', 'right middle', 'right top', 'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom'];

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

/* eslint-disable react/sort-comp */
export default class SpotlightDialogPlacementExample extends Component {
  state = {}
  next = () => this.setState(state => ({ index: state.index + 1 }))
  start = () => this.setState({ index: 0 })
  finish = () => this.setState({ index: undefined })
  render() {
    const { index } = this.state;
    const placement = isNaN(index) ? null : options[index % options.length];

    return (
      <Wrapper>
        <SpotlightTarget name="unique">
          <Highlight color="neutral">Target</Highlight>
        </SpotlightTarget>

        <p>Click the target to change the dialog&apos;s placement.</p>
        <p>Achieved by passing our handler to the <Code>targetOnClick</Code> property.</p>
        <p><button onClick={this.start}>Show</button></p>

        {placement ? (
          <Spotlight
            actions={[{ onClick: this.finish, text: 'Done' }]}
            dialogPlacement={placement}
            dialogWidth={300}
            heading={`"${placement}"`}
            key="unique"
            target="unique"
            targetOnClick={this.next}
          >
           A single line of innocuous text.
          </Spotlight>
        ) : null}
      </Wrapper>
    );
  }
}

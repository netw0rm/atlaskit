// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import type { Position } from '../src/state/types';
import Moveable from '../src/view/draggable/movable';

const Box = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${props => props.color};
`;

storiesOf('Moveable', module)
  .add('no movement', () => {
    const point: Position = { x: 0, y: 0 };
    const origin: Position = { x: 0, y: 0 };

    return (
      <Moveable offset={point} origin={origin}>
        <Box color="lightblue">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('with offset', () => {
    const point: Position = { x: 100, y: 100 };
    const origin: Position = { x: 100, y: 100 };

    return (
      <Moveable offset={point} origin={origin}>
        <Box color="lightgreen">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('moving from origin', () => {
    const point: Position = { x: 200, y: 200 };
    const origin: Position = { x: 0, y: 0 };

    return (
      <Moveable
        offset={point}
        origin={origin}
        onMoveEnd={action('onMoveEnd')}
      >
        <Box color="yellow">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('staged movements', () => {
    const fireAction = action('onMoveEnd');

    class App extends PureComponent {
      state = {
        origin: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
      }

      componentDidMount() {
        this.onMoveEnd();
      }

      onMoveEnd = () => {
        fireAction();
        const { offset } = this.state;
        const newOffset = {
          x: (offset.x + 40) % 200,
          y: offset.y,
        };

        this.setState({
          origin: offset,
          offset: newOffset,
        });
      }

      render() {
        const { offset, origin } = this.state;
        return (
          <Moveable
            origin={origin}
            offset={offset}
            onMoveEnd={this.onMoveEnd}
          >
            <Box color="pink">
              offset: (x: {offset.x}, y: {offset.y})
            </Box>
          </Moveable>
        );
      }
    }

    return <App />;
  });

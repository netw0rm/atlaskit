// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf, action } from '@kadira/storybook';
import type { Position } from '../src/types';
import Moveable from '../src/view/moveable';

const Box = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${props => props.color};
`;

storiesOf('Moveable', module)
  .add('no movement', () => {
    const point: Position = { x: 0, y: 0 };

    return (
      <Moveable destination={point} speed="NONE" zIndex="auto">
        <Box color="lightblue">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('with destination but no animation', () => {
    const point: Position = { x: 100, y: 100 };

    return (
      <Moveable destination={point} speed="NONE" zIndex="auto">
        <Box color="lightgreen">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('moving from origin with animation', () => {
    const point: Position = { x: 200, y: 200 };

    return (
      <Moveable
        destination={point}
        speed="STANDARD"
        zIndex="auto"
        onMoveEnd={action('onMoveEnd')}
      >
        <Box color="yellow">
          offset: (x: {point.x}, y: {point.y})
        </Box>
      </Moveable>
    );
  })
  .add('staged movements with animation', () => {
    const fireAction = action('onMoveEnd');

    class App extends PureComponent {
      state = {
        destination: { x: 0, y: 0 },
      }

      componentDidMount() {
        this.onMoveEnd();
      }

      onMoveEnd = () => {
        fireAction();
        const { destination } = this.state;
        const newDestination = {
          x: (destination.x + 40) % 200,
          y: destination.y,
        };

        this.setState({
          destination: newDestination,
        });
      }

      render() {
        const { destination } = this.state;
        return (
          <Moveable
            speed="STANDARD"
            destination={destination}
            onMoveEnd={this.onMoveEnd}
            zIndex="auto"
          >
            <Box color="pink">
              offset: (x: {destination.x}, y: {destination.y})
            </Box>
          </Moveable>
        );
      }
    }

    return <App />;
  });

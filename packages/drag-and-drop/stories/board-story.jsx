// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import { dragDropContext, draggable, droppable } from '../src/index';

const Card = (() => {
  const Container = styled.div`
    background-color: blue;
  `;
  return class extends PureComponent {
    props: {
      description: string,
      title: string,
    }
    render() {
      const { description, title } = this.props;
      return (
        <Container>
          <div>{title}</div>
          <div>{description}</div>
        </Container>
      );
    }
  };
})();

storiesOf('board', module)
  .add('hold on to your hats', () => (
    <Card
      title="My first card"
      description="Do something really awesome"
    />
  ));

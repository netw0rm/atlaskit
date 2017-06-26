// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Draggable from '../../src/view/draggable/connected-draggable';
import type { PersonType } from '../types';
import type { Provided } from '../../src/view/draggable/draggable-types';

const Container = styled.a`
  border-radius: 2px;
  background-color: ${({ isDragging }) => (isDragging ? '#2684FF' : 'white')};
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  padding: 8px;
  display: block;
  height: 80px;
  margin-bottom: 8px;
  user-select: none;
`;

type Props = {|
  data: PersonType
|}

export default class Person extends PureComponent {
  props: Props

  render() {
    const { data } = this.props;
    return (
      <Draggable
        draggableId={data.id}
        type="PERSON"
        isDragEnabled
      >
        {(provided: Provided) => (
          <div>
            <Container
              innerRef={ref => provided.innerRef(ref)}
              href={data.name}
              isDragging={provided.isDragging}
              style={provided.containerStyle}
              {...provided.dragHandleProps}
            >
              {data.name}
            </Container>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

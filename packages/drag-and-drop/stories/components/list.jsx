// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { droppable } from '../../src/';
import type { OwnProps, StateSnapshot } from '../../src/view/droppable/droppable-types';

const Container = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'lightyellow' : 'lightblue')};
  display: flex;
  flex-direction: column;
  padding: 8px;
  padding-bottom: 0;
  user-select: none;
  width: 250px;
`;

class List extends PureComponent {
  props: {|
    listId: string,
    children?: any,
    innerRef: (Element) => void,
    isDraggingOver: boolean,
  |}

  render() {
    return (
      <Container
        isDraggingOver={this.props.isDraggingOver}
        innerRef={this.props.innerRef}
      >
        {this.props.children}
      </Container>
    );
  }
}

const provide = (ownProps: OwnProps) => ({
  id: ownProps.listId,
});

const mapStateToProps = (state: StateSnapshot) => ({
  isDraggingOver: state.isDraggingOver,
});

export default droppable('PERSON', 'vertical', provide, mapStateToProps)(List);

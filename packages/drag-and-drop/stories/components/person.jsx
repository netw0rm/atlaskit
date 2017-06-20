// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { draggable } from '../../src/';
import type { PersonType } from '../types';
import type { StateSnapshot } from '../../src/view/draggable/draggable-types';

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

const avatarWidth: number = 40;

const Avatar = styled.img`
  border-radius: 50%;
  height: ${avatarWidth}px;
  width: ${avatarWidth}px;
`;

type OwnProps = {|
  data: PersonType
|}

type InjectedProps = {|
  handleProps: Object,
  innerRef: (Element) => void,
  isDragging: boolean
|}

class Person extends PureComponent {
  props: OwnProps & InjectedProps

  render() {
    const { data, handleProps, innerRef, isDragging } = this.props;
    return (
      <Container
        innerRef={ref => innerRef(ref)}
        isDragging={isDragging}
        {...handleProps}
      >
        {data.name}
        <Avatar src={`https://api.adorable.io/avatars/${avatarWidth}/${data.id}@adorable.png`} />
      </Container>
    );
  }
}

const provide = (ownProps: OwnProps) => ({
  id: ownProps.data.id,
});

const mapStateToProps = (state: StateSnapshot) => ({
  isDragging: state.isDragging,
});

export default draggable('PERSON', provide, mapStateToProps)(Person);

// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';
import droppable from '../src/view/droppable/';
import { dragDropContext } from '../src/';

const Badge = styled.div`
  height: 100px;
  width: 200px;
  padding: 8px;
  background: lightgrey;
  border: 1px solid grey;
  display: flex;
  align-items: center;
`;

class Container extends PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const Context = dragDropContext(Container);

const provide = ownProps => ({
  id: '1',
});
const Droppable = dragDropContext(droppable('TYPE', provide)(Container));

storiesOf('draggable', module)
  .add('basic', () => {
    class Item extends PureComponent {
      render() {
        return (<Badge>basic drag handle</Badge>);
      }
    }
    const provide = () => ({
      id: '10',
    });

    const Connected = draggable('TYPE', provide)(Item);

    return (
      <Context>
        <Droppable>
          <Connected />
        </Droppable>
      </Context>
    );
  })
  .add('custom drag handle', () => {
    const Avatar = styled.img`
      border-radius: 50%;
      vertical-align: middle;
      height: 60px;
      width: 60px;
    `;

    const Description = styled.div`
      margin-left: 16px;
    `;

    class App extends PureComponent {
      props: {
        dragHandle: Function
      }

      render() {
        const { dragHandle } = this.props;
        return (
          <Badge>
            {dragHandle(<Avatar draggable="false" alt="Alex" src="https://api.adorable.io/avatars/60/alex%40adorable.io" />)}
            <Description>Some cool text about Alex that is not a handle</Description>
          </Badge>
        );
      }
    }

    const provide = () => ({
      id: '5',
    });

    const mapStateToProps = (ownProps, state, requestDragHandle) => ({
      dragHandle: requestDragHandle(),
    });

    const Connected = draggable('TYPE', provide, mapStateToProps)(App);

    return (
      <Context>
        <Droppable>
          <Connected />
        </Droppable>
      </Context>
    );
  });

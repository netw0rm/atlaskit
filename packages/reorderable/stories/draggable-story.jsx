// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';
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

    const Connected = dragDropContext(draggable('TYPE', provide)(Item));

    return <Connected />;
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

    const Connected = dragDropContext(draggable('CUSTOM', provide, mapStateToProps)(App));

    return <Connected />;
  });

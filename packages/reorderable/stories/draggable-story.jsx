// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';
import { dragDropContext } from '../src/';

storiesOf('draggable', module)
  .add('basic', () => {
    class Item extends PureComponent {
      render() {
        return (<div>basic drag handle</div>);
      }
    }
    const provide = () => ({
      id: '10',
    });

    const Connected = draggable('TYPE', provide)(Item);

    return dragDropContext(Connected);
  })
  .add('custom drag handle', () => {
    class App extends PureComponent {
      props: {
        dragHandle: Function
      }

      render() {
        const { dragHandle } = this.props;
        return (
          <div>
            outer that is not the handle
            {dragHandle(<div>this is the drag handle</div>)}
          </div>
        );
      }
    }

    const provide = () => ({
      id: '5',
    });

    const mapStateToProps = (ownProps, state, requestDragHandle) => ({
      dragHandle: requestDragHandle(),
    });

    const Connected = draggable('CUSTOM', provide, mapStateToProps)(App);

    return dragDropContext(Connected);
  });

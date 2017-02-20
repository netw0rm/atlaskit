// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';

class Item extends PureComponent {
  props: {
    itemId: string
  }

  render() {
    return (<div>item id: {this.props.itemId}</div>);
  }
}

storiesOf('draggable', module)
  .add('basic', () => {
    const provide = ownProps => ({
      id: ownProps.itemId,
    });

    // const mapStateToProps = (ownProps, state, getDragHandle) => ({

    // });

    const Connected = draggable('TYPE', provide)(Item);

    return <Connected itemId="5" />;
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

    return <Connected />;
  });

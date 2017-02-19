import React, { PureComponent } from 'react';
import draggable from '../../src/';

class Foo extends PureComponent {
  render() {
    return <div>bar</div>;
  }
}

const provide = ownProps => ({
  id: ownProps.cardId,
});

const map = draggableState => ({
  isDragging: draggableState.isDragging,
});

export default draggable('TACO', provide, map)(Foo);

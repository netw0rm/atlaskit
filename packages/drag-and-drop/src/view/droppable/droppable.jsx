import React, { PureComponent } from 'react';
import type { Props, Provided, StateSnapshot, DefaultProps } from './droppable-types';
import { DroppableDimensionPublisher } from '../dimension-publisher/';

type State = {|
  ref: ?Element,
|}

export default class Droppable extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  state: State

  state: State = {
    ref: null,
  }

  static defaultProps: DefaultProps = {
    type: 'DEFAULT',
    isDragEnabled: true,
  }
  /* eslint-enable */

  setRef = (ref: ?Element) => {
    // need to trigger a child render when ref changes
    this.setState({
      ref,
    });
  }

  render() {
    const provided: Provided = {
      innerRef: this.setRef,
    };
    const snapshot: StateSnapshot = {
      isDraggingOver: this.props.isDraggingOver,
    };

    return (
      <DroppableDimensionPublisher
        itemId={this.props.droppableId}
        type={this.props.type}
        targetRef={this.state.ref}
      >
        {this.props.children(provided, snapshot)}
      </DroppableDimensionPublisher>
    );
  }
}

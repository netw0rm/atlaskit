/* // @flow
import React, { PureComponent } from 'react';
import type { HOC, ReactClass } from './types';

type ProvidedDraggableState = {|
  id: ItemIdentifier,
  isDropEnabled ?: boolean
|}

type DraggableState = {|
  isDragging: boolean,
  getDragHandle: Function,
  // orderChange?
|}

type DraggableHooks = {|
  // ? needs to fire before isDropEnabled checks
  onDragStart: (id: ItemIdentifier) => void,
  onDragEnd: (id: ItemIdentifier) => void,
|}

// export default (a, b): HOC => (WrappedComponent) =>

const selector = (appState: Object, ownProps: Object, provided: $Shape<ProvidedDraggableState>): DraggableState => {
  const id: ItemIdentifier = provided.id;

  return {
    isDragging: true,
    getDragHandle: () => { },
  };
};

type Context = {
  store: any
}

export default (type: TypeIdentifier,
  provide: (props: Object) => $Shape<ProvidedDraggableState>,
  mapDraggableStateToProps: (state: DraggableState) => Object,
  hooks: DraggableHooks
): HOC => (WrappedComponent: ReactClass) =>
  // console.log('hello');

   class extends PureComponent {
     store: any
     unsubscribe: Function
     state: DraggableState

     constructor(...args) {
      super(...args);
      this.store = this.context.dragDropStore;
    }

     contextTypes: Context

     componentDidMount() {
      this.unsubscribe = this.store.subscribe(() => {
        const newState = selector(this.store.getState(), this.props, provide(this.props));

        // lean on PureComponent shallow check
        this.setState(newState);
      });
    }

     componentWillUnmount() {
      this.unsubscribe();
    }

     render() {
      const newProps = {
        ...this.props,
        ...mapDraggableStateToProps(this.state),
      };

      return (
        <div>
          <WrappedComponent {...newProps} />
        </div>
      );
    }
  };*/

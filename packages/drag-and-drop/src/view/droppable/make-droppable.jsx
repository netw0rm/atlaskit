// @flow
import React, { PureComponent } from 'react';
import type { MapStateToProps, Props, StateSnapshot } from './droppable-types';
import type { TypeId } from '../../types';
import { DroppableDimensionPublisher } from '../dimension-publisher/';
import getDisplayName from '../get-display-name';

type ComponentState = {|
  ref: ?Element,
|}

export default (type: TypeId, map: MapStateToProps): Function =>
  (Component: ReactClass<any>): ReactClass<any> =>
    class Droppable extends PureComponent {
      static displayName = `Droppable(${getDisplayName(Component)})`

      /* eslint-disable react/sort-comp */
      props: Props
      state: ComponentState

      state: ComponentState = {
        ref: null,
      }
      /* eslint-enable */

      setRef = (ref: ?Element) => {
        // need to trigger a child render when ref changes
        this.setState({
          ref,
        });
      }

      render() {
        const { mapProps, ownProps } = this.props;

        const snapshot: StateSnapshot = {
          isDraggingOver: mapProps.isDraggingOver,
        };

        const additionalProps = map(snapshot, ownProps);

        const enhancedProps = {
          ...ownProps,
          ...additionalProps,
        };

        return (
          <DroppableDimensionPublisher
            itemId={mapProps.id}
            type={type}
            targetRef={this.state.ref}
          >
            <Component {...enhancedProps} innerRef={this.setRef} />
          </DroppableDimensionPublisher>
        );
      }
  };

// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import type { MapStateToProps, Props, StateSnapshot } from './droppable-types';
import type { TypeId } from '../../types';
import { DroppableDimensionPublisher } from '../dimension-publisher/';
import getDisplayName from '../get-display-name';
import ScrollTopWatcher from '../scroll-top-watcher/';

const Container = styled.div`
  user-select: none;
`;

type ComponentState = {|
  ref: ?Element,
|}

export default (type: TypeId, map: MapStateToProps): Function =>
  // Component must be a styled-component
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
          <Container isDraggingOver={mapProps.isDraggingOver} >
            <DroppableDimensionPublisher
              itemId={mapProps.id}
              type={type}
              targetRef={this.state.ref}
            >
              <Component {...enhancedProps} innerRef={this.setRef} />
            </DroppableDimensionPublisher>
          </Container>
        );
      }
  };

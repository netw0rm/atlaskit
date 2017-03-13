// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DroppableDimensionPublisher } from '../dimension-publisher/';
import getDisplayName from '../get-display-name';
import storeKey from '../../state/get-store-key';
import makeSelector from './make-droppable-selector';
import type { Provide, MapState, Props, OwnProps, MapProps, DroppableState } from './droppable-types';
import type { Direction, TypeId, State } from '../../types';
import ScrollTopWatcher from '../scroll-top-watcher/';

const Container = styled.div`
  user-select: none;
`;

type ComponentState = {|
  ref: ?Element,
|}

export default (type: TypeId,
  direction: Direction,
  provide: Provide,
  map?: MapState = () => ({})) =>
  // Component must be a styled-component
  (Component: any): any => {
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
        console.log('rendering droppable', mapProps.id);

        const snapshot: DroppableState = {
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
              <ScrollTopWatcher
                shouldPublish={mapProps.isDraggingOver}
                droppableId={mapProps.id}
                targetRef={this.state.ref}
              >
                <Component {...enhancedProps} innerRef={this.setRef} />
              </ScrollTopWatcher>
            </DroppableDimensionPublisher>
          </Container>
        );
      }
    }

    const makeMapStateToProps = () => {
      const selector = makeSelector(provide);

      const mapStateToProps = (state: State, props: OwnProps) =>
        selector(state, props);

      return mapStateToProps;
    };

    const mergeProps = (mapProps: MapProps,
      dispatchProps: void,
      ownProps: OwnProps): Props => ({
        mapProps,
        ownProps,
      });

    return connect(makeMapStateToProps, null, mergeProps, { storeKey })(Droppable);
  };

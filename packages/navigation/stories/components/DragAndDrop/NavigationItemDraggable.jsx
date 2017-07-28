// @flow

import React, { PureComponent } from 'react';
import { Draggable } from '@atlaskit/drag-and-drop';
import { AkNavigationItem } from '@atlaskit/navigation';

import type { ReactElement, DragProvided } from '../../../src/types';

type Props = {|
  children?: ReactElement,
  /** Unique identifier used for drag and drop operations */
  draggableId: string,
  /** Optional drag type to restrict dragging between groups. */
  draggableType?: string,
|}

export default class NavigationItemDraggable extends PureComponent {
  props: Props

  render() {
    const {
      children,
      draggableId,
      draggableType,
      ...otherProps
    } = this.props;

    return (
      <Draggable draggableId={draggableId} type={draggableType}>
        {(provided: DragProvided, { isDragging }) => (
          <div>
            <AkNavigationItem
              {...otherProps}
              dnd={provided}
              isDragging={isDragging}
            >
              {children}
            </AkNavigationItem>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

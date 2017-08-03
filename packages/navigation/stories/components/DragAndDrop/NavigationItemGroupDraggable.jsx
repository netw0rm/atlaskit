// @flow
import React, { PureComponent } from 'react';
import { AkNavigationItemGroup } from '@atlaskit/navigation';
import { Droppable } from '@atlaskit/drag-and-drop';
import type { ReactElement } from '../../../src/types';

type Props = {|
  /** React element to be displayed to the right of the group header. */
  action?: ReactElement,
  /** React Elements to be displayed within the group. This should generally be
  a collection of NavigationItems. */
  children?: ReactElement,
  /** Unique identifier for the drag group. */
  droppableId: string,
  /** Required group type to restrict dragging between groups. */
  droppableType: string,
  /** Set whether the text should be compacted. */
  isCompact?: boolean,
  /** Set whether a separator should appear above the group. */
  hasSeparator?: boolean,
  /** Text to appear as heading above group. Will be auto-capitalised. */
  title?: string,
|};

export default class NavigationItemGroupDraggable extends PureComponent {
  static defaultProps = {
    isCompact: false,
    hasSeparator: false,
  }

  props: Props

  render() {
    const {
      action,
      children,
      droppableId,
      droppableType,
      hasSeparator,
      isCompact,
      title,
    } = this.props;

    return (
      <AkNavigationItemGroup
        action={action}
        hasSeparator={hasSeparator}
        isCompact={isCompact}
        title={title}
      >
        <Droppable droppableId={droppableId} type={droppableType}>
          {provided => (
            <div ref={provided.innerRef}>{children}</div>
          )}
        </Droppable>
      </AkNavigationItemGroup>
    );
  }
}

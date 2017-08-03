// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectionCacheContext } from '../../util/contextNamespace';
import type { CachedItem, GroupId, ItemId } from '../../types';

export default class DropdownItemSelectionCache extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    [selectionCacheContext]: PropTypes.shape({
      isItemSelected: PropTypes.func,
      itemsInGroup: PropTypes.func,
      itemSelectionsChanged: PropTypes.func,
    }),
  };

  // Need to store selectedItemValues in state rather than component instance property
  // to ensure that re-render happens down the tree via context when selectedItemValues
  // is updated.
  state = {
    selectedItems: [],
  }

  getChildContext() {
    return {
      [selectionCacheContext]: {
        // This function returns true/false describing whether the supplied navigation item
        // (which must have a unique item and group ID) is currently selected - this is used
        // by radio and checkbox dropdown items to retreive their 'selected' state when they
        // re-mount, which happens when the dropdown is closed and then re-opened.
        isItemSelected: (groupId: GroupId, itemId: ItemId): boolean => {
          const { selectedItems } = this.state;

          // Can't use Array.prototype.find here
          for (let i = 0; i < this.state.selectedItems.length; i++) {
            if (selectedItems[i].id === itemId && selectedItems[i].groupId === groupId) {
              return true;
            }
          }

          return false;
        },
        itemsInGroup: (groupId: GroupId) => (
          this.state.selectedItems.filter((item: CachedItem) => item.groupId === groupId)
        ),
        itemSelectionsChanged: this.handleItemSelectionsChanged,
      },
    };
  }

  handleItemSelectionsChanged = (groupId: string, newGroupSelections: Array<CachedItem>): void => {
    const { selectedItems } = this.state;
    const newSelectedItems: Array<CachedItem> = [
      ...selectedItems.filter(item => item.groupId !== groupId),
      ...newGroupSelections,
    ];

    this.setState({ selectedItems: newSelectedItems });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

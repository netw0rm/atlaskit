// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selectionCacheContext, selectionManagerContext } from '../../util/contextNamespace';
import type { CachedItem, ItemId } from '../../types';

export default class DropdownItemSelectionManager extends Component {
  static propTypes = {
    behavior: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    groupId: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static childContextTypes = {
    [selectionManagerContext]: PropTypes.object,
  };

  static contextTypes = {
    [selectionCacheContext]: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      [selectionManagerContext]: {
        isItemSelected: (itemId: ItemId) => (
          this.context[selectionCacheContext].isItemSelected(this.props.groupId, itemId)
        ),
        itemClicked: this.handleItemClicked,
      },
    };
  }

  handleItemClicked = (clickedItemId: ItemId) => {
    const { behavior } = this.props;

    if (behavior === 'checkbox') {
      this.handleCheckboxItemClicked(clickedItemId);
    } else if (behavior === 'radio') {
      this.handleRadioItemClicked(clickedItemId);
    }
  }

  handleCheckboxItemClicked = (clickedItemId: ItemId) => {
    const { [selectionCacheContext]: cache } = this.context;
    const itemsInGroup = cache.itemsInGroup(this.props.groupId);

    const newSelections = cache.isItemSelected(this.props.groupId, clickedItemId)
      ? itemsInGroup.filter(item => item.id !== clickedItemId)
      : [...itemsInGroup, { id: clickedItemId, groupId: this.props.groupId }];

    this.updateCacheContextWithSelections(newSelections);
  }

  handleRadioItemClicked = (clickedItemId: ItemId) => {
    this.updateCacheContextWithSelections(
      [{ id: clickedItemId, groupId: this.props.groupId }]
    );
  }

  updateCacheContextWithSelections = (itemSelections: Array<CachedItem>) => {
    this.context[selectionCacheContext].itemSelectionsChanged(this.props.groupId, itemSelections);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

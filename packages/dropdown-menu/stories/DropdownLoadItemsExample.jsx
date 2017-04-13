import React, { Component } from 'react';
import Button from '@atlaskit/button';

import DropdownMenu from '../src';
import { simpleDropdownItems } from './DropdownsData';

export default class DropWithBut extends Component {
  state = {
    isDropdownOpen: false,
    items: simpleDropdownItems,
  }

  render() {
    const onClickLoadMore = () => {
      const newItems = [].concat(
        simpleDropdownItems[0].items.push({ content: 'new item!!' })
      );
      this.setState({ items: newItems });
    };

    return (
      <div style={{ padding: '40px' }}>
        <button onClick={onClickLoadMore}>
          Load more items!
        </button>
        <div style={{ padding: '20px 0' }}>
          <DropdownMenu
            items={simpleDropdownItems}
            isTriggerNotTabbable
            onOpenChange={attrs => this.setState({ isDropdownOpen: attrs.isOpen })}
          >
            <Button isSelected={this.state.isDropdownOpen}>
              Click me, I&#39;m just a button
            </Button>
          </DropdownMenu>
        </div>
      </div>
    );
  }
}

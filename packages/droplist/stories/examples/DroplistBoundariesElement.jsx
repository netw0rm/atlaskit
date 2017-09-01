// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item, { ItemGroup } from '@atlaskit/item';
import DropList from '../../src';

const items = Array(4).fill(true).map((item, index) => (
  <Item key={index}>Item {index + 1}</Item>
));

class BoundariesElementExample extends Component {
  static propTypes : Object = {
    appearance: PropTypes.oneOf(['normal', 'tall']),
    withGroup: PropTypes.bool,
  }

  componentDidMount() {
    this.scroll.scrollTop = 200;
  }

  render() {
    const content = this.props.withGroup ? (
      <ItemGroup title="Items">
        {items}
      </ItemGroup>
    ) : items;
    return (
      <div>
        <p>Scroll up to reposition the droplist</p>
        <div
          style={{ border: '1px solid black', height: '200px', width: '300px', overflow: 'scroll' }}
          ref={ref => { this.scroll = ref; }}
        >
          <div style={{ width: '300px', height: '600px', paddingTop: '200px' }} >
            <DropList
              appearance={this.props.appearance}
              boundariesElement="scrollParent"
              isOpen
              trigger="Hello"
            >
              {content}
            </DropList>
          </div>
        </div>
      </div>
    );
  }
}

export default (
  <BoundariesElementExample />
);

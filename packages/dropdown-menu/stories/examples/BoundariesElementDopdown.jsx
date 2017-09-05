import React, { PureComponent } from 'react';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

class BoundariesElementExample extends PureComponent {
  state = {
    selectedIndex: 0,
  }

  componentDidMount() {
    this.scroll.scrollTop = 200;
  }

  render() {
    const content =
      (<DropdownItemGroup>
        <DropdownItem>This item a DropdownItem</DropdownItem>
        <DropdownItem>Another DropdownItem</DropdownItem>
      </DropdownItemGroup>);
    return (
      <div>
        <p>Expand and scroll up to reposition the menu</p>
        <div
          style={{ border: '1px solid black', height: '200px', width: '300px', overflow: 'scroll' }}
          ref={ref => { this.scroll = ref; }}
        >
          <div style={{ width: '300px', height: '600px', paddingTop: '200px' }} >
            <DropdownMenu
              appearance={this.props.appearance}
              boundariesElement="scrollParent"
              triggerType="button"
            >
              {content}
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
}

export default (
  <BoundariesElementExample />
);

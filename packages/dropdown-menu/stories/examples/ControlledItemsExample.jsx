import React, { PureComponent } from 'react';
import DropdownMenu, {
  DropdownItemGroupCheckbox,
  DropdownItemGroupRadio,
  DropdownItemCheckbox,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';

export default class ControlledItemsExample extends PureComponent {
  state = {
    selectedIndex: 0,
  }

  componentDidMount() {
    this.interval = setInterval(this.nextIndex, 500);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  setIndex = (selectedIndex) => () => this.setState({ selectedIndex });

  nextIndex = () => {
    const next = this.state.selectedIndex + 1;
    this.setState({
      selectedIndex: next === 4 ? 0 : next,
    });
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <div>
        <p>
          This story shows that you can programatically control the selected state of each radio or
          checkbox item.
        </p>
        <p>
          Based on the selected index updated each 500ms, the checkbox items below show up in pairs,
          and the radio items show up one at a time.
        </p>
        <p>
          You can click on any item to cause the selected index to be set for the whole example.
        </p>
        <p>Selected index: {selectedIndex}</p>
        <DropdownMenu
          defaultOpen
          trigger="Open dropdown"
          triggerType="button"
          appearance="tall"
          position="bottom right"
          shouldFlip={false}
        >
          <DropdownItemGroupCheckbox id="checkboxes" title="Checkbox items">
            {
              [0, 1, 2, 3].map(index => (
                <DropdownItemCheckbox
                  key={index}
                  id={`checkbox-${index}`}
                  isSelected={selectedIndex === index || selectedIndex - 1 === index}
                  onClick={this.setIndex(index)}
                >
                  Item {index}
                </DropdownItemCheckbox>
              ))
            }
          </DropdownItemGroupCheckbox>
          <DropdownItemGroupRadio id="radios" title="Radio items">
            {
              [0, 1, 2, 3].map(index => (
                <DropdownItemRadio
                  key={index}
                  id={`radio-${index}`}
                  isSelected={selectedIndex === index}
                  onClick={this.setIndex(index)}
                >
                  Item {index}
                </DropdownItemRadio>
              ))
            }
          </DropdownItemGroupRadio>
        </DropdownMenu>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { StatelessMultiSelect } from '@atlaskit/multi-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'sydney' },
      { content: 'Canberra', value: 'canberra' },
    ],
  },
  {
    heading: 'Animals',
    items: [
      { content: 'Sheep', value: 'sheep' },
      { content: 'Cow', value: 'cow', isDisabled: true },
    ],
  },
];

export default class StatelessExample extends PureComponent {
  state = {
    isOpen: false,
    filterValue: '',
  }

  onSelected = (item) => {
    let newSelectedItems;
    if (!this.state.selectedItems) newSelectedItems = [item];
    else newSelectedItems = [...this.state.selectedItems, item];
    this.setState({
      isOpen: false,
      selectedItems: newSelectedItems,
      filterValue: '',
    });
  }
  onRemoved = (item) => {
    this.setState({
      selectedItems: this.state.selectedItems.filter(i => i.value !== item.value),
    });
  }
  toggleOpen = ({ isOpen }) => this.setState({ isOpen })
  updateFilter = filterValue => this.setState({ filterValue })

  render() {
    return (
      <div>
        <StatelessMultiSelect
          items={selectItems}
          placeholder="Choose a City"
          isOpen={this.state.isOpen}
          onOpenChange={this.toggleOpen}
          hasAutocomplete
          onFilterChange={this.updateFilter}
          filterValue={this.state.filterValue}
          onSelected={this.onSelected}
          onRemoved={this.onRemoved}
          selectedItems={this.state.selectedItems}
        />
      </div>
    );
  }
}

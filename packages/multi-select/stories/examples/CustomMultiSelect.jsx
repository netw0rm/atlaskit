import React, { PureComponent, PropTypes } from 'react';

import { StatelessMultiSelect } from '@atlaskit/multi-select';

export default class CustomMultiSelect extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    shouldFocus: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    items: StatelessMultiSelect.propTypes.items, // Array, same shape as StatelessMultiSelect
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    isDisabled: false,
    shouldFocus: false,
    isDefaultOpen: false,
    isRequired: false,
  }

  // we need to keep track of this state ourselves and pass it back into the StatelessMultiSelect
  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItems: [],
    filterValue: '',
    // we could also keep track of isInvalid here
  }

  selectItem = (item) => {
    const selectedItems = [...this.state.selectedItems, item];
    this.setState({ selectedItems });
  }

  removeItem = (item) => {
    const selectedItems = this.state.selectedItems.filter(i => i.value !== item.value);
    this.setState({ selectedItems });
  }

  selectedChange = (item) => {
    if (this.state.selectedItems.some(i => i.value === item.value)) {
      this.removeItem(item);
    } else {
      this.selectItem(item);
    }
    // we would update isInvalid here
  }

  handleFilterChange = (value) => {
    this.setState({ filterValue: value });
  }

  handleOpenChange = (attrs) => {
    console.log(attrs);
    this.setState({ isOpen: attrs.isOpen });
  }

  render() {
    return (
      <StatelessMultiSelect
        filterValue={this.state.filterValue}
        id={this.props.id}
        isDisabled={this.props.isDisabled}
        isOpen={this.state.isOpen}
        isRequired={this.props.isRequired}
        items={this.props.items}
        label={this.props.label}
        name={this.props.name}
        noMatchesFound="Uh oh! No matches found!"
        onFilterChange={this.handleFilterChange}
        onOpenChange={this.handleOpenChange}
        onRemoved={this.selectedChange}
        onSelected={this.selectedChange}
        placeholder={this.props.placeholder}
        selectedItems={this.state.selectedItems}
        shouldFocus={this.props.shouldFocus}
        shouldFitContainer
      />
    );
  }
}

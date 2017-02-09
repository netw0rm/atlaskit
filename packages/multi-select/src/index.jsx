import React, { PureComponent, PropTypes } from 'react';
import Item from '@atlaskit/droplist-item';

import StatelessMultiSelect from './StatelessMultiSelect';

export default class AkMultiSelect extends PureComponent {
  static propTypes = {
    defaultSelected: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    name: PropTypes.string,
    noMatchesFound: PropTypes.string,
    onFilterChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    defaultSelected: [],
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    onFilterChange: () => {},
    onOpenChange: () => {},
    onSelectedChange: () => {},
    position: 'bottom left',
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItems: this.props.defaultSelected,
    filterValue: '',
  }

  selectItem = (item) => {
    const selectedItems = [item].concat(this.state.selectedItems);
    this.setState({ selectedItems });
    this.props.onSelectedChange({ items: selectedItems, action: 'select', changed: item });
  }

  removeItem = (item) => {
    const selectedItems = this.state.selectedItems.filter(i => i.value !== item.value);
    this.setState({ selectedItems });
    this.props.onSelectedChange({ items: selectedItems, action: 'remove', changed: item });
  }

  selectedChange = (item) => {
    if (this.state.selectedItems.some(i => i.value === item.value)) {
      this.removeItem(item);
    } else {
      this.selectItem(item);
    }
  }

  handleFilterChange = (value) => {
    this.props.onFilterChange(value);
    this.setState({ filterValue: value });
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  render = () => (
    <StatelessMultiSelect
      filterValue={this.state.filterValue}
      id={this.props.id}
      isDisabled={this.props.isDisabled}
      isFirstChild={this.props.isFirstChild}
      isInvalid={this.props.isInvalid}
      isOpen={this.state.isOpen}
      isRequired={this.props.isRequired}
      items={this.props.items}
      label={this.props.label}
      name={this.props.name}
      noMatchesFound={this.props.noMatchesFound}
      onFilterChange={this.handleFilterChange}
      onOpenChange={this.handleOpenChange}
      onRemoved={this.selectedChange}
      onSelected={this.selectedChange}
      placeholder={this.props.placeholder}
      position={this.props.position}
      selectedItems={this.state.selectedItems}
      shouldFitContainer={this.props.shouldFitContainer}
    />
  );
}

export { StatelessMultiSelect };

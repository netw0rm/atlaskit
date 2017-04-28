import React, { PureComponent, PropTypes } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import DummyItem from './internal/DummyItem';
import DummyGroup from './internal/DummyGroup';
import StatelessMultiSelect from './StatelessMultiSelect';
import { appearances } from './internal/appearances';

const itemShape = DummyItem.propTypes;
const groupShape = DummyGroup.propTypes;

export default class AkMultiSelect extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(appearances.values),
    defaultSelected: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    shouldFocus: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape(groupShape)),
    label: PropTypes.string,
    name: PropTypes.string,
    noMatchesFound: PropTypes.string,
    onFilterChange: PropTypes.func,
    onSelectedChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    icon: PropTypes.node,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    defaultSelected: [],
    isOpen: false,
    shouldFocus: false,
    isRequired: false,
    items: [],
    label: '',
    onFilterChange: () => {},
    onOpenChange: () => {},
    onSelectedChange: () => {},
    position: 'bottom left',
    icon: <ExpandIcon label="" />,
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItems: this.props.defaultSelected,
    filterValue: '',
  }

  selectItem = (item) => {
    const selectedItems = [...this.state.selectedItems, item];
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

  render() {
    return (
      <StatelessMultiSelect
        appearance={this.props.appearance}
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
        shouldFocus={this.props.shouldFocus}
        icon={this.props.icon}
        shouldFitContainer={this.props.shouldFitContainer}
      />
    );
  }
}

export { StatelessMultiSelect };

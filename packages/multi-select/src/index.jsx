import React, { PureComponent, PropTypes } from 'react';
import StatelessMultiSelect from './StatelessMultiSelect';

export default class AkMultiSelect extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    onSelectedChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    shouldFitContainer: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    onOpenChange: () => {},
    onSelected: () => {},
    onSelectedChange: () => {},
    onRemoved: () => {},
    placeholder: '',
    position: 'bottom left',
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItems: [],
  }

  selectItem = (item) => {
    this.setState({ selectedItems: [item].concat(this.state.selectedItems) });
    this.props.onSelectedChange({ items: this.state.selectedItems, action: 'select', changed: item });
  }

  removeItem = (item) => {
    this.setState({ selectedItems: this.state.selectedItems.filter(i => i.value !== item.value) });
    this.props.onSelectedChange({ items: this.state.selectedItems, action: 'remove', changed: item });
  }

  selectedChange = (item) => {
    if (this.state.selectedItems.some(i => i.value === item.value)) {
      this.removeItem(item);
    } else {
      this.selectItem(item);
    }
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  render = () => (
    <StatelessMultiSelect
      id={this.props.id}
      isDisabled={this.props.isDisabled}
      isInvalid={this.props.isInvalid}
      isOpen={this.state.isOpen}
      isRequired={this.props.isRequired}
      items={this.props.items}
      label={this.props.label}
      onOpenChange={this.handleOpenChange}
      onSelected={this.selectedChange}
      onRemoved={this.selectedChange}
      placeholder={this.props.placeholder}
      position={this.props.position}
      selectedItems={this.state.selectedItems}
      shouldFitContainer={this.props.shouldFitContainer}
    />
  );
}

export { StatelessMultiSelect }; // eslint-disable-line import/prefer-default-export

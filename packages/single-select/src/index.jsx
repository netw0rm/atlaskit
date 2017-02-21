import React, { PureComponent, PropTypes } from 'react';
import StatelessSelect, { itemShape } from './StatelessSelect';
import { appearances } from './internal/appearances';

export default class AkSingleSelect extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(appearances.values),
    defaultSelected: itemShape,
    hasAutocomplete: PropTypes.bool,
    id: PropTypes.string,
    isFirstChild: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    name: PropTypes.string,
    noMatchesFound: PropTypes.string,
    onFilterChange: PropTypes.func,
    onSelected: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
    shouldFitContainer: PropTypes.bool,
    shouldFocus: PropTypes.bool,
  }

  static defaultProps = {
    appearance: appearances.default,
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    onFilterChange: () => {},
    onItemActivated: () => {},
    onOpenChange: () => {},
    onSelected: () => {},
    placeholder: '',
    position: 'bottom left',
    shouldFocus: false,
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItem: this.props.defaultSelected,
    filterValue: this.props.defaultSelected ? this.props.defaultSelected.content : '',
  }

  selectItem = (item) => {
    this.setState({ isOpen: false, selectedItem: item });
    this.props.onSelected({ item });
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  handleFilterChange = (value) => {
    this.props.onFilterChange(value);
    this.setState({ filterValue: value });
  }

  render() {
    return (
      <StatelessSelect
        appearance={this.props.appearance}
        filterValue={this.state.filterValue}
        hasAutocomplete={this.props.hasAutocomplete}
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
        onSelected={this.selectItem}
        placeholder={this.props.placeholder}
        position={this.props.position}
        selectedItem={this.state.selectedItem}
        shouldFitContainer={this.props.shouldFitContainer}
        shouldFocus={this.props.shouldFocus}
      />
    );
  }
}

export { StatelessSelect }; // eslint-disable-line import/prefer-default-export

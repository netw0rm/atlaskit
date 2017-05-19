import React, { PropTypes, PureComponent } from 'react';
import AkFieldRadioGroup from './RadioGroupStateless';
import { itemsDefault, itemsPropTypeSmart } from './constants';

export default class FieldRadioGroup extends PureComponent {
  static propTypes = {
    isRequired: PropTypes.bool,
    items: itemsPropTypeSmart,
    label: PropTypes.string,
    onRadioChange: PropTypes.func,
  }

  static defaultProps = {
    isRequired: false,
    items: itemsDefault,
    onRadioChange: () => {},
  }

  constructor() {
    super();
    this.state = {
      selectedValue: null, // Overrides default once user selects a value.
    };
  }

  getItems = () => {
    // If there is a user-selected value, then select that item
    if (this.state.selectedValue) {
      return this.props.items.map(item => (
        item.value === this.state.selectedValue
          ? { ...item, ...{ isSelected: true } }
          : item
      ));
    }

    // Otherwise, look for a defaultSelected item and select that item
    const hasDefaultSelected = this.props.items.some(item => item.defaultSelected);
    if (hasDefaultSelected) {
      return this.props.items.map(item => (
        item.defaultSelected
          ? { ...item, ...{ isSelected: true } }
          : item
      ));
    }
    return this.props.items;
  }

  changeHandler = (event) => {
    this.props.onRadioChange(event);
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    return (
      <AkFieldRadioGroup
        label={this.props.label}
        onRadioChange={this.changeHandler}
        isRequired={this.props.isRequired}
        items={this.getItems()}
      />
    );
  }
}

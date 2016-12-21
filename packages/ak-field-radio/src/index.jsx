import React, { PureComponent } from 'react';

import AkRadioGroup from './RadioGroup';
import AkRadio from './Radio';
import { itemsDefault, itemsPropTypeSmart } from './internal/constants';

export {
  AkRadioGroup,
  AkRadio,
};

export default class RadioGroup extends PureComponent {
  static propTypes = {
    items: itemsPropTypeSmart,
  }

  static defaultProps = {
    items: itemsDefault,
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
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    return (
      <AkRadioGroup
        {...this.props}
        onRadioChange={this.changeHandler}
        items={this.getItems()}
      />
    );
  }
}

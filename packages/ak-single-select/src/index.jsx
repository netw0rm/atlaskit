import React, { PureComponent, PropTypes } from 'react';
import StatelessSelect, { itemShape } from './StatelessSelect';

export default class AkSelect extends PureComponent {
  static propTypes = {
    defaultSelected: itemShape,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isDefaultOpen: PropTypes.bool,
    isRequired: PropTypes.bool,
    isInvalid: PropTypes.bool,
    items: React.PropTypes.array, // eslint-disable-line
    label: PropTypes.string,
    onSelected: PropTypes.func,
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
    onItemActivated: () => {},
    onOpenChange: () => {},
    onSelected: () => {},
    placeholder: '',
    position: 'bottom left',
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selectedItem: this.props.defaultSelected,
  }

  selectItem = (item) => {
    this.setState({ isOpen: false, selectedItem: item });
    this.props.onSelected({ item });
  }

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  render = () => (
    <StatelessSelect
      id={this.props.id}
      isDisabled={this.props.isDisabled}
      isInvalid={this.props.isInvalid}
      isOpen={this.state.isOpen}
      isRequired={this.props.isRequired}
      items={this.props.items}
      label={this.props.label}
      onOpenChange={this.handleOpenChange}
      onSelected={this.selectItem}
      placeholder={this.props.placeholder}
      position={this.props.position}
      selectedItem={this.state.selectedItem}
      shouldFitContainer={this.props.shouldFitContainer}
    />
  );
}

export { StatelessSelect }; // eslint-disable-line import/prefer-default-export

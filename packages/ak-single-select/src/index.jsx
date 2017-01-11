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
    items: React.PropTypes.arrayOf(itemShape),
    label: PropTypes.string,
    onSelected: PropTypes.func,
    onOpenChange: PropTypes.func,
    placeholder: PropTypes.string,
    position: PropTypes.string,
  }

  static defaultProps = {
    isOpen: false,
    isRequired: false,
    items: [],
    label: '',
    onItemActivated: () => {},
    onOpenChange: () => {},
    placeholder: '',
    position: 'bottom left',
  }

  state = {
    isOpen: this.props.isDefaultOpen,
    selected: this.props.defaultSelected,
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
      isRequired={this.props.isRequired}
      isInvalid={this.props.isInvalid}
      isOpen={this.state.isOpen}
      items={this.props.items}
      label={this.props.label}
      onSelected={this.selectItem}
      onOpenChange={this.handleOpenChange}
      placeholder={this.props.placeholder}
      position={this.props.position}
      selectedItem={this.state.selectedItem}
    />
  );
}

export { StatelessSelect }; // eslint-disable-line import/prefer-default-export

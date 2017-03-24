import React, { PureComponent, PropTypes } from 'react';
import SingleLineTextInput from '@atlaskit/input';
import StatelessSelect from './StatelessSelect';
import { InlineEdit } from '@atlaskit/inline-edit';
import { appearances } from './internal/appearances';

export default class InlineEditableSelect extends PureComponent {
  static propTypes = {
    items: PropTypes.array, // eslint-disable-line react/forbid-prop-types
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
    isEditing: false,
    editValue: this.props.items[0].items[0],
    readValue: this.props.items[0].items[0],
    isOpen: true,
    filterValue: this.props.defaultSelected ? this.props.defaultSelected.content : '',
  }

  selectItem = (item) => {
    this.setState({ isOpen: false, selectedItem: item });
    this.props.onSelected({ item });
  }

  onFilterChange = (value) => {
    this.props.onFilterChange(value);
    this.setState({ filterValue: value });
  }

  onBlur = () => this.onCancel();

  onConfirm = () => {
    console.log('onConfirm')
    this.setState(state => ({ readValue: state.editValue, isEditing: false }));
  }

  onCancel = () =>
    this.setState(state => ({ editValue: state.readValue, isEditing: false }))

  onSelect = (item) => {
    console.log('onSelect');
    this.setState({ isOpen: false, selectedItem: item, editValue: item }, this.onConfirm);
    this.props.onSelected({ item });
  }

  renderReadView = () => (
    <SingleLineTextInput
      isEditing={false}
      value={this.state.readValue.content}
    />
  )

  onOpenChange = (attrs) => {
    if (!attrs.isOpen) {
      this.onCancel();
    }
  }

  renderEditView = () => {
    return (<div style={{ margin: '1px -1px 1px 1px' }}>
      <StatelessSelect
        defaultSelected={this.state.editValue}
        isDefaultOpen
        shouldFocus
        {...this.props}
        onSelected={this.onSelect}
        onOpenChange={this.onOpenChange}
        onFilterChange={this.onFilterChange}
        selectedItem={this.state.editValue}
        isOpen={this.state.isOpen}
      />
    </div>);
  };

  render() {
    return (
      <InlineEdit
        editView={this.renderEditView()}
        readView={this.renderReadView()}
        isEditing={this.state.isEditing}
        onEditRequested={() => this.setState({ isEditing: true, isOpen: true })}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        disableEditViewFieldBase
        areActionButtonsHidden
        isLabelHidden
      />
    );
  }
}

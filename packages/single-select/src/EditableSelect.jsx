import React, { PureComponent, PropTypes } from 'react';
import SingleLineTextInput from '@atlaskit/input';
import StatelessSelect from './StatelessSelect';
import { InlineEdit, itemShape } from '@atlaskit/inline-edit';
import { appearances } from './internal/appearances';

export default class InlineEditableSelect extends PureComponent {
  static propTypes = {
    select: React.PropTypes.instanceOf(StatelessSelect).isRequired,
    initialValue: React.PropTypes.itemShape.isRequired,
  }

  state = {
    isEditing: false,
    editValue: this.props.initialValue,
    readValue: this.props.initialValue,
    isOpen: true,
    filterValue: this.props.initialValue ? this.props.initialValue.content : '',
  }

  selectItem = (item) => {
    this.setState({ isOpen: false, selectedItem: item });
  }

  onFilterChange = (value) => {
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
    this.setState({ isOpen: false, selectedItem: item, editValue: item }, this.onConfirm);
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
    const select = React.cloneElement(this.props.select, {
      defaultSelected: this.state.editValue,
      onSelected: this.onSelect,
      onOpenChange: this.onOpenChange,
      onFilterChange: this.onFilterChange,
      selectedItem: this.state.editValue,
      isOpen: this.state.isOpen,
      isDefaultOpen: true,
      shouldFocus: true,
    });

    return (<div style={{ margin: '1px -1px 1px 1px' }}>
      {select}
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

import React, { PureComponent, PropTypes } from 'react';
import { InlineEdit, itemShape } from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';
import StatelessSelect from './StatelessSelect';

export default class InlineEditableSelect extends PureComponent {
  static propTypes = {
    select: PropTypes.instanceOf(StatelessSelect).isRequired,
    initialValue: PropTypes.shape(itemShape).isRequired,
    label: PropTypes.string,
    isConfirmOnSelectEnabled: PropTypes.bool,
  }

  static defaultProps = {
    areActionButtonsHidden: false,
    isConfirmOnSelectEnabled: false,
  }

  state = {
    isEditing: false,
    editValue: this.props.initialValue,
    readValue: this.props.initialValue,
    filterValue: this.props.initialValue ? this.props.initialValue.content : '',
    isOpen: true,
  }

  onConfirm = () => {
    this.setState(state => ({ readValue: state.editValue, isEditing: false, isOpen: false }));
  }

  onCancel = () =>
    this.setState(state => ({ editValue: state.readValue, isEditing: false }))

  onSelect = (item) => {
    if (this.props.isConfirmOnSelectEnabled) {
      this.setState({ editValue: item }, this.onConfirm);
    } else {
      this.setState({ editValue: item, isOpen: false });
    }
  }

  onOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
  }

  renderReadView = () => (
    <SingleLineTextInput
      isEditing={false}
      value={this.state.readValue.content}
    />
  )

  renderEditView = () => {
    const select = React.cloneElement(this.props.select, {
      onSelected: this.onSelect,
      onOpenChange: this.onOpenChange,
      onFilterChange: this.onFilterChange,
      selectedItem: this.state.editValue,
      isOpen: this.state.isOpen,
      isDefaultOpen: true,
      shouldFocus: true,
      shouldFitContainer: true,
      onBlur: this.onBlur,
    });

    return (<div style={{ margin: '1px -1px 1px 1px' }}>
      {select}
    </div>);
  }

  render() {
    return (
      <InlineEdit
        label={this.props.label}
        editView={this.renderEditView()}
        readView={this.renderReadView()}
        isEditing={this.state.isEditing}
        onEditRequested={() => this.setState({ isEditing: true, isOpen: true })}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        disableEditViewFieldBase
        areActionButtonsHidden={this.state.isOpen || this.props.isConfirmOnSelectEnabled}
      />
    );
  }
}

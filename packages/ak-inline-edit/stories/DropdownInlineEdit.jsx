import React, { PureComponent } from 'react';
import reactify from 'akutil-react';
import Dropdown, { DropdownTrigger, Item } from 'ak-dropdown';
import AkInlineEdit from '../src';

const DropdownReact = reactify(Dropdown);
const DropdownTriggerReact = reactify(DropdownTrigger);
const ItemReact = reactify(Item);

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  static defaultProps = {
    initialValue: 'Text',
    label: 'Inline Edit',
  }

  state = {
    readValue: this.props.initialValue,
    editValue: this.props.initialValue,
  }

  onChange = e =>
    this.setState({ editValue: e.target.value })

  renderEditView = () => (
    <input
      value={this.state.editValue}
      onChange={this.props.onChange}
      onFocus={this.focus}
      onBlur={this.blur}
      onKeyDown={this.onKeyDown}
    />
    )

  renderInlineEdit = () => (
    <AkInlineEdit
      label={this.props.label}
      editView={this.renderEditView()}
      readView={this.state.readValue}
      onConfirm={this.onConfirm}
      onCancel={this.onCancel}
      {...this.props}
    />
  )

  render = () => (
    <DropdownReact open={false}>
      <DropdownTriggerReact
        slot="trigger"
        tab-index="1"
      >
        {this.renderInlineEdit()}
      </DropdownTriggerReact>
      <ItemReact>text1</ItemReact>
      <ItemReact>text2</ItemReact>
      <ItemReact>text3</ItemReact>
      <ItemReact>text4</ItemReact>
      <ItemReact>text5</ItemReact>
    </DropdownReact>

  )
}

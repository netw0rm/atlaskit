import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import reactify from 'akutil-react';

import Dropdown, { DropdownTrigger, Item } from 'ak-dropdown';
import AkInlineEdit from '../src';
import { name } from '../package.json';

const DropdownReact = reactify(Dropdown);
const DropdownTriggerReact = reactify(DropdownTrigger);
const ItemReact = reactify(Item);


const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

/* eslint-disable react/prop-types, react/no-multi-comp */
class DropdownInlineEdit extends PureComponent {
  static defaultProps = {
    initialValue: 'Text',
    label: 'Inline Edit',
  }

  state = {
    readValue: this.props.initialValue,
  }

  renderDropdown = () => (
    <DropdownReact>
      <DropdownTriggerReact slot="trigger" tab-index="1">
        <button>test</button>
      </DropdownTriggerReact>
      <ItemReact>text1</ItemReact>
      <ItemReact hidden>hidden Item</ItemReact>
      <ItemReact>some text here</ItemReact>
      <ItemReact>another text</ItemReact>
      <ItemReact>text2</ItemReact>
    </DropdownReact>
  )

  render = () => (
    <div ref={ref => (this.inlineEdit = ref)}>
      <AkInlineEdit
        label={this.props.label}
        editView={this.renderDropdown()}
        readView={this.state.readValue}
        {...this.props}
      />
      {this.renderDropdown()}
    </div>
  )
}

storiesOf(`${name} (dropdown)`, module)
  .add('with label', () => (
    <div style={containerStyle}>
      <DropdownInlineEdit />
    </div>
  ));

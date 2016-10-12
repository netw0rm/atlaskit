import React from 'react';
const { Component } = React;
import reactify from 'akutil-react';
import Dropdown, { DropdownTrigger, DropdownTriggerButton, Group, Item } from '../src/index';
import styles from '../src/less/shadow-list.less';

const dropdownClass = styles.locals.akDropdown;
const DropdownReactComponent = reactify(Dropdown);
const avatarUrl = require('url!./doge.jpg');

const DropdownTriggerReact = reactify(DropdownTrigger);
const DropdownTriggerButtonReact = reactify(DropdownTriggerButton);
const GroupReact = reactify(Group);
const ItemReact = reactify(Item);

export default class DropdownExample extends Component { // eslint-disable-line react/prefer-stateless-function, max-len
  render() {
    return (
      <DropdownReactComponent
        open
        className={dropdownClass}
        boundariesElement={this.props.parent}
        stepOutside={this.props.stepOutside}
        position={this.props.position}
      >
        {this.props.avatarTarget ?
          <DropdownTriggerReact slot="trigger" tab-index="1">
            <ak-avatar
              src={avatarUrl}
              size="small"
            />
          </DropdownTriggerReact> :
            <DropdownTriggerButtonReact slot="trigger" tab-index="1">
            Dropdown
            </DropdownTriggerButtonReact>
        }
        <GroupReact heading="Australia">
          <ItemReact>Sydney</ItemReact>
          <ItemReact hidden>Melbourne</ItemReact>
          <ItemReact>Adelaide</ItemReact>
          <ItemReact>Perth</ItemReact>
          <ItemReact>Canberra</ItemReact>
        </GroupReact>
      </DropdownReactComponent>
    );
  }
}

DropdownExample.propTypes = {
  parent: React.PropTypes.object,
  stepOutside: React.PropTypes.bool,
  position: React.PropTypes.string,
  avatarTarget: React.PropTypes.bool,
};

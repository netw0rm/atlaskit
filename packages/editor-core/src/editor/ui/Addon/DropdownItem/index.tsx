import * as React from 'react';
import { DropdownItem } from './styles';
import { AddonProps } from '../types';

export default class DropdownItemWrapper extends React.Component<AddonProps, any> {
  render() {
    return (
      <DropdownItem onClick={this.props.onClick}>
        <span>{this.props.icon}</span>
        {this.props.children}
      </DropdownItem>
    );
  }
}

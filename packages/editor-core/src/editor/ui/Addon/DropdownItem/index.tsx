import * as React from 'react';
import { DropdownItem } from './styles';
import { AddonProps } from '../types';

// tslint:disable-next-line:variable-name
const DropdownItemWrapper = (props: AddonProps) => (
  <DropdownItem onClick={props.onClick}>
    <span>{props.icon}</span>
    {props.children}
  </DropdownItem>
);

export default DropdownItemWrapper;

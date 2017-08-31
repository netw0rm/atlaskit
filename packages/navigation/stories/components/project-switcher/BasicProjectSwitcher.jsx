import React, { PureComponent } from 'react';
import { AkContainerTitleDropdown } from '../../../src/';
import { ReactElement } from '../../../src/types';

type Props = {|
  icon: ReactElement,
  text: string,
  subText?: string,
  children: ReactElement,
  defaultDropdownOpen?: boolean,
  isDropdownOpen?: boolean,
  isDropdownLoading?: boolean,
  onDropdownOpenChange?: Function,
|}

export default class BasicProjectSwitcher extends PureComponent {
  props: Props

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <AkContainerTitleDropdown {...otherProps}>
        {children}
      </AkContainerTitleDropdown>
    );
  }
}

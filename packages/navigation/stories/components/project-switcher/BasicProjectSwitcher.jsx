import React, { PureComponent } from 'react';
import { AkContainerTitleDropdown } from '../../../src/';
import { ReactElement } from '../../../src/types';

type Props = {|
  icon: ReactElement,
  text: string,
  subText?: string,
  children: ReactElement,
  isDropdownLoading?: boolean,
  onDropdownOpenChange?: Function,
|}

export default class BasicProjectSwitcher extends PureComponent {
  props: Props

  render() {
    const { children, text, icon, subText, isDropdownLoading, onDropdownOpenChange } = this.props;

    return (
      <AkContainerTitleDropdown
        text={text}
        icon={icon}
        subText={subText}
        isDropdownLoading={isDropdownLoading}
        onDropdownOpenChange={onDropdownOpenChange}
      >
        {children}
      </AkContainerTitleDropdown>
    );
  }
}

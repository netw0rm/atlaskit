import React, { PureComponent } from 'react';
import { AkContainerTitleDropdown } from '../../../src/';
import { ReactElement } from '../../../src/types';

type Props = {|
  icon: ReactElement,
  text: string,
  subText?: string,
  children: ReactElement,
|}

export default class BasicProjectSwitcher extends PureComponent {
  props: Props

  render() {
    const { children, icon, text, subText } = this.props;

    return (
      <AkContainerTitleDropdown
        text={text}
        icon={icon}
        subText={subText}
      >
        {children}
      </AkContainerTitleDropdown>
    );
  }
}

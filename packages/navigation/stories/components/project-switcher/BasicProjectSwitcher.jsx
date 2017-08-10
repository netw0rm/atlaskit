import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import { AkContainerTitleDropdown } from '../../../src/';
import { ReactElement } from '../../../src/types';

type Props = {|
  icon: ReactElement,
  text: string,
  subText?: string,
  children: ReactElement,
  shouldFitContainer: bool,
  position: string,
|}

export default class BasicProjectSwitcher extends PureComponent {
  props: Props

  render() {
    const { icon, text, subText, shouldFitContainer, position } = this.props;

    return (
      <AkDropdownMenu
        shouldFitContainer={shouldFitContainer}
        position={position}
        appearance="tall"
        shouldFlip={false}
        trigger={
          <AkContainerTitleDropdown
            text={text}
            icon={icon}
            subText={subText}
          />
        }
      >
        {this.props.children}
      </AkDropdownMenu>
    );
  }
}

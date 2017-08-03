import React, { PureComponent } from 'react';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import { AkContainerTitleDropdown } from '../../../src/';
import { ReactElement } from '../../../src/types';
import NucleusIcon from '../NucleusIcon';

type Props = {|
  icon: ReactElement,
  text: string,
  subText?: string,
  children: ReactElement,
  shouldFitContainer: bool,
  position: string,
|}

export default class BasicProjectSwitcher extends PureComponent {
  static defaultProps = {
    icon: <NucleusIcon />,
    text: 'Project Switcher very long text',
    subText: 'Software project',
    shouldFitContainer: true,
    position: 'bottom left',
  }

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

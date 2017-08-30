// @flow
import React, { PureComponent } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { AkNavigationItem } from '../../../src/index';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import type { ReactElement } from '../../types';
import { rootKey } from '../../theme/util';
import overrideItemTheme from '../../theme/create-container-title-item-theme';

type Props = {|
  /** Content that will be rendered inside the layer element. Should typically be
    * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those. */
  children: ReactElement,
  /** Image appear to the left of the text. */
  icon?: ReactElement,
  /** Text to appear below the title. */
  subText?: string,
  /** Text to appear as the title. This is placed at the top and bolded. */
  text: string,
  /** Theme used */
  theme: Object,
|}

const key = itemThemeNamespace;

class ContainerTitleDropdown extends PureComponent {
  props: Props

  render() {
    const {
      children,
      icon,
      subText,
      text,
    } = this.props;

    /* eslint-disable react/prop-types */
    // theme is passed in via context and not part of the props API for this component
    const isNavCollapsed = this.props.theme[rootKey] ?
      this.props.theme[rootKey].isCollapsed
      : false;
    /* eslint-enable react/prop-types */

    return (
      <AkDropdownMenu
        appearance="tall"
        shouldFitContainer={!isNavCollapsed}
        position={isNavCollapsed ? 'right top' : 'bottom left'}
        shouldFlip={false}
        trigger={(
          <ThemeProvider theme={theme => overrideItemTheme(theme, key)}>
            <AkNavigationItem
              dropIcon={isNavCollapsed ? null : <ExpandIcon />}
              isDropdownTrigger
              icon={isNavCollapsed ? null : <ContainerTitleIcon>{icon}</ContainerTitleIcon>}
              subText={isNavCollapsed ? null : subText}
              text={isNavCollapsed ?
                <ContainerTitleIcon aria-label={text}>{icon}</ContainerTitleIcon>
                : <ContainerTitleText>{text}</ContainerTitleText>}
            />
          </ThemeProvider>
        )}
      >
        {children}
      </AkDropdownMenu>
    );
  }
}

export default withTheme(ContainerTitleDropdown);

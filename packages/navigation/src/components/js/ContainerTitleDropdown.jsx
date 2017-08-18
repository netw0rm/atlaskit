// @flow
import React, { PureComponent } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import { AkNavigationItem } from '../../../src/index';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import { ReactElement } from '../../types';
import { rootKey } from '../../theme/util';

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
|}

const key = '@atlaskit-shared-theme/item';

class ContainerTitleDropdown extends PureComponent {
  props: Props
  
  overrideItemTheme = (outerTheme): ItemTheme => {
    const original: ItemTheme = outerTheme[key];

    if(!original || !original.padding) {
      console.error(`could not find theme with key '${key}' to modifiy it for title`);
      return outerTheme;
    }

    const updated: ItemTheme = JSON.parse(JSON.stringify(original));

    updated.padding.default.x = 4;
    updated.height.default = 0;
    updated.beforeItemSpacing.default = 8;

    return {
      ...outerTheme,
      [key]: updated,
    }
  }
  
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
          <ThemeProvider theme={theme => this.overrideItemTheme(theme)}>
            <AkNavigationItem
              dropIcon={isNavCollapsed ? null : <ExpandIcon />}
              isDropdownTrigger
              icon={isNavCollapsed ? null : <ContainerTitleIcon>{icon}</ContainerTitleIcon>}
              spacing="title"
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

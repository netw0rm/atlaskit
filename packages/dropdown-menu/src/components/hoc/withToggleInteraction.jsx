// @flow

import React, { PropTypes, Component } from 'react';
import { akColorB400, akColorN40 } from '@atlaskit/util-shared-styles';

import getDisplayName from '../../util/getDisplayName';
import { selectionManagerContext } from '../../util/contextNamespace';
import type { ReactElement, Behaviors } from '../../types';

import { KEY_ENTER, KEY_SPACE } from '../../util/keys';

// HOC that typically wraps @atlaskit/item
const withToggleInteraction = (
  WrappedComponent: ReactElement,
  SelectionIcon: ReactElement,
  ariaRole: Behaviors
) => {
  class WithToggleInteraction extends Component {
    static propTypes = {
      /** Content to be displayed inside the item. Same as @atlaskit/item `children` prop. */
      children: PropTypes.node,
      /** Unique identifier for the item, so that selection state can be tracked when the dropdown
        * is opened/closed. */
      id: PropTypes.string.isRequired,
    }

    static contextTypes = {
      [selectionManagerContext]: PropTypes.object.isRequired,
    };

    getIconColors = (isSelected: boolean = false) => {
      if (isSelected) {
        return { primary: akColorB400, secondary: akColorN40 };
      }
      return { primary: akColorN40, secondary: akColorN40 };
    }

    handleKeyboard = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === KEY_ENTER || key === KEY_SPACE) {
        // We prevent default here to avoid page scroll
        event.preventDefault();

        this.handleItemActivated();
      }
    }

    handleItemActivated = () => {
      this.context[selectionManagerContext].itemClicked(this.props.id);
    }

    isSelectedInDropdown = () => (
      this.context[selectionManagerContext].isItemSelected(this.props.id)
    )

    render() {
      const { children, ...otherProps } = this.props;
      const isSelected = this.isSelectedInDropdown();
      const iconColors = this.getIconColors(isSelected);

      return (
        <WrappedComponent
          role={ariaRole}
          aria-checked={isSelected}
          isSelected={isSelected}
          onClick={this.handleItemActivated}
          onKeyDown={this.handleKeyboard}
          elemBefore={
            <SelectionIcon
              primaryColor={iconColors.primary}
              secondaryColor={iconColors.secondary}
              size="medium"
              label=""
            />
          }
          {...otherProps}
        >
          {children}
        </WrappedComponent>
      );
    }
  }
  WithToggleInteraction.displayName = `WithToggleInteraction(${getDisplayName(WrappedComponent)})`;
  return WithToggleInteraction;
};

export default withToggleInteraction;

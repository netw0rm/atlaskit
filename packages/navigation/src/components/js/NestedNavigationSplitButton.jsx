import React, { PureComponent, PropTypes } from 'react';
import NestedNavigationSplitButtonWrapper from '../styled/NestedNavigationSplitButtonWrapper';
import InteractiveWrapper from './InteractiveWrapper';
import NavigationItemOuter from '../styled/NavigationItemOuter';
import NavigationItemIcon from '../styled/NavigationItemIcon';

export default class NestedNavigationSplitButton extends PureComponent {
  static propTypes = {
    backButtonIcon: PropTypes.node.isRequired,
    onBackButtonClick: PropTypes.func,
    mainNavigationItem: PropTypes.element.isRequired,
  };

  static defaultProps = {
    onBackButtonClick: () => {},
  };

  onBackButtonMouseDown = (e) => {
    e.preventDefault();
  };

  render() {
    const { backButtonIcon, mainNavigationItem, onBackButtonClick } = this.props;
    return (
      <NestedNavigationSplitButtonWrapper>
        <NavigationItemOuter
          isNestedBackButton
        >
          <InteractiveWrapper
            onMouseDown={this.onBackButtonMouseDown}
            onClick={onBackButtonClick}
          >
            <NavigationItemIcon
              hasNoPadding
            >
              {backButtonIcon}
            </NavigationItemIcon>
          </InteractiveWrapper>
        </NavigationItemOuter>
        {mainNavigationItem}
      </NestedNavigationSplitButtonWrapper>
    );
  }
}

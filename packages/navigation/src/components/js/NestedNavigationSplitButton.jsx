import React, { PureComponent, PropTypes } from 'react';
import NestedNavigationSplitButtonWrapper from '../styled/NestedNavigationSplitButtonWrapper';
import InteractiveWrapper from './InteractiveWrapper';
import BackButtonWrapper from '../styled/BackButtonWrapper';
import BackButtonIconWrapper from '../styled/BackButtonIconWrapper';

export default class NestedNavigationSplitButton extends PureComponent {
  static propTypes = {
    backButtonIcon: PropTypes.node.isRequired,
    onBackButtonClick: PropTypes.func,
    mainNavigationItem: PropTypes.element.isRequired,
  };

  static defaultProps = {
    onBackButtonClick: () => {},
  };

  // Stop the back button from stealing the focus state
  onBackButtonMouseDown = (e) => {
    e.preventDefault();
  };

  render() {
    const { backButtonIcon, mainNavigationItem, onBackButtonClick } = this.props;
    return (
      <NestedNavigationSplitButtonWrapper>
        <BackButtonWrapper>
          <InteractiveWrapper
            onMouseDown={this.onBackButtonMouseDown}
            onClick={onBackButtonClick}
          >
            <BackButtonIconWrapper>
              {backButtonIcon}
            </BackButtonIconWrapper>
          </InteractiveWrapper>
        </BackButtonWrapper>
        {mainNavigationItem}
      </NestedNavigationSplitButtonWrapper>
    );
  }
}

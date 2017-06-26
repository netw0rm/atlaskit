import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Item } from '@atlaskit/droplist';
import FooterDiv from '../styled/Footer';

export default class Footer extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'primary']),
    children: PropTypes.node,
    elemBefore: PropTypes.node,
    isFocused: PropTypes.bool,
    onClick: PropTypes.func,
    shouldHideSeparator: PropTypes.bool,
  }

  render() {
    const {
      appearance,
      children,
      elemBefore,
      isFocused,
      onClick,
      shouldHideSeparator,
    } = this.props;

    return (
      <FooterDiv onClick={onClick} shouldHideSeparator={shouldHideSeparator}>
        <Item
          appearance={appearance}
          elemBefore={elemBefore}
          isFocused={isFocused}
          type="option"
        >
          {children}
        </Item>
      </FooterDiv>
    );
  }
}

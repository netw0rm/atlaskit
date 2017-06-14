import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FooterDiv from '../styled/Footer';

export default class Footer extends PureComponent {
  static propTypes = {
    filterValue: PropTypes.string,
    newLabel: PropTypes.string,
    shouldAllowCreateItem: PropTypes.bool,
    shouldHideSeparator: PropTypes.bool,
  }

  render() {
    const { shouldAllowCreateItem, filterValue, shouldHideSeparator, newLabel } = this.props;

    return shouldAllowCreateItem && filterValue ? (
      <FooterDiv shouldHideSeparator={shouldHideSeparator}>
        {filterValue}
        <span> ({newLabel})</span>
      </FooterDiv>
    ) : null;
  }
}

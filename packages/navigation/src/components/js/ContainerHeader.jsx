import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    iconOffset: PropTypes.number,
    isFullWidth: PropTypes.bool,
    isInDrawer: PropTypes.bool,
  }
  static defaultProps = {
    iconOffset: 40,
    isInDrawer: false,
  }

  render() {
    const {
      iconOffset,
      isFullWidth,
      isInDrawer,
    } = this.props;
    return (
      <ContainerHeaderWrapper
        isInDrawer={isInDrawer}
        iconOffset={iconOffset}
        isFullWidth={isFullWidth}
      >
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}

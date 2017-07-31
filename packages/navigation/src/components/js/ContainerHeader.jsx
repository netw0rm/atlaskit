import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    iconOffset: PropTypes.number,
    isFullWidth: PropTypes.bool,
  }
  static defaultProps = {
    iconOffset: 40,
  }

  render() {
    const {
      iconOffset,
      isFullWidth,
    } = this.props;
    return (
      <ContainerHeaderWrapper iconOffset={iconOffset} isFullWidth={isFullWidth}>
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}

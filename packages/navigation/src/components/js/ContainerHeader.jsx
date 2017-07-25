import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    return (
      <ContainerHeaderWrapper>
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}

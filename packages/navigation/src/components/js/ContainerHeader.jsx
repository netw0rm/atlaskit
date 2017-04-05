import React, { PureComponent, PropTypes } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isContentScrolled: PropTypes.bool,
    appearance: PropTypes.string,
  }

  static defaultProps = {
    isContentScrolled: false,
    appearance: 'container',
  }

  render() {
    return (
      <ContainerHeaderWrapper
        isContentScrolled={this.props.isContentScrolled}
        appearance={this.props.appearance}
      >
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}

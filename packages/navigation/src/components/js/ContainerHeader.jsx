import React, { PureComponent, PropTypes } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';
import { appearanceEnum } from '../../utils/theme';

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isContentScrolled: PropTypes.bool,
    appearance: PropTypes.string,
  }

  static defaultProps = {
    isContentScrolled: false,
    appearance: appearanceEnum.container,
  }

  render() {
    return (
      <ContainerHeaderWrapper
        appearance={this.props.appearance}
        isContentScrolled={this.props.isContentScrolled}
      >
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import ContainerLogoStyled from '../styled/ContainerLogoStyled';

export default class ContainerLogo extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <ContainerLogoStyled>
        {this.props.children}
      </ContainerLogoStyled>
    );
  }
}


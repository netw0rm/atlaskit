import React, { PureComponent, PropTypes } from 'react';
import ContainerLogoStyled from '../styled/ContainerLogo';

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


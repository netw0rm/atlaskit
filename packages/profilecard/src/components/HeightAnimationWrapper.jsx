import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

import { cardAnimationWrapper } from 'style!../styles/profilecard.less';

const ContainerAnimation = styled.div`
  transition: height 0.25s ease;
  overflow: hidden;
`;

export default class HeightTransitionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    height: 'auto',
  }

  componentDidUpdate() {
    this.getRefHeight();
  }

  getRefHeight() {
    this.setState({
      height: this.ref ? this.ref.children[0].offsetHeight : 'auto',
    });
  }

  render() {
    const inlineHeight = {
      height: this.state.height,
    };

    return (
      <ContainerAnimation
        className={cardAnimationWrapper}
        style={inlineHeight}
        innerRef={ref => (this.ref = ref)}
      >
        {this.props.children}
      </ContainerAnimation>
    );
  }
}

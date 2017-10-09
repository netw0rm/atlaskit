import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  fontFamily,
  fontSize,
  borderRadius,
  gridSize,
  math,
} from '@atlaskit/theme';
import { bgColor } from '../styled/constants';

const CardAnimationWrapper = styled.div`
  background-color: ${bgColor};
  border-radius: ${borderRadius}px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
  cursor: default;
  font-family: ${fontFamily};
  font-size: ${fontSize}px;
  overflow: hidden;
  position: relative;
  transition: height 0.25s ease;
  width: ${math.multiply(gridSize, 45)}px;
`;

export default class HeightTransitionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    height: 'auto',
  }

  componentDidMount() {
    this.updateRefHeight();
  }

  componentDidUpdate() {
    this.updateRefHeight();
  }

  // eslint-disable-next-line class-methods-use-this
  preventDefault(event) {
    event.persist();
    event.preventDefault();
  }

  updateRefHeight() {
    this.setState({
      height: this.ref && this.ref.children.length
        ? this.ref.children[0].offsetHeight : 'auto',
    });
  }

  render() {
    const inlineHeight = {
      height: this.state.height,
    };

    return (
      <CardAnimationWrapper
        style={inlineHeight}
        innerRef={ref => (this.ref = ref)}
        onClick={this.preventDefault}
      >
        {this.props.children}
      </CardAnimationWrapper>
    );
  }
}

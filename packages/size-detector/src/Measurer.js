import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import { Container, Frame } from './styled';
import memoizeOne from 'memoize-one';

export default class Measurer extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.memoizedOnChange = memoizeOne(this.props.onChange);
  }
  // TODO: watch to see if onChange gets modified at runtime

  componentDidMount() {
    this.iFrame.contentWindow.onresize = () => { this.handleResize(); };
    this.handleResize();
  }

  componentWillUnmount() {
    this.iFrame.contentWindow.onresize = null;
  }

  setIFrameRef = (ref) => {
    this.iFrame = ref;
  }

  handleResize = () => {
    this.memoizedOnChange(this.iFrame.clientWidth);
  }

  render() {
    return (
      <Container>
        <Frame scrolling="no" frameborder="0" aria-hidden="true" innerRef={this.setIFrameRef} />
      </Container>
    );
  }
}

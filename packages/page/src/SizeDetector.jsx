import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import memoizeOne from 'memoize-one';

const Wrapper = styled.div`
  border: none;
  flex: 1 0 100%;
  height: 0;
  margin: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
`;

const Frame = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  top: -100%;
  width: 100%;
`;

export default class SizeDetector extends PureComponent {
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
      <Wrapper>
        <Frame scrolling="no" frameborder="0" aria-hidden="true" innerRef={this.setIFrameRef} />
      </Wrapper>
    );
  }
}

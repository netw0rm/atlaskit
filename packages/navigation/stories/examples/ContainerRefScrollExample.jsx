import React, { Component } from 'react';
import styled from 'styled-components';
import BasicNavigation from '../components/BasicNavigation';
import raf from 'raf-schd';
import ArrowUp from '@atlaskit/icon/glyph/arrow-up-circle';
import ArrowDown from '@atlaskit/icon/glyph/arrow-down-circle';
import { akColorB400, akColorB50 } from '@atlaskit/util-shared-styles';

const IndicatorContainer = styled.div`
  position: absolute;
  ${(props) => (props.top ? 'top: 0;' : '')}
  ${(props) => (!props.top ? 'bottom: 0;' : '')}
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: ${(props) => (props.top ? '0 0 10px 10px' : '10px 10px 0 0')};
  background: ${akColorB400};
  padding: 0 8px;
`;

export default class ContainerRefScrollExample extends Component {
  state = {
    scrollPosition: 0,
  }

  handleRef = (scrollRef) => {
    this.scrollRef = scrollRef;
    if (this.scrollRef) {
      this.scrollRef.addEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = raf((event) => {
    this.setState({
      scrollPosition: event.target.scrollTop,
    });
    console.log({ event: event.target.scrollTop });
  })

  render() {
    return (
      <BasicNavigation
        containerScrollRef={this.handleRef}
        containerHeaderComponent={() => (
          <div>Container scroll position: {this.state.scrollPosition}</div>
        )}
      >
        <IndicatorContainer top>
          <Indicator top>
            <ArrowUp label="" size="small" primaryColor={akColorB50} fill={akColorB400} />
          </Indicator>
        </IndicatorContainer>
        {this.props.children}
        <IndicatorContainer>
          <Indicator>
            <ArrowDown label="" size="small" primaryColor={akColorB50} fill={akColorB400} />
          </Indicator>
        </IndicatorContainer>
      </BasicNavigation>
    );
  }
}

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Spinner from '@atlaskit/spinner';

import props from '../internal/props';
import { SMALL, MEDIUM, LARGE, XLARGE, LOADING_CONTENTS_OPACITY } from '../internal/constants';
import { Container, ContentsContainer, SpinnerContainer } from '../styled/LoadingContainer';

export default class LoadingContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    spinnerSize: PropTypes.oneOf([SMALL, MEDIUM, LARGE, XLARGE, PropTypes.number]),
    contentsOpacity: props.isIn01Range,
  }

  static defaultProps = {
    isLoading: true,
    spinnerSize: LARGE,
    contentsOpacity: LOADING_CONTENTS_OPACITY,
  }

  render() {
    const {
      children,
      isLoading,
      spinnerSize,
      contentsOpacity,
    } = this.props;

    return (
      <Container>
        {!isLoading ? children : (
          <ContentsContainer contentsOpacity={contentsOpacity}>
            {children}
          </ContentsContainer>
        )}
        {isLoading && (
          <SpinnerContainer>
            <Spinner size={spinnerSize} />
          </SpinnerContainer>
        )}
      </Container>
    );
  }
}

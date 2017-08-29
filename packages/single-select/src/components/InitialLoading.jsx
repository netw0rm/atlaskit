import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import InitialLoadingElement from '../styled/InitialLoading';

export default class InitialLoading extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <InitialLoadingElement aria-live="polite" role="status">
        { this.props.children }
      </InitialLoadingElement>
    );
  }
}

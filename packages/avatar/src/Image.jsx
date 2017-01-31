import React, { PureComponent, PropTypes } from 'react';
import DefaultAvatar from './internal/default-avatar';

/* eslint-disable react/prefer-stateless-function */
export default class Image extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    src: PropTypes.string,
    hasError: PropTypes.bool,
    alt: PropTypes.string,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
  }

  render() {
    const { hasError, isLoading, ...propsForImage } = this.props;
    if (!isLoading) {
      if (!this.props.src || hasError) {
        return (<DefaultAvatar />);
      }
    }

    // we deliberately insert the alt prop knowing it will get overwritten by ...props because all
    // img tags should either have an alt or role="presentation"
    return (<img alt={this.props.alt} {...propsForImage} />);
  }
}

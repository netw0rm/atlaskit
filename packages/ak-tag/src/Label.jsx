import React, { Component } from 'react';
import Text from './Text';
import Href from './Href';

/* eslint-disable react/prop-types */
export default class Label extends Component {
  render() {
    let elem = null;
    if (this.props.href) {
      elem = <Href href={this.props.href}>{this.props.children}</Href>;
    } else {
      elem = <Text>{this.props.children}</Text>;
    }
    return (elem);
  }
}

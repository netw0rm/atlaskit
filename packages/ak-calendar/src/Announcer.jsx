import React, { Component, PropTypes } from 'react';
import { AnnouncerDiv } from './styled';

export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render = () => (
    <AnnouncerDiv aria-live="assertive" aria-relevant="text">
      {this.props.children}
    </AnnouncerDiv>
  )
}

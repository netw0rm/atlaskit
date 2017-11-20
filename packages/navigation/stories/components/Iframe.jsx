import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Lorem from 'react-lorem-component';
/**
 * Basic Iframe with content
 */
export default class Iframe extends Component {
  static propTypes = {
    content: PropTypes.string,
    resizing: PropTypes.boolean,
  }

  static defaultProps = {
    content: (
      <div>
        <Lorem count="10" />
      </div>
    ),
  }

  componentDidMount() {
    const el = document.createElement('div');
    console.log(this.ifr);
    this.ifr.contentDocument.body.appendChild(el);
    ReactDOM.render((
      <div>{this.props.content}</div>
    ), el);
  }

  render() {
    return (
      <iframe
        sandbox="allow-same-origin"
        style={{ 'pointer-events': this.props.resizing ? 'none' : 'auto' }}
        ref={(f) => { this.ifr = f; }}
      />
    );
  }
}


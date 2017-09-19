import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Lorem from 'react-lorem-component';

const styles = {
  wrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '100vh',
    overflowY: 'scroll',
    position: 'relative',
  },
  content: {
    boxSizing: 'border-box',
    padding: '32px',
  },
};

/**
 * Navigation needs to be able to work in a plain old HTML page,
 * and cannot explicitly depend on @atlaskit/page.
 *
 * This is a Page component is a proof of concept
 * to ensure that Navigation still works without @atlaskit/page
 */
export default class HtmlPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
  }

  static defaultProps = {
    content: <Lorem count="30" />,
  }

  render() {
    return (
      <div style={styles.wrapper}>

        {this.props.children}

        <div style={styles.content}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

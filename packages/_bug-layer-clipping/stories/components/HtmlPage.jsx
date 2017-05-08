import React, { PureComponent, PropTypes } from 'react';
import Lorem from 'react-lorem-component';
/**
 * Navigation needs to be able to work in a plain old HTML page,
 * and cannot explicitly depend on @atlaskit/page.
 *
 * This is a Page component is a proof of concept
 * to ensure that Navigation still works without @atlaskit/page
 */
export default class HtmlPage extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    content: (
      <div>
        <Lorem count="30" />
      </div>
    ),
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflowY: 'scroll',
          boxSizing: 'border-box',
        }}
      >
        <style>{'body { margin: 0 }'}</style>
        {this.props.children}
        <div
          style={{
            padding: '32px',
            height: '100vh',
            overflowY: 'scroll',
          }}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

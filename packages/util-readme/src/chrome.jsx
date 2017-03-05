import React, { PropTypes, PureComponent } from 'react';
import Heading from './heading';

const style = {
  chrome: {
    padding: 20,
  },
};

export default class extends PureComponent {
  static displayName = 'utilReadmeChrome'
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  }
  render() {
    const { children, title } = this.props;
    return (
      <div style={style.chrome}>
        {title ? <Heading>{title}</Heading> : ''}
        {children}
      </div>
    );
  }
}

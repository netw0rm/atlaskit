import React, { PropTypes, PureComponent } from 'react';
import Heading from './Heading';

const style = {
  chrome: {
    padding: 20,
  },
};

export default class ReadmeChrome extends PureComponent {
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

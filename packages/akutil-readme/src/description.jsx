import React, { PropTypes, PureComponent } from 'react';

const style = {
  p: {
    margin: '12px 0',
  },
};

export default class extends PureComponent {
  static displayName = 'AkutilReadmeDescription'
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div>{
        typeof this.props.children === 'string' ?
          (<p style={style.p}>{this.props.children}</p>) :
          (<div style={style.p}>{this.props.children}</div>)
      }</div>
    );
  }
}

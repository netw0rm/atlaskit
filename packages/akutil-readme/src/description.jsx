import React, { Children, PropTypes, PureComponent } from 'react';

const style = {
  p: {
    marginBottom: 10,
    marginTop: 10,
  },
};

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static displayName = 'AkutilReadmeDescription'
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    return <div>{Children.map(this.props.children, p => <p style={style.p}>{p}</p>)}</div>;
  }
}

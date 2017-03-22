import React, { PropTypes, PureComponent } from 'react';

const style = {
  h1: {
    borderBottom: '1px solid #ddd',
    color: '#333',
    marginBottom: 10,
    paddingBottom: 10,
  },
  h2: {
    borderBottom: '1px solid #ddd',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  h3: {
    color: '#444',
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
};

export default class extends PureComponent {
  static displayName = 'utilReadmeHeading'
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }
  static defaultProps = {
    type: 1,
  }
  render() {
    const { children, type } = this.props;
    const Heading = `h${type}`;
    return <Heading style={style[Heading]}>{children}</Heading>;
  }
}

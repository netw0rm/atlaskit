import React, { PureComponent, PropTypes } from 'react';
import Container from '../styled/Container';

const ALIGNMENT = {
  values: ['start', 'end'],
  defaultValue: 'start',
};

export default class TagGroup extends PureComponent {
  static propTypes = {
    alignment: PropTypes.oneOf(ALIGNMENT.values),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    alignment: ALIGNMENT.defaultValue,
  }

  render() {
    const { alignment, children } = this.props;

    return (
      <Container justify={alignment}>
        {children}
      </Container>
    );
  }
}

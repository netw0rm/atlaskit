import React, { PropTypes, PureComponent } from 'react';
import Container from './styled/Container';

export default class Blanket extends PureComponent {
  static propTypes = {
    canClickThrough: PropTypes.bool,
    isTinted: PropTypes.bool,
    onBlanketClicked: PropTypes.func,
  };

  static defaultProps = {
    canClickThrough: false,
    isTinted: false,
    onBlanketClicked: () => {},
  };

  render() {
    const { canClickThrough, isTinted, onBlanketClicked } = this.props;
    const onClick = canClickThrough ? null : onBlanketClicked;
    const containerProps = { canClickThrough, isTinted, onClick };

    // TODO make sure that the div onClick is accessible
    return <Container {...containerProps} />;
  }
}

import React, { PureComponent, PropTypes } from 'react';
import { Button, Container } from './styled';

export default class extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSpeak: PropTypes.func,
  }

  static defaultProps = {
    name: '[ Name not provided ]',
    onSpeak: () => { },
  }

  onClick = () => {
    this.props.onSpeak(`Hello ${this.props.name}!`);
  }

  render() {
    return (
      <Container>
        <Button
          onClick={this.onClick}
        >
          Say greeting
        </Button>
      </Container>
    );
  }
}

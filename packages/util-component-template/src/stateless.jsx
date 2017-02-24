import React, { PureComponent, PropTypes } from 'react';
import { Button, Container } from './styled';

export default class Toggle extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onToggle: PropTypes.func,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onToggle: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onToggle } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onToggle}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'active' : 'not active'}
        </Button>
      </Container>
    );
  }
}

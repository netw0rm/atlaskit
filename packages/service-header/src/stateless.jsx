import React, { PureComponent, PropTypes } from 'react';
import { Button, Container } from './styled';

export default class ServiceHeader extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onServiceHeader: PropTypes.func,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onServiceHeader: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onServiceHeader } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onServiceHeader}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'active' : 'not active'}
        </Button>
      </Container>
    );
  }
}

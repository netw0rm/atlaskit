import React, { PureComponent, PropTypes } from 'react';
import { Button, Container } from './styled';

export default class HorizontalNavigation extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onHorizontalNavigation: PropTypes.func,
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onHorizontalNavigation: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onHorizontalNavigation } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onHorizontalNavigation}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'active' : 'not active'}
        </Button>
      </Container>
    );
  }
}

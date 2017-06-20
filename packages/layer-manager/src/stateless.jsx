import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Container } from './styled';

export default class LayerManager extends PureComponent {
  static propTypes = {
    /** the label for the toggle */
    label: PropTypes.string,
    /** callback to run when toggled */
    onLayerManager: PropTypes.func,
    /** control boolean to pass in toggle state */
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onLayerManager: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onLayerManager } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onLayerManager}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'active' : 'not active'}
        </Button>
      </Container>
    );
  }
}

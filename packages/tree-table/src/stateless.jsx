import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Container } from './styled';

export default class TreeTable extends PureComponent {
  static propTypes = {
    /** the label for the toggle */
    label: PropTypes.string,
    /** callback to run when toggled */
    onTreeTable: PropTypes.func,
    /** control boolean to pass in toggle state */
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onTreeTable: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onTreeTable } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onTreeTable}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'Tree active' : 'Tree not active'}
        </Button>
      </Container>
    );
  }
}

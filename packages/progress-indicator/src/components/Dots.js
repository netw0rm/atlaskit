// @flow
import React, { PureComponent } from 'react';
import { Container, IndicatorButton, IndicatorDiv } from '../styled/Dots';

type Props = {
  /** The color of the indicators */
  appearance?: 'default' | 'help' | 'inverted' | 'primary',
  /** Function called when an indicator is selected */
  onSelect?: ({ event: Event, index: number }) => void,
  /** Which indicator is currently selected */
  selectedIndex: number,
  /** Corresponds to the width & height of each indicator */
  size?: 'small' | 'default' | 'large',
  /** How much of a gutter is desired between indicators */
  spacing?: 'comfortable' | 'cozy' | 'compact',
  /** An array of values mapped over to create the indicators */
  values: Array<any>,
}

export default class ProgressDots extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    appearance: 'default',
    size: 'default',
    spacing: 'comfortable',
  }
  render() {
    const { appearance, onSelect, selectedIndex, size, spacing, values } = this.props;

    return (
      <Container>
        {values.map((val, index) => {
          const selected = selectedIndex === index;
          const common = { appearance, key: index, selected, size, spacing };

          return onSelect ? (
            <IndicatorButton
              {...common}
              aria-label={index + 1}
              aria-selected={selected}
              onClick={event => onSelect({ event, index })}
              role="tab"
              type="button"
            />
          ) : (
            <IndicatorDiv
              {...common}
              role="presentation"
            />
          );
        })}
      </Container>
    );
  }
}

// @flow
import React, { PureComponent } from 'react';
import { Container, IndicatorButton, IndicatorDiv } from '../styled/Dots';

type Props = {
  appearance?: 'default' | 'help' | 'inverted' | 'primary',
  onSelect?: ({ event: Event, index: number }) => void,
  selectedIndex: number,
  size?: 'small' | 'default' | 'large',
  values: Array<any>,
}

export default class ProgressDots extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    appearance: 'default',
    size: 'default',
  }
  render() {
    const { appearance, onSelect, selectedIndex, size, values } = this.props;

    return (
      <Container>
        {values.map((key, index) => {
          const selected = selectedIndex === index;
          const common = { appearance, key, selected, size };

          return onSelect
            ? <IndicatorButton {...common} onClick={event => onSelect({ event, index })} />
            : <IndicatorDiv {...common} />;
        })}
      </Container>
    );
  }
}

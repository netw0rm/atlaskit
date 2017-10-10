// @flow
import React, { PureComponent } from 'react';
import { Container, IndicatorButton, IndicatorDiv } from '../styled/Dots';

type Props = {
  /** The color of the indicators */
  appearance?: 'default' | 'help' | 'inverted' | 'primary',
  /** The aria-controls text applied to each indicator, appended by the index */
  ariaControls?: string,
  /** The aria-label text applied to each indicator, appended by the index */
  ariaLabel?: string,
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
    ariaControls: 'panel',
    ariaLabel: 'tab',
    size: 'default',
    spacing: 'comfortable',
  }
  componentDidMount() {
    if (this.props.onSelect) {
      document.addEventListener('keydown', this.handleKeyDown, false);
    }
  }
  componentWillUnmount() {
    if (this.props.onSelect) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }
  handleKeyDown = (event) => {
    const { onSelect, selectedIndex, values } = this.props;
    const indicators = Array.from(this.tablist.children);

    // bail if the target isn't an indicator
    if (!indicators.includes(event.target)) return;

    // bail if not valid arrow key
    const isLeft = event.key === 'ArrowLeft';
    const isRight = event.key === 'ArrowRight';
    if (!isLeft && !isRight) return;

    // bail if at either end of the values
    const isAlpha = isLeft && selectedIndex === 0;
    const isOmega = isRight && selectedIndex === (values.length - 1);
    if (isAlpha || isOmega) return;

    const index = isLeft
      ? (selectedIndex - 1)
      : (selectedIndex + 1);

    // call the consumer's select method and focus the applicable indicator
    onSelect({ event, index });
    indicators[index].focus();
  }
  render() {
    // NOTE: `spacing` is a reserved HTML attribute and will be added to the
    // element, replaced with `gutter`.
    const {
      appearance, ariaControls, ariaLabel, onSelect, selectedIndex, size,
      spacing: gutter, values,
    } = this.props;

    return (
      <Container innerRef={r => (this.tablist = r)} role="tablist">
        {values.map((val, index) => {
          const selected = selectedIndex === index;
          const common = { appearance, key: index, selected, size, gutter };
          const tabId = `${ariaLabel}${index}`;
          const panelId = `${ariaControls}${index}`;

          return onSelect ? (
            <IndicatorButton
              {...common}
              aria-controls={panelId}
              aria-label={tabId}
              aria-selected={selected}
              id={tabId}
              onClick={event => onSelect({ event, index })}
              role="tab"
              tabIndex={selected ? 0 : -1}
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

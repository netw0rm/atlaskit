// @flow
import React, { PureComponent } from 'react';
import Container, { Action } from '../styled/Actions';
import Button from '../styled/CustomFocusButton';
import { getProperty } from '../theme';
import type { ActionsType, AppearanceTypes } from '../types';
import { DEFAULT_APPEARANCE } from './Flag';

type Props = {
  appearance: AppearanceTypes,
  actions: ActionsType,
};

export default class FlagActions extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  static defaultProps = {
    appearance: DEFAULT_APPEARANCE,
    actions: [],
  }

  getButtonFocusRingColor = a => getProperty(a, 'focusRingColor');
  getButtonTheme = a => getProperty(a, 'buttonTheme');
  getButtonAppearance = b => (b ? 'default' : 'subtle-link');
  getButtonSpacing = b => (b ? 'compact' : 'none');

  render() {
    const { actions, appearance } = this.props;
    const isBold = appearance !== DEFAULT_APPEARANCE;

    if (!actions.length) return null;

    const items = actions.map((action, index) => (
      <Action key={index} hasDivider={!!index} useMidDot={!isBold}>
        <Button
          appearance={this.getButtonAppearance(isBold)}
          focusRingColor={this.getButtonFocusRingColor(appearance)}
          onClick={action.onClick}
          spacing={this.getButtonSpacing(isBold)}
          theme={this.getButtonTheme(appearance)}
        >
          {action.content}
        </Button>
      </Action>
    ));

    return <Container>{items}</Container>;
  }
}

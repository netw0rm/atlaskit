// @flow
import React, { PureComponent } from 'react';
import Container, { Action, Button } from '../styled/Actions';
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

  getButtonFocusRingColor = (a: mixed) => getProperty(a, 'focusRingColor');
  getButtonTheme = (a: mixed) => getProperty(a, 'buttonTheme');
  getButtonAppearance = (b: mixed) => (b ? 'default' : 'subtle-link');
  getButtonSpacing = (b: mixed) => (b ? 'compact' : 'none');

  render() {
    const { actions, appearance } = this.props;
    const isBold = appearance !== DEFAULT_APPEARANCE;

    if (!actions.length) return null;

    const items = actions.map((action, index) => (
      <Action key={index} hasDivider={!!index} useMidDot={!isBold}>
        <Button onClick={action.onClick} appearance={appearance}>
          {action.content}
        </Button>
      </Action>
    ));

    return <Container>{items}</Container>;
  }
}

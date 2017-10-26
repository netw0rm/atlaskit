// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';

import { Actions, ActionItems, ActionItem } from '../styled/Dialog';
import type { ActionsType, ElementType } from '../types';

type Props = {|
  /** An optional element rendered beside the actions */
  beforeElement?: ElementType,
  /** Buttons to render */
  items: ActionsType,
|};

// NOTE: create the function once, rather than inside each render
// eslint-disable-next-line react/prop-types
const renderButtonsMap = ({ text, ...rest }, idx) => (
  <ActionItem key={text || idx}>
    <Button appearance="help" {...rest}>
      {text}
    </Button>
  </ActionItem>
);

export default class SpotlightActions extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  static defaultProps = {
    // NOTE: The span is used to force flex behaviour "space-between" when no
    // `beforeElement` is supplied, pushing the buttons to the correct side.
    beforeElement: <span />,
  }

  render() {
    const { beforeElement, items } = this.props;

    return (
      <Actions>
        {beforeElement}
        <ActionItems>{items.map(renderButtonsMap)}</ActionItems>
      </Actions>
    );
  }
}

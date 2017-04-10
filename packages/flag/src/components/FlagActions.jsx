import React, { PropTypes, PureComponent } from 'react';
import Button from '@atlaskit/button';
import Container, { Action } from '../styled/Actions';

export default class FlagActions extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
  };

  static defaultProps = {
    actions: [],
  }

  render() {
    if (!this.props.actions.length) return null;

    const items = this.props.actions.map((action, index) => (
      <Action key={index} hasDivider={!!index}>
        <Button
          appearance="subtle-link"
          onClick={action.onClick}
          spacing="none"
        >
          {action.content}
        </Button>
      </Action>
    ));

    return <Container>{items}</Container>;
  }
}

import * as React from 'react';
/* tslint:disable: variable-name */
import {Component, MouseEvent} from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import {StyledButton} from '../styled/DeleteButton';

// hack to get around lack of event in typings for @atlaskit/button
const UntypedButton = StyledButton as any;

export interface DeleteActionButtonProps {
  theme?: 'dark' | 'default';
  compact?: boolean;
  onClick?: () => void;
}

export class DeleteButton extends Component<DeleteActionButtonProps, {}> {
  static defaultProps: Partial<DeleteActionButtonProps> = {
    theme: 'default',
    compact: false
  };

  handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const {onClick} = this.props;

    // we don't want the `click` event to bubble up to the card `click` handler
    event.preventDefault();
    event.stopPropagation();

    if (onClick) {
      onClick();
    }

  }

  render() {
    const {theme, compact} = this.props;
    return (
      <UntypedButton
        theme={theme}
        appearance="subtle"
        spacing={compact ? 'compact' : 'default'}
        iconBefore={<CrossIcon size="small" label="delete" />}
        compact={compact}
        onClick={this.handleClick}
      />
    );
  }

}

import * as React from 'react';
/* tslint:disable: variable-name */
import {Component, MouseEvent} from 'react';
import AkButton from '@atlaskit/button';

// hack to get around lack of event in typings for @atlaskit/button
const UntypedButton = AkButton as any;

export interface ActionButtonProps {
  theme?: 'dark' | 'default';
  compact?: boolean;
  children?: JSX.Element;
  onClick?: () => void;
}

export class PrimaryButton extends Component<ActionButtonProps, {}> {
  static defaultProps: Partial<ActionButtonProps> = {
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
    const {theme, compact, children} = this.props;
    return (
      <UntypedButton
        theme={theme}
        appearance="default"
        spacing={compact ? 'compact' : 'default'}
        onClick={this.handleClick}
      >
      {children}
      </UntypedButton>
    );
  }

}

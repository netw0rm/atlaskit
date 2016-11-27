import React, { PureComponent, ReactElement, MouseEvent } from 'react';
import AkButton from 'ak-button';
import * as styles from './styles.global.less';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  icon: ReactElement<any>;
  onClick: () => void;
}

export default class ToolbarIconButton extends PureComponent<Props, {}> {
  render() {
    return (
      <span
        className={styles.button}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        <AkButton
          selected={this.props.selected}
          spacing='none'
          appearance='subtle'
          disabled={this.props.disabled}
        >
          {this.props.icon}
          {this.props.children}
        </AkButton>
      </span>
    )
  }

  private handleClick = (e: MouseEvent<any>) => {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

  private handleMouseDown = (e: MouseEvent<any>) => {
    // Don't let ProseMirror lose focus.
    e.preventDefault();
  }
};

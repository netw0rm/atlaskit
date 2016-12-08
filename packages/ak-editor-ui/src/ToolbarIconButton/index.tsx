import React, { PureComponent, ReactElement, MouseEvent } from 'react';
import AkButton from 'ak-button';
import * as styles from './styles.global.less';

interface Props {
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  theme?: 'dark';
  icon: ReactElement<any>;
  onClick?: () => void;
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
          isDisabled={this.props.disabled}
          isSelected={this.props.selected}
          spacing='none'
          appearance='subtle'
          href={this.props.href}
          target={this.props.target}
          theme={this.props.theme}
        >
          {this.props.icon}
        </AkButton>
      </span>
    )
  }

  private handleClick = (e: MouseEvent<any>) => {
    const { disabled, onClick } = this.props;
    if (!disabled && onClick) {
      onClick();
    }
  }

  private handleMouseDown = (e: MouseEvent<any>) => {
    // Don't let ProseMirror lose focus.
    e.preventDefault();
  }
};

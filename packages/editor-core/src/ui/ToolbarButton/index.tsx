import AkButton from 'ak-button';
import * as React from 'react';
import { MouseEvent, PureComponent, ReactElement } from 'react';
import * as styles from './styles';

export interface Props {
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  title?: string;
  target?: string;
  theme?: 'dark';
  wrapperClassName?: string;
  iconBefore?: ReactElement<any>;
  spacing?: 'default' | 'compact' | 'none';
  onClick?: () => void;
}

export default class ToolbarButton extends PureComponent<Props, {}> {
  static defaultProps = {
    wrapperClassName: '',
  };

  render() {
    return (
      <span
        className={`${styles.button} ${this.props.wrapperClassName}`}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        title={this.props.title}
      >
        <AkButton
          isDisabled={this.props.disabled}
          isSelected={this.props.selected}
          spacing={this.props.spacing || 'none'}
          appearance="subtle"
          href={this.props.href}
          target={this.props.target}
          theme={this.props.theme}
          iconBefore={this.props.iconBefore}
        >
          {this.props.children}
        </AkButton>
      </span>
    );
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

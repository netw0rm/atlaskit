import { Component, ReactChild, ReactNode } from 'react';

export interface Props {
  appearance?: 'primary' | 'default' | 'subtle' | 'link' | 'subtle-link' | 'warning' | 'danger' | 'help';
  shouldFitContainer?: boolean;
  type?: 'button' | 'submit';
  href?: string;
  target?: string;
  form?: string;
  isDisabled?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  isSelected?: boolean;
  theme?: 'default' | 'dark';
  iconBefore?: ReactChild;
  iconAfter?: ReactChild;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  ariaHaspopup?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  id?: string;
}

export interface ButtonGroupProps {
  appearance?: 'primary' | 'default' | 'subtle' | 'link' | 'subtle-link' | 'warning' | 'danger' | 'help';
  children?: ReactNode;
}

export class ButtonGroup extends Component<ButtonGroupProps, {}> { }
export default class extends Component<Props, {}> {}

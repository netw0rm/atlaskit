import { Component, ReactElement } from 'react';

interface Props {
  appearance?: 'primary' | 'default' | 'subtle' | 'link';
  type?: 'button' | 'submit';
  href?: string;
  target?: string;
  isDisabled?: boolean;
  spacing?: 'default' | 'compact' | 'none';
  isSelected?: boolean;
  theme?: 'default' | 'dark';
  iconBefore?: ReactElement<any>;
  iconAfter?: ReactElement<any>;
}

interface State {}

export default class extends Component<Props, State> {};

import { Component } from 'react';

type sourceType = 'click' | 'keydown';

interface Props {
  isDisabled?: boolean;
  isOpened?: boolean;
  type?: 'default' | 'button';
  onActivate?: ({ source: sourceType }) => void;
  isFocused?: boolean;
  isNotTabbable?: boolean;
  style?: object;
  className?: string;
}

interface State {}

export default class Trigger extends Component<Props, State> {};

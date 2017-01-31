import { Component } from 'react';

type sourceType = 'click' | 'keydown';

interface Props {
  isDisabled?: boolean;
  isOpened?: boolean;
  onActivate?: ({ source: sourceType }) => void;
  isFocused?: boolean;
  isTabbable?: boolean;
  style?: any;
  className?: string;
  shouldFitContainer?: boolean;
}

interface State {}

export default class Trigger extends Component<Props, State> {}

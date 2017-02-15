import { Component } from 'react';

interface Props {
  onComplete?: () => void;
  isCompleting?: boolean;
  size?: number | 'small' | 'medium' | 'large' | 'xlarge';
}

interface State {}

export default class Spinner extends Component<Props, State> {}

import { Component, ReactElement } from 'react';

interface Props {
  value?: Number,
  max?: Number,
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed',
  onValueUpdated?: () => any
}

interface State {}

export default class extends Component<Props, State> {}

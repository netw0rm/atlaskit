import { Component } from 'react';

export interface Props {
  compact?: boolean;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange: (event: Event) => void;
  id?: string;
  isLabelHidden?: boolean;
  shouldFitContainer?: boolean;
}

export default class extends Component<Props, {}> { }

import { Component } from 'react';

export interface Props {
  isBold?: boolean;
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
}

export interface State {}

export default class extends Component<Props, State> {}

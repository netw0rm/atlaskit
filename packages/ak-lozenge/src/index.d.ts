import { Component, ReactElement } from 'react';

interface Props {
  isBold?: boolean,
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved'
  children?: Node[];
}

interface State {}

export default class extends Component<Props, State> {}

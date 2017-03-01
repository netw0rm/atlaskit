import { PureComponent } from 'react';
import { renderNode } from './nodes';

export interface Props {
  document?: any;
  userId?: string;
}

export interface State {}

export default class Renderer extends PureComponent<Props, State> {
  static defaultProps = {
    document: {},
    userId: ''
  };

  render() {
    return renderNode(this.props.document, this.props.userId);
  }
}

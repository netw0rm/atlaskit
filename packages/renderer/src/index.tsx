import { PureComponent } from 'react';
import { renderNode } from './nodes';

export interface Props {
  document?: any;
}

export interface State {}

export default class Renderer extends PureComponent<Props, State> {
  static defaultProps = {
    document: {},
  };

  render() {
    return renderNode(this.props.document);
  }
}

import * as React from 'react';
import { PureComponent } from 'react';
// import * as styles from './styles';
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
    return (
      <div>
        {renderNode(this.props.document)}
      </div>
    );
  }
}

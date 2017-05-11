import * as React from 'react';
import { PureComponent } from 'react';
import { PositionedNode } from './';
import {
  EditorView,
  NodeSelection,
} from '../prosemirror';

interface WrapperClickAreaProps {
  node: PositionedNode;
  view: EditorView;
}

export default class WrapperClickArea extends PureComponent<WrapperClickAreaProps, {}> {
  render() {
    return (
      <div onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }

  private onClick = () => {
    const { node, view } = this.props;
    const { doc, tr } = view.state;
    const pos = doc.resolve(node.getPos());
    const selection = new NodeSelection(pos);

    view.dispatch(tr.setSelection(selection));
  }
}

import * as React from 'react';
import { PureComponent } from 'react';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import {
  Node as PMNode,
} from '../prosemirror';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
]);

export interface Props {
  node: PMNode;
  [key: string]: any;
}

export default class ReactProsemirrorNode extends PureComponent<Props, {}> {
  render() {
    const { node } = this.props;
    const nodeTypeName = node.type.name;
    const attrs = { ...this.props, node };
    const hasRichClass = richNodes.has(nodeTypeName);

    const reactClass = hasRichClass
      ? richNodes.get(nodeTypeName)
      : 'div';

    const children: any[] = [];
    node.forEach(childNode => {
      const childAttrs = { ...this.props, node: childNode };

      children.push(
        <ReactProsemirrorNode {...childAttrs}/>
      );
    });

    return React.createElement(
      reactClass!,
      hasRichClass ? attrs : undefined,
      children
    );
  }
}

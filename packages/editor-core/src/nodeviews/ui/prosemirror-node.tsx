import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { ReactComponentConstructor } from './';
import wrapComponentWithClickArea from './wrapper-click-area';
import { default as EmojiNode } from './emoji';
import { default as MediaGroupNode } from './media-group';
import { default as MediaNode } from './media';
import { default as MentionNode } from './mention';
import { PositionedNode } from '../';
import {
  Node as PMNode,
  EditorView,
} from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { reactNodeViewStateKey } from '../../plugins';

const richNodes = new Map<string, React.ComponentClass<any>>([
  [ 'emoji', EmojiNode ],
  [ 'mediaGroup', MediaGroupNode ],
  [ 'media', MediaNode ],
  [ 'mention', MentionNode ],
]);

export interface ReactProsemirrorNodeProps {
  getPos: () => number;
  node: PMNode;
  providerFactory: ProviderFactory;
  view: EditorView;

  [key: string]: any;
}

export default class ReactProsemirrorNode extends PureComponent<ReactProsemirrorNodeProps, {}> {
  /**
   * All children components of ReactProsemirrorNode are React components
   * which are completely rendered by us, not Prosemirror. This also means
   * that we're responsible for rendering them, supporting keyboard navigation
   * and showing "selected" element. Wrapping ReactProsemirrorNode into HOC
   * helps us to pass "selected" prop into child components
   */
  private wrapped: ReactComponentConstructor = wrapComponentWithClickArea(ReactProsemirrorNode);

  render() {
    const { getPos, node, providerFactory, view } = this.props;
    const nodeTypeName = node.type.name;

    assert(richNodes.has(nodeTypeName), `Rich node with type ${nodeTypeName} is not declared`);

    const attrs = { ...this.props, node };
    const children: React.ReactNode[] = [];

    // tslint:disable-next-line:variable-name
    const RichNodeWithClickArea = this.wrapped;

    node.forEach((childNode: PositionedNode, offset: number, index: number) => {
      /**
       * Child node position is parent position + offset + 1
       * because each node has its own position
       * i.e. different nodes can't have the same position
       */
      childNode.getPos = () => getPos() + offset + 1;

      children.push(
        <RichNodeWithClickArea
          key={`richnode-${offset}-${index}`}
          node={childNode}
          view={view}
          pluginState={reactNodeViewStateKey.getState(view.state)}
          providerFactory={providerFactory}
        />
      );
    });

    // tslint:disable-next-line:variable-name
    const RichNode = richNodes.get(nodeTypeName)!;
    return <RichNode {...attrs}>{children}</RichNode>;
  }
}

import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { ReactComponentConstructor } from './';
import wrapComponentWithClickArea from './wrapper-click-area';
import { PositionedNode } from '../';
import { ReactNodeViewComponents } from '../factory';
import {
  Node as PMNode,
  EditorView,
} from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import { reactNodeViewStateKey } from '../../plugins';

export interface ReactProsemirrorNodeProps {
  getPos: () => number;
  node: PMNode;
  providerFactory: ProviderFactory;
  components: ReactNodeViewComponents;
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
    const { components, node, providerFactory, view } = this.props;
    const nodeTypeName = node.type.name;
    const pluginState = reactNodeViewStateKey.getState(view.state);

    assert(components[nodeTypeName], `Rich node with type ${nodeTypeName} is not declared`);
    assert(pluginState, 'ReactNodeViewPlugin is not enabled');

    const attrs = { ...this.props, node };
    const children: React.ReactNode[] = [];

    // tslint:disable-next-line:variable-name
    const RichNodeWithClickArea = this.wrapped;

    node.forEach((childNode: PositionedNode, offset: number, index: number) => {
      children.push(
        <RichNodeWithClickArea
          key={`richnode-${offset}-${index}`}
          components={components}
          node={childNode}
          getPos={this.handleGetPos(offset)}
          view={view}
          pluginState={pluginState}
          providerFactory={providerFactory}
        />
      );
    });

    // tslint:disable-next-line:variable-name
    const RichNode = components[nodeTypeName]!;
    return <RichNode {...attrs}>{children}</RichNode>;
  }

  /**
   * Child node position is parent position + offset + 1
   * because each node has its own position
   * i.e. different nodes can't have the same position
   */
  private handleGetPos = (offset) => {
    return () => {
      const { getPos } = this.props;
      return getPos() + offset + 1;
    };
  }
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  EditorView,
  Node as PMNode,
  NodeView
} from '../../prosemirror';

import { DecisionItem } from '@atlaskit/task-decision';
import { pluginKey as themePluginKey } from '../../editor/plugins/theme';

type getPosHandler = () => number;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision implements NodeView {
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;
  private showPlaceholder: boolean = false;
  private view?: EditorView;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.showPlaceholder = node.content.childCount === 0;
    this.view = view;
    this.renderReactComponent();
  }

  private handleRef = (node: HTMLElement | undefined) => {
    this.contentDOMRef = node;
  }

  private renderReactComponent() {
    this.domRef = document.createElement('li');
    this.domRef.style['list-style-type'] = 'none';
    const themePluginState = this.view && themePluginKey.getState(this.view!.state);
    const theme = themePluginState && themePluginState.theme;

    // tslint:disable-next-line:variable-name
    ReactDOM.render(
      <DecisionItem contentRef={this.handleRef} showPlaceholder={this.showPlaceholder} theme={theme} />,
      this.domRef
    );
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.contentDOMRef;
  }

  update() {
    /**
     * Returning false here fixes an error where the editor fails to set selection
     * inside the contentDOM after a transaction. See ED-2374.
     */
    return false;
  }

  destroy() {
    ReactDOM.unmountComponentAtNode(this.domRef!);
    this.domRef = undefined;
    this.contentDOMRef = undefined;
  }
}

export const decisionItemNodeView = (node: any, view: any, getPos: () => number): NodeView => {
  return new Decision(node, view, getPos);
};

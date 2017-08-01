import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  EditorView,
  Node as PMNode,
  NodeView
} from '../../prosemirror';

import { DecisionItem } from '@atlaskit/task-decision';

type getPosHandler = () => number;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision implements NodeView {
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.renderReactComponent();
  }

  private handleRef = (node: HTMLElement | undefined) => {
    this.contentDOMRef = node;
  }

  private renderReactComponent() {
    this.domRef = document.createElement('li');
    this.domRef.style['list-style-type'] = 'none';

    // tslint:disable-next-line:variable-name
    ReactDOM.render(
      <DecisionItem contentRef={this.handleRef}/>,
      this.domRef
    );
  }

  get dom() {
    return this.domRef;
  }

  get contentDOM() {
    return this.contentDOMRef;
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

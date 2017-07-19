import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  EditorView,
  Node as PMNode,
  NodeView
} from '../../prosemirror';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorN20,
} from '@atlaskit/util-shared-styles';
import DecisionIcon from '@atlaskit/icon/glyph/decision';

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless}px;
`;

// tslint:disable-next-line:variable-name
const ContentWrapper = styled.div`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
`;

// tslint:disable-next-line:variable-name
const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
  position: absolute;
`;

type getPosHandler = () => number;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

class Decision implements NodeView {
  private domRef: HTMLElement | undefined;
  private contentDOMRef: HTMLElement | undefined;
  private panelType: string;

  constructor(node: PMNode, view: EditorView, getPos: getPosHandler) {
    this.panelType = node.attrs.panelType;
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
      <Wrapper>
        <IconWrapper>
          <DecisionIcon label="Decision" />
        </IconWrapper>
        <ContentWrapper innerRef={this.handleRef} />
      </Wrapper>,
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

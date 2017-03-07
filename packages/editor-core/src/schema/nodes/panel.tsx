import {
  akBorderRadius,
  akColorG50,
  akColorP50,
  akColorT50,
  akColorY50,
  akColorG500,
  akColorP500,
  akColorT500,
  akColorY500
} from 'akutil-shared-styles';
import { style } from 'typestyle';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Attribute, Block, Node, Schema } from '../../prosemirror';

const panelStyle = style({
  borderRadius: akBorderRadius,
  margin: '4px 0 4px 0',
  padding: '4px',
  display: 'flex',
});

const panelColorStyle = {
  info: style({
    background: akColorT50,
  }),
  note: style({
    background: akColorP50
  }),
  tip: style({
    background: akColorG50
  }),
  warning: style({
    background: akColorY50
  })
};

const panelIcons = {
  info: InfoIcon,
  tip: TipIcon,
  note: NoteIcon,
  warning: WarningIcon
};

const iconStyle = style({
  height: '100%',
  display: 'flex',
  marginRight: '5px',
  minWidth: '24px',
  minHeight: '24px',
  justifyContent: 'center'
});

const iconColorStyle = {
  info: style({
    color: akColorT500
  }),
  note: style({
    color: akColorP500
  }),
  tip: style({
    color: akColorG500
  }),
  warning: style({
    color: akColorY500
  })
};

const contentStyle = style({
  width: '95%',
  verticalAlign: 'middle',
  lineHeight: '1.7'
});

export interface DOMAttributes {
  [propName: string]: string;
}

export class PanelNodeType extends Block {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'panel') {
      throw new Error('PanelNodeType must be named "panel".');
    }
  }

  get matchDOMTag() {
    return {
      'div[data-panel-type]': (dom: HTMLElement) => {
        return [{
          'panelType': dom.getAttribute('data-panel-type')
        }] as any;
      }
    };
  }

  get attrs() {
    return {
      panelType: new Attribute({ default: 'info' }),
    };
  }

  toDOM(node: PanelNode): [string, any] {
    const panelType = node.attrs['panelType'];
    const attrs: DOMAttributes = {
      'class': `${panelStyle} ${panelColorStyle[panelType]}`,
      'data-panel-type': panelType
    };
    return [
      'div',
      attrs,
      this.getIconDom(panelType),
      ['span', { class: contentStyle }, 0]
    ];
  }

  private getIconDom(panelType: string): HTMLElement {
    const dom = document.createElement('span');
    dom.setAttribute('contenteditable', 'false');
    dom.setAttribute('class', `${iconStyle} ${iconColorStyle[panelType]}`);
    // tslint:disable-next-line:variable-name
    const Icon = panelIcons[panelType];
    ReactDOM.render(<Icon label={panelType} />, dom);
    return dom;
  }
}

export interface PanelNode extends Node {
  type: PanelNodeType;
}

export function isPanelNode(node: Node): node is PanelNode {
  return node.type instanceof PanelNodeType;
}

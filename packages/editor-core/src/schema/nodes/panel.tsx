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
import InfoIcon from 'ak-icon/glyph/editor/info';
import TipIcon from 'ak-icon/glyph/editor/hint';
import NoteIcon from 'ak-icon/glyph/editor/note';
import WarningIcon from 'ak-icon/glyph/warning';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NodeSpec, Node } from '../../prosemirror';

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

const getIconDom = function (panelType: string): HTMLElement {
  const dom = document.createElement('span');
  dom.setAttribute('contenteditable', 'false');
  dom.setAttribute('class', `${iconStyle} ${iconColorStyle[panelType]}`);
  // tslint:disable-next-line:variable-name
  const Icon = panelIcons[panelType];
  ReactDOM.render(<Icon label={panelType} />, dom);
  return dom;
};

export interface DOMAttributes {
  [propName: string]: string;
}

export const panel: NodeSpec = {
  group: 'block',
  attrs: {
    panelType: { default: 'info' }
  },
  parseDOM: [{
    tag: 'div[data-panel-type]',
    getAttrs: (dom: Element) => ({
      'panelType': dom.getAttribute('data-panel-type')!
    })
  }],
  toDOM(node: Node): [string, any] {
    const panelType = node.attrs['panelType'];
    const attrs: DOMAttributes = {
      'class': `${panelStyle} ${panelColorStyle[panelType]}`,
      'data-panel-type': panelType
    };
    return [
      'div',
      attrs,
      getIconDom(panelType),
      ['span', { class: contentStyle }, 0]
    ];
  }
};

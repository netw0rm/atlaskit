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
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import TipIcon from '@atlaskit/icon/glyph/editor/hint';
import NoteIcon from '@atlaskit/icon/glyph/editor/note';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NodeSpec, Node } from '../../prosemirror';

const panelStyle = style({
  borderRadius: akBorderRadius,
  margin: '4px 0 4px 0',
  padding: '4px'
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
  height: '24px',
  width: '24px',
  position: 'absolute'
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
  margin: '1px 0 1px 30px'
});

const getIconDom = function (panelType: string): HTMLElement {
  const dom = document.createElement('span');
  dom.setAttribute('contenteditable', 'false');
  dom.setAttribute('class', `${iconStyle} ${iconColorStyle[panelType]}`);
  // Prevent IE11 resize handles on selection.
  dom.addEventListener('mousedown', (e) => e.preventDefault());
  // tslint:disable-next-line:variable-name
  const Icon = panelIcons[panelType];
  ReactDOM.render(<Icon label={`panel ${panelType}`} />, dom);
  return dom;
};

export interface DOMAttributes {
  [propName: string]: string;
}

export const panel: NodeSpec = {
  group: 'block',
  content: 'block+',
  attrs: {
    panelType: { default: 'info' }
  },
  parseDOM: [{
    tag: 'div[data-panel-type]',
    getAttrs: (dom: HTMLElement) => ({
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
      ['div', { class: contentStyle }, 0]
    ];
  }
};

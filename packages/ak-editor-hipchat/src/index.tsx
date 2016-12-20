import { Keymap, ProseMirror } from 'ak-editor-core';
import * as React from 'react';
import { Component } from 'react';
import schema from './schema';

export type Doc = {
  type: 'doc',
  content?: any[]
}

export interface Props {
  onSubmit?: (doc: Doc) => void
}

export interface State {}

export default class Editor extends Component<Props, State> {
  componentDidMount() {
    const pm = new ProseMirror({
      place: this.refs['container'],
      doc: schema.nodes.doc.createAndFill(),
      plugins: [],
    });

    const container = this.refs['container'];
    if (container instanceof HTMLElement) {
      const content = container.querySelector('[contenteditable]');
      if (content instanceof HTMLElement) {
        content.style.outline = 'none';
        content.style.whiteSpace = 'pre-wrap';
      }
    }

    pm.addKeymap(new Keymap({
      'Enter': () => {
        if (this.props.onSubmit) {
          this.props.onSubmit(pm.doc.toJSON());
        }
      }
    }));
  }

  render() {
    return <div ref="container" />;
  }
}

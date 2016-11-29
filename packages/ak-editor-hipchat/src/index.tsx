import { Keymap, ProseMirror } from 'ak-editor-prosemirror';
import React, { Component } from 'react';
import schema from '../schema';
import keymap from '../keymap';

type Doc = {
  type: 'doc',
  content: any[]
}

interface Props {
  onSubmit?: (doc: Doc) => void
}

interface State {
  id: string
}

export default class extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { id: `ak-editor-hipchat-${instanceCount++}` };
  }

  componentDidMount() {
    const pm = new ProseMirror({
      place: this.refs['container'],
      doc: schema.nodes.doc.createAndFill(),
      plugins: [],
    });

    pm.addKeymap(keymap);
    pm.addKeymap(new Keymap({
      'Enter': () => {
        if (this.props.onSubmit) {
          this.props.onSubmit(pm.doc.toJSON());
        }
      }
    }));
  }

  render() {
    return <div id={this.state.id} >
        <Styles containerId={this.state.id} />
        <div ref="container" />
      </div>;
  }
}

let instanceCount = 0;

const Styles = ({ containerId }: { containerId: string }) => (
  <style>{`
  #${containerId} [contenteditable] {
    outline: none;
    white-space: pre-wrap;
  }
  `}</style>);

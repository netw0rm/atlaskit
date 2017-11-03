import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import BrushIcon from '@atlaskit/icon/glyph/media-services/brush';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  editorView: EditorView;
  highlightDocument: (editorView: EditorView) => void;
}

export default class ToolbarHighlightEmoji extends Component<Props, any> {
  render() {
    const { disabled }  = this.props;
    return (
      <ToolbarButton
        disabled={disabled}
        onClick={this.toggleOpen}
        iconBefore={<BrushIcon label="Highlight emoji (:)" />}
        title="Highlight emoji (:)"
      />
    );
  }

  private handleClick = () => {
    this.props.highlightDocument(this.props.editorView);
  }
}

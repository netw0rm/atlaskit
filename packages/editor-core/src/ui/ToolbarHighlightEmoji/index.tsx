import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import BrushIcon from '@atlaskit/icon/glyph/media-services/brush';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  editorView: EditorView;
  disabled?: boolean;
  highlightDocument: (editorView: EditorView) => void;
}

export default class ToolbarHighlightEmoji extends Component<Props, any> {
  render() {
    return (
      <ToolbarButton
        disabled={this.props.disabled}
        onClick={this.handleClick}
        iconBefore={<BrushIcon label="Highlight emoji (:)" />}
        title="Highlight emoji (:)"
      />
    );
  }

  private handleClick = () => {
    this.props.highlightDocument(this.props.editorView);
  }
}

import * as React from 'react';
import { PureComponent } from 'react';
import {
  Chrome,
  ContextName
} from '../../';
import blockTypePlugin from '../../src/plugins/block-type';
import clearFormattingPlugin from '../../src/plugins/clear-formatting';
import codeBlockPlugin from '../../src/plugins/code-block';
import panelPlugin from '../../src/plugins/panel';
import textFormattingPlugin from '../../src/plugins/text-formatting';
import hyperlinkPlugin from '../../src/plugins/hyperlink';
import rulePlugin from '../../src/plugins/rule';
import imageUploadPlugin from '../../src/plugins/image-upload';
import listsPlugin from '../../src/plugins/lists';
import {
  baseKeymap,
  EditorState,
  EditorView,
  history,
  keymap,
  Node,
  TextSelection
} from '../../src/prosemirror';
import schema from '../schema';

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;
export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploader?: Function;
  imageUploadHandler?: ImageUploadHandler;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;
    if (editorView) {
      editorView.focus();
    }
  }

  expand = () => {
    this.setState({ isExpanded: true });
  }


  collapse = () => {
    this.setState({ isExpanded: false });
  }


  clear(): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const tr = state.tr
        .setSelection(TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
        .deleteSelection();
      editorView.dispatch(tr);
    }
  }

  isEmpty(): boolean {
    const { editorView } = this.state;
    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  get value(): string | undefined {
    return this.props.defaultValue;
  }

  get doc(): Node | undefined {
    const { editorView } = this.state;
    return editorView
      ? editorView.state.doc
      : undefined;
  }

  render() {
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorState, editorView } = this.state;
    const listsState = editorState && listsPlugin.getState(editorState);
    const blockTypeState = editorState && blockTypePlugin.getState(editorState);
    const clearFormattingState = editorState && clearFormattingPlugin.getState(editorState);
    const codeBlockState = editorState && codeBlockPlugin.getState(editorState);
    const panelState = editorState && panelPlugin.getState(editorState);
    const textFormattingState = editorState && textFormattingPlugin.getState(editorState);
    const hyperlinkState = editorState && hyperlinkPlugin.getState(editorState);
    const imageUploadState = editorState && imageUploadPlugin.getState(editorState);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
        editorView={editorView!}
        pluginStateLists={listsState}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStatePanel={panelState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateImageUpload={imageUploadState}
      />
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  private handleRef = (place: Element | null) => {
    if (place) {
      const editorState = EditorState.create(
        {
          schema,
          plugins: [
            listsPlugin,
            blockTypePlugin,
            clearFormattingPlugin,
            codeBlockPlugin,
            panelPlugin,
            textFormattingPlugin,
            hyperlinkPlugin,
            rulePlugin,
            imageUploadPlugin,
            history(),
            keymap(baseKeymap) // should be last :(
          ]
        }
      );
      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        }
      });
      imageUploadPlugin.getState(editorView.state).setUploadHandler(this.props.imageUploadHandler);

      editorView.focus();

      this.setState({ editorView, editorState });
    } else {
      this.setState({ editorView: undefined, editorState: undefined });
    }
  }
}

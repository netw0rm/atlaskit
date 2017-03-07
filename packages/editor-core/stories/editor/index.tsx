import * as React from 'react';
import { PureComponent } from 'react';
import {
  Chrome,
  ContextName
} from '../../';
import listsPlugin from '../../src/plugins/lists/index-future';
import blockTypePlugin from '../../src/plugins/block-type';
import codeBlockPlugin from '../../src/plugins/code-block';
import hyperlinkPlugin from '../../src/plugins/hyperlink';
import { buildKeymap } from '../../src/plugins/keymaps';
import buildInputRules from '../../src/plugins/inputrules/input-future';
import {
  baseKeymap,
  EditorState,
  EditorView,
  history,
  inputRules,
  keymap,
  Node,
  TextSelection
} from '../../src/prosemirror';
import schema from './schema';

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploader?: Function;
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
    const codeBlockState = editorState && codeBlockPlugin.getState(editorState);
    const hyperlinkState = editorState && hyperlinkPlugin.getState(editorState);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
        editorView={editorView}
        pluginStateLists={listsState}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateHyperlink={hyperlinkState}
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
            codeBlockPlugin,
            hyperlinkPlugin,
            inputRules({ rules: buildInputRules(schema) }),
            history(),
            keymap(buildKeymap(schema)),
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

      editorView.focus();

      this.setState({ editorView, editorState });
    } else {
      this.setState({ editorView: undefined, editorState: undefined });
    }
  }
}

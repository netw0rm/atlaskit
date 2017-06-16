import * as React from 'react';
import { PureComponent } from 'react';
import applyDevTools from 'prosemirror-dev-tools';

import {
  Chrome,
  codeBlockPlugins,
  blockTypePlugins,
  rulePlugins,
  hyperlinkPlugins,
  listsPlugins,
  textFormattingPlugins,
  panelPlugins,
  clearFormattingPlugins,
  codeBlockStateKey,
  panelStateKey,
  blockTypeStateKey,
  hyperlinkStateKey,
  listsStateKey,
  textFormattingStateKey,
  clearFormattingStateKey,
  EditorView,
  EditorState,
  Node,
  TextSelection,
  ProviderFactory,
  history,
  keymap,
  baseKeymap,

  // nodeviews
  reactNodeViewPlugins,
  panelNodeView,
} from '@atlaskit/editor-core';

import schema from './schema';
import { codeMirrorKeymapsPlugin, codeMirrorNodeViewFactory } from '../../src';


export type ImageUploadHandler = (e: any, insertImageFn: any) => void;
export interface Props {
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;
    if (editorView && !editorView.hasFocus()) {
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
    const getState =
      (editorState: EditorState<any> | undefined) =>
      (stateKey: any) => editorState && stateKey.getState(editorState);

    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorView } = this.state;
    const editorState = editorView && editorView.state;

    const getStateFromKey = getState(editorState);

    const listsState = getStateFromKey(listsStateKey);
    const blockTypeState = getStateFromKey(blockTypeStateKey);
    const clearFormattingState = getStateFromKey(clearFormattingStateKey);
    const codeBlockState = getStateFromKey(codeBlockStateKey);
    const panelState = getStateFromKey(panelStateKey);
    const textFormattingState = getStateFromKey(textFormattingStateKey);
    const hyperlinkState = getStateFromKey(hyperlinkStateKey);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="yes"
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
            ...listsPlugins(schema),
            ...clearFormattingPlugins(schema),
            ...codeBlockPlugins(schema),
            codeMirrorKeymapsPlugin(),
            ...textFormattingPlugins(schema),
            ...hyperlinkPlugins(schema),
            ...panelPlugins(schema),
            ...rulePlugins(schema),
            // block type plugin needs to be after hyperlink plugin until we implement keymap priority
            // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
            // if converting is possible
            ...blockTypePlugins(schema),
            ...reactNodeViewPlugins(schema),
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
        },
        nodeViews: {
          panel: panelNodeView,
          codeBlock: codeMirrorNodeViewFactory(schema, codeBlockStateKey),
        },
      });

      applyDevTools(editorView);

      editorView.focus();

      this.setState({ editorView });
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

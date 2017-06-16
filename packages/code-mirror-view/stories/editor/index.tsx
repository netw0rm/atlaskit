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
  ProviderFactory,
  history,
  keymap,
  baseKeymap,

  // nodeviews
  reactNodeViewPlugins,
  panelNodeView,
} from '@atlaskit/editor-core';

import schema from './schema';
import { codeMirrorPlugins, codeMirrorNodeViewFactory } from '../../src';

export interface Props {
  onCancel?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
}

export interface State {
  editorView?: EditorView;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  noop = () => {};

  render() {
    const getState =
      (editorState: EditorState<any> | undefined) =>
      (stateKey: any) => editorState && stateKey.getState(editorState);

    const { editorView } = this.state;
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
        isExpanded={true}
        feedbackFormUrl="yes"
        onCancel={this.props.onCancel}
        onSave={this.props.onSave}
        placeholder=""
        onCollapsedChromeFocus={this.noop}
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

  private handleRef = (place: Element | null) => {

    if (place) {
      const editorState = EditorState.create(
        {
          schema,
          plugins: [
            ...clearFormattingPlugins(schema),
            ...textFormattingPlugins(schema),
            ...hyperlinkPlugins(schema),
            ...panelPlugins(schema),
            ...rulePlugins(schema),
            // block type plugin needs to be after hyperlink plugin until we implement keymap priority
            // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
            // if converting is possible
            ...blockTypePlugins(schema),
            ...listsPlugins(schema),
            ...codeBlockPlugins(schema),
            ...codeMirrorPlugins(schema),
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
        },
        nodeViews: {
          panel: panelNodeView,
          codeBlock: codeMirrorNodeViewFactory(schema),
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

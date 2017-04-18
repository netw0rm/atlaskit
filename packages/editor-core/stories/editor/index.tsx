import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { EmojiProvider } from '@atlaskit/emoji';

import {
  Chrome,
  ContextName
} from '../../';
import blockTypePlugins, {stateKey as blockTypeStateKey} from '../../src/plugins/block-type';
import clearFormattingPlugins, {stateKey as clearFormattingStateKey} from '../../src/plugins/clear-formatting';
import codeBlockPlugins, {stateKey as codeBlockStateKey} from '../../src/plugins/code-block';
import panelPlugins, {stateKey as panelStateKey} from '../../src/plugins/panel';
import textFormattingPlugins, {stateKey as textFormattingStateKey} from '../../src/plugins/text-formatting';
import hyperlinkPlugins, {stateKey as hyperlinkStateKey} from '../../src/plugins/hyperlink';
import rulePlugins from '../../src/plugins/rule';
import imageUploadPlugins, {stateKey as imageUploadStateKey} from '../../src/plugins/image-upload';
import listsPlugins, {stateKey as listsStateKey} from '../../src/plugins/lists';
import mentionsPlugins, {stateKey as mentionsStateKey} from '../../src/plugins/mentions';
import emojiPlugins, {stateKey as emojiStateKey} from '../../src/plugins/emojis';
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
import ProviderFactory from '../../src/providerFactory';
import { mentionNodeView } from '../../src/schema/nodes/mention';
import { emojiNodeView } from '../../src/schema/nodes/emoji';
import { AnalyticsHandler, analyticsService } from '../../src/analytics';

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;
export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploadHandler?: ImageUploadHandler;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  analyticsHandler?: AnalyticsHandler;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
}

export default class Editor extends PureComponent<Props, State> {

  state: State;

  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };

    analyticsService.handler = props.analyticsHandler || ((name) => {});
    this.providerFactory = new ProviderFactory();
  }

  componentWillMount() {
    this.handleProviders(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (props.mentionProvider !== nextProps.mentionProvider) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { emojiProvider, mentionProvider } = props;
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.setState({
      emojiProvider,
      mentionProvider
    });
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
    const { mentionProvider, emojiProvider } = this.state;

    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorView } = this.state;
    const editorState = editorView && editorView.state;
    const listsState = editorState && listsStateKey.getState(editorState);
    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const panelState = editorState && panelStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const imageUploadState = editorState && imageUploadStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const emojiState = editorState && emojiStateKey.getState(editorState);

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
        pluginStateImageUpload={imageUploadState}
        pluginStateMentions={mentionsState}
        pluginStateEmojis={emojiState}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
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
            ...blockTypePlugins(schema),
            ...clearFormattingPlugins(schema),
            ...codeBlockPlugins(schema),
            ...panelPlugins(schema),
            ...textFormattingPlugins(schema),
            ...hyperlinkPlugins(schema),
            ...rulePlugins(schema),
            ...imageUploadPlugins(schema),
            ...mentionsPlugins(schema),
            ...emojiPlugins(schema),
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
          mention: mentionNodeView(this.providerFactory),
          emoji: emojiNodeView(this.providerFactory),
        }
      });
      imageUploadStateKey.getState(editorView.state).setUploadHandler(this.props.imageUploadHandler);
      mentionsStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);
      emojiStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);

      editorView.focus();

      this.setState({ editorView });
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

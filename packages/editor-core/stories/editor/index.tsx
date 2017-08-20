import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { EmojiProvider } from '@atlaskit/emoji';
import applyDevTools from 'prosemirror-dev-tools';
import { gapCursor as gapCursorPlugin } from 'prosemirror-gapcursor';

import { Chrome } from '../../';
import blockTypePlugins, { stateKey as blockTypeStateKey } from '../../src/plugins/block-type';
import clearFormattingPlugins, { stateKey as clearFormattingStateKey } from '../../src/plugins/clear-formatting';
import codeBlockPlugins, { stateKey as codeBlockStateKey } from '../../src/plugins/code-block';
import panelPlugins, { stateKey as panelStateKey } from '../../src/plugins/panel';
import textFormattingPlugins, { stateKey as textFormattingStateKey } from '../../src/plugins/text-formatting';
import hyperlinkPlugins, { stateKey as hyperlinkStateKey } from '../../src/plugins/hyperlink';
import rulePlugins from '../../src/plugins/rule';
import listsPlugins, { stateKey as listsStateKey } from '../../src/plugins/lists';
import mentionsPlugins, { stateKey as mentionsStateKey } from '../../src/plugins/mentions';
import emojiPlugins, { stateKey as emojiStateKey } from '../../src/plugins/emojis';
import asciiEmojiPlugins from '../../src/plugins/emojis/ascii-input-rules';
import tablePlugins, { stateKey as tableStateKey } from '../../src/plugins/table';
import pastePlugins from '../../src/plugins/paste';
import { reactNodeViewPlugins, tasksAndDecisionsPlugin } from '../../src/plugins';
import { Schema } from '../../src/prosemirror';

import textColorPlugins, { stateKey as textColorStateKey } from '../../src/plugins/text-color';
import {
  baseKeymap,
  EditorState,
  EditorView,
  history,
  keymap,
  Node,
  TextSelection,
  PluginKey,
} from '../../src/prosemirror';
import { default as schemaFull } from '../schema';
import ProviderFactory from '../../src/providerFactory';
import { AnalyticsHandler, analyticsService } from '../../src/analytics';

import {
  MediaProvider,
  MediaState,
  Plugin,
  ErrorReporter,
  ErrorReportingHandler,
} from '../../src';

import {
  mediaPluginFactory,
  mediaStateKey,
} from '../../src/plugins';

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;
export interface Props {
  devTools?: boolean;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploadHandler?: ImageUploadHandler;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  mediaProvider?: Promise<MediaProvider>;
  activityProvider?: Promise<any>;
  analyticsHandler?: AnalyticsHandler;
  errorReporter?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  height?: number;
  schema?: Schema<any, any>;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
}

export default class Editor extends PureComponent<Props, State> {
  private mediaPlugins: Plugin[];
  private schema: Schema<any, any>;

  state: State;
  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
    this.schema = props.schema || schemaFull;

    analyticsService.handler = props.analyticsHandler || (name => { });
    this.providerFactory = new ProviderFactory();

    const errorReporter = new ErrorReporter();
    if (props.errorReporter) {
      errorReporter.handler = props.errorReporter;
    }

    const { uploadErrorHandler } = props;
    this.mediaPlugins = mediaPluginFactory(this.schema, {
      uploadErrorHandler,
      errorReporter,
      providerFactory: this.providerFactory,
    });
  }

  componentWillMount() {
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    this.providerFactory.destroy();

    const { editorView } = this.state;
    if (editorView) {
      if (editorView.state) {
        const mediaPluginState = mediaStateKey.getState(editorView.state);
        if (mediaPluginState) {
          mediaPluginState.destroy();
        }
      }

      editorView.destroy();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;

    if (
      props.mentionProvider !== nextProps.mentionProvider ||
      props.mediaProvider !== nextProps.mediaProvider ||
      props.emojiProvider !== nextProps.emojiProvider ||
      props.activityProvider !== nextProps.activityProvider
    ) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { emojiProvider, mediaProvider, mentionProvider, activityProvider } = props;
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider('mediaProvider', mediaProvider);
    this.providerFactory.setProvider('activityProvider', activityProvider);

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
    return editorView && editorView.state.doc ? !!editorView.state.doc.textContent : false;
  }

  get value(): string | undefined {
    return this.props.defaultValue;
  }

  set doc(newDoc: Node | undefined) {
    const { editorView } = this.state;
    assert(editorView, 'EditorView doesn\'t exist yet');
    assert(newDoc, 'New document cannot be nullable');

    const { tr, doc } = editorView!.state;
    editorView!.dispatch(tr.replace(0, doc.nodeSize - 2, newDoc!.slice(0, newDoc!.nodeSize - 2)));
  }

  get doc(): Node | undefined {
    const { editorView } = this.state;
    return editorView ? editorView.state.doc : undefined;
  }

  render() {
    const { mentionProvider, emojiProvider } = this.state;
    const { activityProvider } = this.props;

    const getState = (editorState: EditorState<any> | undefined) => (stateKey: PluginKey) =>
      editorState && stateKey.getState(editorState);

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
    const mediaState = this.props.mediaProvider && getStateFromKey(mediaStateKey);
    const mentionsState = getStateFromKey(mentionsStateKey);
    const emojiState = getStateFromKey(emojiStateKey);
    const textColorState = getStateFromKey(textColorStateKey);
    const tableState = getStateFromKey(tableStateKey);

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
        pluginStateMedia={mediaState}
        pluginStateMentions={mentionsState}
        pluginStateEmojis={emojiState}
        pluginStateTextColor={textColorState}
        pluginStateTable={tableState}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        activityProvider={activityProvider}
        popupsMountPoint={this.props.popupsMountPoint}
        popupsBoundariesElement={this.props.popupsBoundariesElement}
        helpDialogPresent={true}
        maxHeight={200}
        height={this.props.height}
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
    const { mediaPlugins, schema } = this;
    const { defaultValue } = this.props;

    let doc;
    if (defaultValue && defaultValue !== '{}') {
      doc = schema.nodeFromJSON(JSON.parse(defaultValue));
    } else {
      doc = schema.nodeFromJSON({type:'doc', content: [{type: 'paragraph'}]});
    }

    if (place) {
      const editorState = EditorState.create({
        schema,
        doc,
        plugins: [
          ...pastePlugins(schema),
          ...(schema.nodes.mention ? mentionsPlugins(schema, this.providerFactory) : []), // mentions and emoji needs to be first
          ...(schema.nodes.emoji ? emojiPlugins(schema, this.providerFactory) : []),
          ...(schema.nodes.emoji ? asciiEmojiPlugins(schema, this.providerFactory) : []),
          ...clearFormattingPlugins(schema),
          ...textFormattingPlugins(schema),
          ...hyperlinkPlugins(schema),
          ...rulePlugins(schema),
          ...(schema.marks.textColor ? textColorPlugins(schema) : []),
          ...(schema.nodes.media ? mediaPlugins : []),
          // block type plugin needs to be after hyperlink plugin until we implement keymap priority
          // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
          // if converting is possible.
          // it also needs to be after media plugin because of mod + z
          // because it needs to ignore links detection if transaction is triggered by mod + z
          ...blockTypePlugins(schema),
          // The following order of plugins blockTypePlugins -> listBlock -> codeBlockPlugins -> panelPlugins
          // this is needed to ensure that all block types are supported inside lists
          // this is needed until we implement keymap proirity :(
          ...listsPlugins(schema),
          ...codeBlockPlugins(schema),
          ...panelPlugins(schema),
          ...(schema.nodes.table ? tablePlugins() : []),
          ...reactNodeViewPlugins(schema),
          ...(schema.nodes.taskList && schema.nodes.decisionList ? tasksAndDecisionsPlugin(schema) : []),
          gapCursorPlugin(),
          history(),
          keymap(baseKeymap) // should be last :(
        ]
      });
      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: tr => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        }
      });

      if (this.props.devTools) {
        applyDevTools(editorView);
      }

      editorView.focus();

      this.setState({ editorView });
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

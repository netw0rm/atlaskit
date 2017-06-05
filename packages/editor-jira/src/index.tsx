import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  Chrome,
  blockTypePlugins,
  clearFormattingPlugins,
  codeBlockPlugins,
  hyperlinkPlugins,
  mentionsPlugins,
  rulePlugins,
  textFormattingPlugins,
  textColorPlugins,
  listsPlugins,
  blockTypeStateKey,
  clearFormattingStateKey,
  codeBlockStateKey,
  hyperlinkStateKey,
  mentionsStateKey,
  textFormattingStateKey,
  textColorStateKey,
  listsStateKey,
  ContextName,
  EditorState,
  EditorView,
  Schema,
  history,
  keymap,
  ProviderFactory,
  TextSelection,
  version as coreVersion,

  MediaProvider,
  MediaState,
  MediaPluginState,
  mediaPluginFactory,
  mediaStateKey,

  Plugin,

  // nodeviews
  nodeViewFactory,
  ReactMentionNode,
  ReactMediaNode,
  ReactMediaGroupNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { encode, parse } from './html';
import {
  JIRASchema,
  isSchemaWithCodeBlock,
  isSchemaWithLinks,
  isSchemaWithMentions,
  isSchemaWithMedia,
  isSchemaWithTextColor,
  makeSchema,
} from './schema';
import { version, name } from './version';

export { version };

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  onExpanded?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  allowLists?: boolean;
  allowLinks?: boolean;
  allowCodeBlock?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowBlockQuote?: boolean;
  allowSubSup?: boolean;
  allowTextColor?: boolean;
  mentionProvider?: Promise<MentionProvider>;
  mentionEncoder?: (userId: string) => string;
  mediaProvider ?: Promise<MediaProvider>;
  uploadErrorHandler ?: (state: MediaState) => void;
  errorReporter?: ErrorReportingHandler;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isMediaReady: boolean;
  isExpanded?: boolean;
  schema: JIRASchema;
}

export default class Editor extends PureComponent<Props, State> {
  private providerFactory: ProviderFactory;
  private mediaPlugins: Plugin[];
  state: State;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);

    const {
      allowLists, allowLinks, allowAdvancedTextFormatting,
      allowCodeBlock, allowBlockQuote, allowSubSup, allowTextColor,

      analyticsHandler,

      mentionProvider,
      mediaProvider, uploadErrorHandler,

      isExpandedByDefault: isExpanded
    } = props;

    const schema = makeSchema({
      allowLists: !!allowLists,
      allowMentions: !!mentionProvider,
      allowLinks: !!allowLinks,
      allowAdvancedTextFormatting: !!allowAdvancedTextFormatting,
      allowCodeBlock: !!allowCodeBlock,
      allowBlockQuote: !!allowBlockQuote,
      allowSubSup: !!allowSubSup,
      allowTextColor: !!allowTextColor,
      allowMedia: !!mediaProvider,
    });

    this.state = { isExpanded, schema, isMediaReady: true };

    this.providerFactory = new ProviderFactory();

    if (mentionProvider) {
      this.providerFactory.setProvider('mentionProvider', mentionProvider);
    }

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);

      const errorReporter = new ErrorReporter();
      if (props.errorReporter) {
        errorReporter.handler = props.errorReporter;
      }

      this.mediaPlugins = mediaPluginFactory(schema, {
        uploadErrorHandler,
        errorReporter,
        providerFactory: this.providerFactory
      });
    }

    analyticsService.handler = analyticsHandler || ((name) => { });
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

  /**
   * Expand the editor chrome
   */
  expand = () => {
    const { onExpanded } = this.props;
    const { schema } = this.state;

    this.setState({ isExpanded: true, schema });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  /**
   * Collapse the editor chrome
   */
  collapse = () => {
    const { schema } = this.state;

    this.setState({ isExpanded: false, schema });
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
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

  /**
   * Check if the user has entered any significant content.
   * (i.e. text)
   */
  isDirty(): boolean {
    const { editorView } = this.state;

    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as HTML.
   */
  get value(): string | undefined {
    const { editorView, schema } = this.state;

    return editorView && editorView.state.doc
      ? encode(editorView.state.doc, schema, { mention: this.props.mentionEncoder })
      : this.props.defaultValue;
  }

  render() {
    const { editorView, isExpanded, isMediaReady } = this.state;
    const { mentionProvider, mediaProvider } = this.props;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const editorState = editorView && editorView.state;

    const listsState = editorState && listsStateKey.getState(editorState);
    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const textColorState = editorState && textColorStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const mediaState = editorState && mediaProvider && this.mediaPlugins && mediaStateKey.getState(editorState);

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        editorView={editorView!}
        isExpanded={isExpanded}
        mentionProvider={mentionProvider}
        onCancel={handleCancel}
        onSave={handleSave}
        onCollapsedChromeFocus={this.expand}
        placeholder={this.props.placeholder}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateLists={listsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateTextColor={textColorState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateMentions={mentionsState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateMedia={mediaState}
        packageVersion={version}
        packageName={name}
        saveDisabled={!isMediaReady}
      />
    );
  }

  private handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(this);
    }
  }

  private handleChange = async () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this);
    }


    const { editorView } = this.state;
    const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

    if (mediaPluginState) {
      this.setState({ isMediaReady: false });
      await mediaPluginState.waitForPendingTasks();
      this.setState({ isMediaReady: true });
    }
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  private handleRef = (place: Element | null) => {
    const { schema } = this.state;

    if (place) {
      const { context } = this.props;
      const jiraKeymap = {
        'Mod-Enter': this.handleSave,
      };

      const editorState = EditorState.create({
        schema,
        doc: parse(this.props.defaultValue || '', schema),
        plugins: [
          ...(isSchemaWithLinks(schema) ? hyperlinkPlugins(schema as Schema<any, any>) : []),
          ...(isSchemaWithMentions(schema) ? mentionsPlugins(schema as Schema<any, any>) : []),
          ...blockTypePlugins(schema as Schema<any, any>),
          ...clearFormattingPlugins(schema as Schema<any, any>),
          ...(isSchemaWithCodeBlock(schema) ? codeBlockPlugins(schema as Schema<any, any>) : []),
          ...listsPlugins(schema as Schema<any, any>),
          ...rulePlugins(schema as Schema<any, any>),
          ...(isSchemaWithMedia(schema) ? this.mediaPlugins : []),
          ...textFormattingPlugins(schema as Schema<any, any>),
          ...(isSchemaWithTextColor(schema) ? textColorPlugins(schema as Schema<any, any>) : []),
          ...reactNodeViewPlugins(schema as Schema<any, any>),
          history(),
          keymap(jiraKeymap),
          keymap(baseKeymap), // should be last :(
        ]
      });

      if (context) {
        const blockTypeState = blockTypeStateKey.getState(editorState);
        blockTypeState.changeContext(context);
      }

      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        },
        nodeViews: {
          mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
          mediaGroup: nodeViewFactory(this.providerFactory, {
            mediaGroup: ReactMediaGroupNode,
            media: ReactMediaNode,
          }, true),
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        }
      });

      analyticsService.trackEvent('atlassian.editor.start');

      if (isSchemaWithMentions(schema)) {
        mentionsStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);
      }

      this.setState({ editorView }, this.focus);
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

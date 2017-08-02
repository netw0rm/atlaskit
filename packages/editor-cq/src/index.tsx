import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  Chrome,
  EditorState,
  EditorView,
  history,
  blockTypePlugins,
  codeBlockPlugins,
  hyperlinkPlugins,
  listsPlugins,
  rulePlugins,
  textFormattingPlugins,
  clearFormattingPlugins,
  panelPlugins,
  mentionsPlugins,
  tablePlugins,
  tableStateKey,
  blockTypeStateKey,
  codeBlockStateKey,
  hyperlinkStateKey,
  listsStateKey,
  textFormattingStateKey,
  clearFormattingStateKey,
  panelStateKey,
  mentionsStateKey,
  keymap,
  Node as PMNode,
  TextSelection,
  version as coreVersion,
  mediaPluginFactory,
  mediaStateKey,
  MediaProvider,
  Plugin,
  ProviderFactory,
  MediaPluginState,
  MediaState,
  Slice,

  // nodeviews
  nodeViewFactory,
  ReactMediaGroupNode,
  ReactMediaNode,
  ReactMentionNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { encode, parse, supportedLanguages } from './cxhtml';
import { version, name } from './version';
import { default as schema } from './schema';
import ReactJIRAIssueNode from './nodeviews/ui/jiraIssue';
import ReactUnsupportedBlockNode from './nodeviews/ui/unsupportedBlock';
import ReactUnsupportedInlineNode from './nodeviews/ui/unsupportedInline';
export { version };

export interface Props {
  additionalPlugins?: Array<Plugin>;
  disabled?: boolean;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  expanded?: boolean;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  onExpanded?: (editor?: Editor) => void;
  placeholder?: string;
  uploadErrorHandler?: (state: MediaState) => void;
  analyticsHandler?: AnalyticsHandler;
  errorReporter?: ErrorReportingHandler;
  mediaProvider?: Promise<MediaProvider>;
  mentionProvider?: Promise<MentionProvider>;
  popupsBoundariesElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  tablesEnabled?: boolean;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  isMediaReady: boolean;
  schema: typeof schema;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  version = `${version} (editor-core ${coreVersion})`;
  mentionProvider: Promise<MentionProvider>;

  private providerFactory: ProviderFactory;
  private mediaPlugins: Plugin[];

  constructor(props: Props) {
    super(props);

    this.state = {
      schema,
      isExpanded: (props.expanded !== undefined) ? props.expanded : props.isExpandedByDefault,
      isMediaReady: true,
    };

    this.providerFactory = new ProviderFactory();
    analyticsService.handler = props.analyticsHandler || ((name) => {});

    const { mentionProvider, mediaProvider, uploadErrorHandler } = props;

    if (mentionProvider) {
      this.mentionProvider = mentionProvider;
      this.providerFactory.setProvider('mentionProvider', mentionProvider);
    }

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);
    }

    const errorReporter = new ErrorReporter();
    if (props.errorReporter) {
      errorReporter.handler = props.errorReporter;
    }

    this.mediaPlugins = mediaPluginFactory(schema, {
      uploadErrorHandler,
      errorReporter,
      providerFactory: this.providerFactory,
    });
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { editorView } = this.state;

    if (editorView && !editorView.hasFocus()) {
      try {
        editorView.focus();
      } catch (ex) {}
    }
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
  isEmpty(): boolean {
    const { editorView } = this.state;

    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as CXTML.
   */
  get value(): Promise<string | undefined> {
    const { editorView } = this.state;
    const mediaPluginState = mediaStateKey.getState(editorView!.state) as MediaPluginState;

    return (async () => {
      await mediaPluginState.waitForPendingTasks();

      return editorView && editorView.state.doc
          ? encode(editorView.state.doc)
          : this.props.defaultValue;
    })();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props, providerFactory } = this;
    const { mediaProvider } = nextProps;

    if (props.mediaProvider !== mediaProvider) {
      providerFactory.setProvider('mediaProvider', mediaProvider);
    }

    if (nextProps.expanded !== this.props.expanded) {
      this.setState({ isExpanded: nextProps.expanded });

      const { onExpanded } = this.props;
      if (onExpanded) {
        onExpanded(this);
      }
    }


    const { editorView } = this.state;
    if (editorView && nextProps.disabled !== this.props.disabled) {
      editorView.dom.contentEditable = String(!nextProps.disabled);

      if (!nextProps.disabled) {
        editorView.focus();
      }
    }
    if (editorView && nextProps.additionalPlugins !== this.props.additionalPlugins) {
      const config = this.getEditorConfig();
      editorView.state.reconfigure(config);
    }
  }

  componentWillUnmount() {
    this.providerFactory.destroy();

    const { editorView } = this.state;
    if (editorView) {
      if (editorView.state) {
        mediaStateKey.getState(editorView.state).destroy();
      }

      editorView.destroy();
    }
  }

  render() {
    const {
      disabled = false,
      tablesEnabled,
      popupsBoundariesElement,
      popupsMountPoint
    } = this.props;
    const { editorView, isExpanded, isMediaReady } = this.state;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const editorState = editorView && editorView.state;

    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const clearFormattingState = editorState && clearFormattingStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const listsState = editorState && listsStateKey.getState(editorState);
    const mediaState = editorState && this.mediaPlugins && this.props.mediaProvider && mediaStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const panelState = editorState && panelStateKey.getState(editorState);
    const mentionsState = editorState && mentionsStateKey.getState(editorState);
    const tableState = tablesEnabled && editorState && tableStateKey.getState(editorState);
    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        disabled={disabled}
        editorView={editorView!}
        isExpanded={isExpanded}
        feedbackFormUrl="yes"
        onCancel={handleCancel}
        onSave={handleSave}
        onCollapsedChromeFocus={this.handleCollapsedChromeFocus}
        placeholder={this.props.placeholder}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateLists={listsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateMedia={mediaState}
        pluginStatePanel={panelState}
        pluginStateTable={tableState}
        packageVersion={version}
        packageName={name}
        mentionProvider={this.mentionProvider}
        pluginStateMentions={mentionsState}
        saveDisabled={!isMediaReady}
        popupsBoundariesElement={popupsBoundariesElement}
        popupsMountPoint={popupsMountPoint}
      />
    );
  }

  private handleCollapsedChromeFocus = () => {
    const { onExpanded } = this.props;
    this.setState({ isExpanded: true });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  private getEditorConfig() {
    const { schema } = this.state;
    const { mediaPlugins } = this;
    const { additionalPlugins, tablesEnabled, defaultValue } = this.props;
    const doc = parse(defaultValue || '');
    const cqKeymap = {
      'Mod-Enter': this.handleSave,
    };

    return {
        schema,
        doc,
        plugins: [
          ...mentionsPlugins(schema, this.providerFactory),
          ...clearFormattingPlugins(schema),
          ...hyperlinkPlugins(schema),
          ...rulePlugins(schema),
          ...mediaPlugins,
          ...panelPlugins(schema),
          // block type plugin needs to be after hyperlink plugin until we implement keymap priority
          // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
          // if converting is possible
          ...blockTypePlugins(schema),
          // The following order of plugins blockTypePlugins -> listBlock -> codeBlockPlugins
          // this is needed to ensure that all block types are supported inside lists
          // this is needed until we implement keymap proirity :(
          ...listsPlugins(schema),
          ...textFormattingPlugins(schema),
          ...codeBlockPlugins(schema),
          ...reactNodeViewPlugins(schema),
          ...(tablesEnabled ? tablePlugins() : []),
          history(),
          keymap(cqKeymap),
          keymap(baseKeymap),
          ...(additionalPlugins || [])
        ]
      };
  }

  private handleRef = (place: Element | null) => {

    if (place) {
      const config = this.getEditorConfig();
      const editorState = EditorState.create(config);

      const codeBlockState = codeBlockStateKey.getState(editorState);
      codeBlockState.setLanguages(supportedLanguages);

      const editorView = new EditorView(place, {
        state: editorState,
        editable: (state: EditorState<any>) => !this.props.disabled,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        },
        nodeViews: {
          jiraIssue: nodeViewFactory(this.providerFactory, { jiraIssue: ReactJIRAIssueNode }),
          unsupportedBlock: nodeViewFactory(this.providerFactory, { unsupportedBlock: ReactUnsupportedBlockNode }, true),
          unsupportedInline: nodeViewFactory(this.providerFactory, { unsupportedInline: ReactUnsupportedInlineNode }),
          mediaGroup: nodeViewFactory(this.providerFactory, {
            mediaGroup: ReactMediaGroupNode,
            media: ReactMediaNode,
          }, true),
          mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        },
        handlePaste(view: EditorView, event: any, slice: Slice): boolean {
          const { clipboardData } = event;
          const html = clipboardData && clipboardData.getData('text/html');
          // we let table plugin to handle pasting of html that contain tables, because the logic is pretty complex
          if (html && !html.match(/<table[^>]+>/g)) {
            const doc = parse(html.replace(/^<meta[^>]+>/, ''));
            view.dispatch(
              view.state.tr.replaceSelection(new Slice(doc.content, slice.openStart, slice.openEnd))
            );
            return true;
          }
          return false;
        },
      });

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ editorView }, () => {
        this.focus();
      });

      this.sendUnsupportedNodeUsage(config.doc);
    } else {
      this.setState({ editorView: undefined });
    }
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

    this.setState({ isMediaReady: false });
    await mediaPluginState.waitForPendingTasks();
    this.setState({ isMediaReady: true });
  }

  private handleSave = () => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(this);
    }
  }

  /**
   * Traverse document nodes to find the number of unsupported ones
   */
  private sendUnsupportedNodeUsage(doc: PMNode) {
    const { unsupportedBlock, unsupportedInline } = schema.nodes;
    let blockNodesOccurance = 0;
    let inlineNodesOccurance = 0;

    traverseNode(doc);

    for (let i = 0; i < blockNodesOccurance; i++) {
      analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.block');
    }

    for (let i = 0; i < inlineNodesOccurance; i++) {
      analyticsService.trackEvent('atlassian.editor.confluenceUnsupported.inline');
    }

    function traverseNode(node: PMNode) {
      if (node.type === unsupportedBlock) {
        blockNodesOccurance += 1;
      } else if (node.type === unsupportedInline) {
        inlineNodesOccurance += 1;
      } else {
        node.content.forEach(traverseNode);
      }
    }
  }

}

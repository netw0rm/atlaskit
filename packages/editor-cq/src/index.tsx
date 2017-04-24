import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  Chrome,
  ContextName,
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
  mediaNodeView,
  MediaProvider,
  Plugin,
  mentionNodeView,
  ProviderFactory,
  MediaPluginState
} from '@atlaskit/editor-core';
import * as React from 'react';
import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { encode, parse, supportedLanguages } from './cxhtml';
import { version, name } from './version';
import { CQSchema, default as schema } from './schema';
import { jiraIssueNodeView } from './schema/nodes/jiraIssue';
export { version };

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  expanded?: boolean;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  mediaProvider?: Promise<MediaProvider>;
  mentionProvider?: Promise<MentionProvider>;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  isMediaReady: boolean;
  schema: CQSchema;
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

    const { mentionProvider, mediaProvider } = props;

    if (mentionProvider) {
      this.mentionProvider = mentionProvider;
      this.providerFactory.setProvider('mentionProvider', mentionProvider);
    }

    if (mediaProvider) {
      this.providerFactory.setProvider('mediaProvider', mediaProvider);
    }

    this.mediaPlugins = mediaPluginFactory(schema, {
      providerFactory: this.providerFactory,
      behavior: 'default'
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
    }
  }

  componentWillUnmount() {
    const { editorView } = this.state;
    if (editorView) {
      if (editorView.state) {
        mediaStateKey.getState(editorView.state).destroy();
      }

      editorView.destroy();
    }
  }

  render() {
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

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        editorView={editorView!}
        isExpanded={isExpanded}
        feedbackFormUrl="yes"
        onCancel={handleCancel}
        onSave={handleSave}
        onCollapsedChromeFocus={() => this.setState({ isExpanded: true })}
        placeholder={this.props.placeholder}
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateLists={listsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateMedia={mediaState}
        pluginStatePanel={panelState}
        packageVersion={version}
        packageName={name}
        mentionProvider={this.mentionProvider}
        pluginStateMentions={mentionsState}
        saveDisabled={!isMediaReady}
      />
    );
  }

  private handleRef = (place: Element | null) => {
    const { schema } = this.state;
    const { mediaPlugins } = this;

    if (place) {
      const { context } = this.props;
      const doc = parse(this.props.defaultValue || '');
      const cqKeymap = {
        'Mod-Enter': this.handleSave,
      };

      const editorState = EditorState.create({
        schema,
        doc,
        plugins: [
          ...mentionsPlugins(schema),
          ...blockTypePlugins(schema),
          ...clearFormattingPlugins(schema),
          ...codeBlockPlugins(schema),
          ...hyperlinkPlugins(schema),
          ...listsPlugins(schema),
          ...rulePlugins(schema),
          ...textFormattingPlugins(schema),
          ...mediaPlugins,
          ...panelPlugins(schema),
          history(),
          keymap(cqKeymap),
          keymap(baseKeymap),
        ]
      });

      const codeBlockState = codeBlockStateKey.getState(editorState);
      codeBlockState.setLanguages(supportedLanguages);

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
          mention: mentionNodeView(this.providerFactory),
          jiraIssue: jiraIssueNodeView,
          media: mediaNodeView(this.providerFactory)
        },
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        },
      });

      if (this.mentionProvider) {
        mentionsStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);
      }

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ editorView });
      this.focus();

      this.sendUnsupportedNodeUsage(doc);
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

    this.setState({ isMediaReady: false });
    await this.value;
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
      analyticsService.trackEvent('atlassian.editor.unsupported.block');
    }

    for (let i = 0; i < inlineNodesOccurance; i++) {
      analyticsService.trackEvent('atlassian.editor.unsupported.inline');
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

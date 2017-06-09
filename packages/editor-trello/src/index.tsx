import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  blockTypePlugins,
  blockTypeStateKey,
  ChromeCollapsed,
  codeBlockPlugins,
  EditorState,
  EditorView,
  EmojiTypeAhead,
  emojisPlugins,
  emojisStateKey,
  history,
  hyperlinkPlugins,
  hyperlinkStateKey,
  keymap,
  listsPlugins,
  listsStateKey,
  MentionPicker,
  mentionsPlugins,
  mentionsStateKey,
  ProviderFactory,
  rulePlugins,
  textFormattingPlugins,
  textFormattingStateKey,
  TextSelection,
  ToolbarBlockType,
  ToolbarTextFormatting,
  ToolbarLists,
  ToolbarHyperlink,
  version as coreVersion,

  // nodeviews
  nodeViewFactory,
  ReactEmojiNode,
  ReactMentionNode,
  reactNodeViewPlugins,

  // error-reporting
  ErrorReporter,
  ErrorReportingHandler,
} from '@atlaskit/editor-core';
import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { TrelloSchema, default as schema } from './schema/schema';
import { version } from './version';
import { markdown as markdownEncode } from './encoders';
import { markdown as markdownDecode } from './decoders';

let debounced: number | null = null;

export { schema };

export interface Props {
  id?: string;
  onSubmit?: (value) => void;
  onChange?: (value) => void;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  presenceProvider?: any;
  reverseMentionPicker?: boolean;
  analyticsHandler?: AnalyticsHandler;
  errorReporter?: ErrorReportingHandler;
  placeholder?: string;
  defaultValue?: string;
  showToolbar?: boolean;
}

export interface State {
  editorView?: EditorView;
  schema: TrelloSchema;
  isExpanded: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  version = `${version} (editor-core ${coreVersion})`;

  public static defaultProps: Props = {
    reverseMentionPicker: false,
    showToolbar: false
  };

  state: State;

  providerFactory: ProviderFactory;

  private editorContainer: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.state = { schema, isExpanded: this.props.defaultValue ? true : false };

    this.providerFactory = new ProviderFactory();

    const errorReporter = new ErrorReporter();
    if (props.errorReporter) {
      errorReporter.handler = props.errorReporter;
    }

    analyticsService.handler = props.analyticsHandler || ((name) => { });
  }


  /**
   * The current size of the document
   */
  get documentSize(): number {
    const { editorView } = this.state;
    return editorView ? editorView.state.doc.nodeSize : 0;
  }

  /**
   * The current value of the editor
   */
  get value() {
    const { editorView } = this.state;
    const doc = editorView && editorView.state.doc;

    if (!doc) {
      return '';
    }

    return markdownEncode.serialize(doc);
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
   * Focus the content region of the editor.
   */
  focus = (): void => {
    const { editorView } = this.state;

    if (editorView && !editorView.hasFocus()) {
      editorView.focus();
    }
  }

  appendText(text: string): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const tr = state.tr
        .insertText(text)
        .scrollIntoView();
      editorView.dispatch(tr);
    }
  }

  componentWillMount() {
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    const { editorView } = this.state;
    if (editorView) {
      editorView.destroy();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (
      props.emojiProvider !== nextProps.emojiProvider ||
      props.mentionProvider !== nextProps.mentionProvider
    ) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { emojiProvider, mentionProvider } = props;

    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
  }

  expand = () => {
    this.setState({
      isExpanded: true
    });
  }

  renderPlaceHolder() {
    return <ChromeCollapsed text={this.props.placeholder} onFocus={this.expand} />;
  }

  renderToolbar() {
    if (!this.props.showToolbar) {
      return null;
    }

    const { editorView } = this.state;
    const editorState = editorView && editorView.state;

    const blockTypeState = editorState && blockTypeStateKey.getState(editorState);
    const textFormattingState = editorState && textFormattingStateKey.getState(editorState);
    const listsState = editorState && listsStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);

    return (
      <div className="ak-editor-toolbar" ref={this.handleEditorContainerRef}>
        {blockTypeState ?
          <ToolbarBlockType
            pluginState={blockTypeState}
            editorView={editorView!}
            focusEditor={this.focus}
            softBlurEditor={this.softBlurEditor}
          /> : null
        }
        {textFormattingState ?
          <ToolbarTextFormatting
            pluginState={textFormattingState}
            editorView={editorView!}
          /> : null
        }
        {listsState ?
          <ToolbarLists
            pluginState={listsState}
            editorView={editorView!}
          /> : null
        }
        {hyperlinkState ?
          <ToolbarHyperlink
            pluginState={hyperlinkState}
            editorView={editorView!}
          /> : null
        }
      </div>
    );
  }

  renderContent() {
    const { props } = this;
    const { editorView, isExpanded } = this.state;
    const { emojiProvider, mentionProvider } = props;

    const editorState = editorView && editorView.state;
    const emojisState = editorState && emojiProvider && emojisStateKey.getState(editorState);
    const mentionsState = editorState && mentionProvider && mentionsStateKey.getState(editorState);

    if (!isExpanded) {
      return this.renderPlaceHolder();
    }

    return (
      <div>
        {this.renderToolbar()}
        <div ref={this.handleRef}>
          {!emojisState ? null :
            <EmojiTypeAhead
              pluginState={emojisState}
              emojiProvider={emojiProvider!}
              reversePosition={props.reverseMentionPicker}
            />
          }
          {!mentionsState ? null :
            <MentionPicker
              resourceProvider={mentionProvider!}
              presenceProvider={props.presenceProvider}
              pluginState={mentionsState}
              reversePosition={props.reverseMentionPicker}
            />
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ak-editor-trello" id={this.props.id}>
        {this.renderContent()}
      </div>
    );
  }

  private handleEditorContainerRef = ref => {
    this.editorContainer = ref;
  }


  /**
   * Blurs editor but keeps focus on editor container,
   * so components like inline-edit can check if focus is still inside them
   */
  softBlurEditor = () => {
    if (this.editorContainer) {
      this.editorContainer.focus();
    }
  }

  private handleRef = (place: Element | null) => {
    if (!place) {
      return this.setState({ editorView: undefined });
    }

    const editorState = EditorState.create({
      schema,
      doc: this.props.defaultValue ? (markdownDecode as any).parse(this.props.defaultValue) : '',
      plugins: [
        ...mentionsPlugins(schema),
        ...emojisPlugins(schema),
        ...codeBlockPlugins(schema),
        ...listsPlugins(schema),
        ...hyperlinkPlugins(schema),
        ...rulePlugins(schema),
        ...textFormattingPlugins(schema),
        ...reactNodeViewPlugins(schema),
        // block type plugin needs to be after hyperlink plugin until we implement keymap priority
        // because when we hit shift+enter, we would like to convert the hyperlink text before we insert a new line
        // if converting is possible
        ...blockTypePlugins(schema),
        history(),
        keymap(baseKeymap) // should be last
      ]
    });

    const editorView = new EditorView(place, {
      state: editorState,
      dispatchTransaction: (tr) => {
        const newState = editorView.state.apply(tr);
        editorView.updateState(newState);
        this.handleChange();
      },
      nodeViews: {
        emoji: nodeViewFactory(this.providerFactory, { emoji: ReactEmojiNode }),
        mention: nodeViewFactory(this.providerFactory, { mention: ReactMentionNode }),
      },
      handleDOMEvents: {
        paste(view: EditorView, event: ClipboardEvent) {
          analyticsService.trackEvent('atlassian.editor.paste');
          return false;
        }
      },
      transformPastedHTML: (html: string) => {
        return html.replace(/<br\s*[\/]?>/gi, '\n');
      },
    });

    emojisStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);
    mentionsStateKey.getState(editorView.state).subscribeToFactory(this.providerFactory);

    if (place instanceof HTMLElement) {
      const content = place.querySelector('[contenteditable]');
      if (content instanceof HTMLElement) {
        content.style.outline = 'none';
        content.style.whiteSpace = 'pre-wrap';
      }
    }

    this.setState({ editorView });
    editorView.focus();

    analyticsService.trackEvent('atlassian.editor.start');
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      if (debounced) {
        clearTimeout(debounced);
      }

      debounced = setTimeout(() => { onChange(this.value); }, 200);
    }
  }

}

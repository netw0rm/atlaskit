import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  BlockTypePlugin,
  Chrome,
  ClearFormattingPlugin,
  CodeBlockPlugin,
  ContextName,
  EditorState,
  EditorView,
  history,
  HyperlinkPlugin,
  keymap,
  ListsPlugin,
  mentionNodeView,
  MentionsPlugin,
  ProviderFactory,
  RulePlugin,
  TextFormattingPlugin,
  TextSelection,
  version as coreVersion
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';
import { encode, parse } from './html';
import { makeSchema, isSchemaWithMentions, isSchemaWithLinks, JIRASchema } from './schema';
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
  mentionProvider?: Promise<MentionProvider>;
  mentionEncoder?: (userId: string) => string;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isExpanded?: boolean;
  schema: JIRASchema;
}

export default class Editor extends PureComponent<Props, State> {
  providerFactory: ProviderFactory;
  state: State;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);

    this.state = {
      isExpanded: props.isExpandedByDefault,
      schema: makeSchema({
        allowLists: !!props.allowLists,
        allowMentions: !!props.mentionProvider,
        allowLinks: !!props.allowLinks,
        allowAdvancedTextFormatting: !!props.allowAdvancedTextFormatting,
        allowCodeBlock: !!props.allowCodeBlock,
        allowBlockQuote: !!props.allowBlockQuote
      }),
    };

    this.providerFactory = new ProviderFactory();
    this.providerFactory.setProvider('mentionProvider', props.mentionProvider);

    analyticsService.handler = props.analyticsHandler || ((name) => {});
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
    const { editorView, isExpanded } = this.state;
    const { mentionProvider } = this.props;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const editorState = editorView && editorView.state;

    const blockTypeState = editorState && BlockTypePlugin.getState(editorState);
    const clearFormattingState = editorState && ClearFormattingPlugin.getState(editorState);
    const codeBlockState = editorState && CodeBlockPlugin.getState(editorState);
    const hyperlinkState = editorState && HyperlinkPlugin.getState(editorState);
    const listsState = editorState && ListsPlugin.getState(editorState);
    const mentionsState = editorState && MentionsPlugin.getState(editorState);
    const textFormattingState = editorState && TextFormattingPlugin.getState(editorState);


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
        pluginStateClearFormatting={clearFormattingState}
        pluginStateMentions={mentionsState}
        pluginStateHyperlink={hyperlinkState}
        packageVersion={version}
        packageName={name}
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
          ...( isSchemaWithLinks(schema) ? [ HyperlinkPlugin ] : [] ),
          ...( isSchemaWithMentions(schema) ? [ MentionsPlugin ] : [] ),
          BlockTypePlugin,
          ClearFormattingPlugin,
          CodeBlockPlugin,
          ListsPlugin,
          RulePlugin,
          TextFormattingPlugin,
          history(),
          keymap(jiraKeymap),
          keymap(baseKeymap), // should be last :(
        ]
      });

      if (context) {
        const blockTypeState = BlockTypePlugin.getState(editorState);
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
          mention: mentionNodeView(this.providerFactory)
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
        MentionsPlugin.getState(editorView.state).subscribeToFactory(this.providerFactory);
      }

      this.setState({ editorView });
      this.focus();
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

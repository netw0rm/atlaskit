import {
  AnalyticsHandler,
  analyticsService,
  BlockTypePlugin,
  Chrome,
  CodeBlockPlugin,
  ContextName,
  RulePlugin,
  HyperlinkPlugin,
  ImageUploadPlugin,
  MentionsPlugin,
  ListsPlugin,
  EditorView,
  EditorState,
  Node,
  TextSelection,
  TextFormattingPlugin,
  ClearFormattingPlugin,
  ProviderFactory,
  mentionNodeView,
  history,
  keymap,
  baseKeymap,
  version as coreVersion
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/mention';
import * as React from 'react';
import { PureComponent } from 'react';

import { MentionResource, MentionSource } from './mention-resource';
import markdownSerializer from './markdown-serializer';
import { parseHtml, transformHtml } from './parse-html';
import { version, name } from './version';
import schema from './schema';

export { version };

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;

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
  imageUploadHandler?: ImageUploadHandler;
  mentionSource?: MentionSource;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  mentionProvider: Promise<MentionProvider>;
  providerFactory: ProviderFactory;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
    this.providerFactory = new ProviderFactory();

    analyticsService.handler = props.analyticsHandler || ((name) => { });

    if (props.mentionSource) {
      const mentionsResourceProvider = new MentionResource({
        minWait: 10,
        maxWait: 25,
      }, props.mentionSource);

      this.mentionProvider = Promise.resolve(mentionsResourceProvider);
      this.providerFactory.setProvider('mentionProvider', this.mentionProvider);
    }
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

    this.setState({ isExpanded: true });

    if (onExpanded) {
      onExpanded(this);
    }
  }

  /**
   * Collapse the editor chrome
   */
  collapse = () => {
    this.setState({ isExpanded: false });
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
   * Set value from HTML string
   */
  setFromHtml(html: string): void {
    const { editorView } = this.state;

    if (!editorView || !editorView.state.doc) {
      throw new Error('Unable to set from HTML before the editor is initialized');
    }

    const { tr, doc } = editorView.state;
    const newDoc = parseHtml(html.trim());

    editorView.dispatch(tr.replace(0, doc.nodeSize - 2, newDoc.slice(0, newDoc.nodeSize - 2)));
  }

  /**
   * Return the current python-markdown value from the editor.
   */
  get value(): string | undefined {
    const { editorView } = this.state;
    return editorView
      ? markdownSerializer.serialize(editorView.state.doc)
      : this.props.defaultValue;
  }

  /**
   * Return the current ProseMirror doc value from the editor;
   */
  get doc(): Node | undefined {
    const { editorView } = this.state;
    return editorView
      ? editorView.state.doc
      : undefined;
  }

  render() {
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorView } = this.state;
    const editorState = editorView && editorView.state;
    const listsState = editorState && ListsPlugin.getState(editorState);
    const blockTypeState = editorState && BlockTypePlugin.getState(editorState);
    const clearFormattingState = editorState && ClearFormattingPlugin.getState(editorState);
    const codeBlockState = editorState && CodeBlockPlugin.getState(editorState);
    const textFormattingState = editorState && TextFormattingPlugin.getState(editorState);
    const hyperlinkState = editorState && HyperlinkPlugin.getState(editorState);
    const imageUploadState = editorState && ImageUploadPlugin.getState(editorState);
    const mentionsState = editorState && MentionsPlugin.getState(editorState);

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
        pluginStateBlockType={blockTypeState}
        pluginStateCodeBlock={codeBlockState}
        pluginStateHyperlink={hyperlinkState}
        pluginStateLists={listsState}
        pluginStateMentions={mentionsState}
        pluginStateTextFormatting={textFormattingState}
        pluginStateClearFormatting={clearFormattingState}
        pluginStateImageUpload={imageUploadState}
        mentionProvider={this.mentionProvider}
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
    if (place) {
      const { context, imageUploadHandler } = this.props;
      const bitbucketKeymap = {
        'Mod-Enter': this.handleSave,
        'Esc'() { } // Disable Esc handler
      };
      const editorState = EditorState.create(
        {
          schema,
          doc: parseHtml(this.props.defaultValue || ''),
          plugins: [
            ListsPlugin,
            BlockTypePlugin,
            ClearFormattingPlugin,
            CodeBlockPlugin,
            TextFormattingPlugin,
            HyperlinkPlugin,
            RulePlugin,
            ...(imageUploadHandler ? [ImageUploadPlugin] : []),
            ...(this.mentionProvider ? [MentionsPlugin] : []),
            history(),
            keymap(bitbucketKeymap),
            keymap(baseKeymap) // should be last :(
          ]
        }
      );

      if (context) {
        const blockTypeState = BlockTypePlugin.getState(editorState);
        blockTypeState.changeContext(context);
      }

      if (imageUploadHandler) {
        const imageUploadState = ImageUploadPlugin.getState(editorState);
        imageUploadState.setUploadHandler(imageUploadHandler);
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
        },
        transformPastedHTML(html: string) {
          return transformHtml(html).innerHTML;
        }
      });

      if (this.mentionProvider) {
        MentionsPlugin.getState(editorState).subscribeToFactory(this.providerFactory);
      }

      this.setState({ editorView });

      analyticsService.trackEvent('atlassian.editor.start');
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

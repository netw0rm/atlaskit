import {
  baseKeymap,
  blockTypePlugins,
  EditorState,
  EditorView,
  emojiNodeView,
  EmojiTypeAhead,
  LanguagePicker,
  emojisPlugins,
  emojisStateKey,
  history,
  HyperlinkEdit,
  hyperlinkPlugins,
  hyperlinkStateKey,
  codeBlockPlugins,
  codeBlockStateKey,
  keymap,
  mentionNodeView,
  MentionPicker,
  mentionsPlugins,
  mentionsStateKey,
  Node,
  ProviderFactory,
  textFormattingPlugins,
  TextSelection,
  toJSON,
  version as coreVersion
} from '@atlaskit/editor-core';
import { EmojiProvider } from '@atlaskit/emoji';
import { MentionProvider } from '@atlaskit/mention';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { HCSchema, default as schema } from './schema';
import { version } from './version';
import { hipchatEncoder } from './encoders';
import { hipchatDecoder } from './decoders';

let debounced: number | null = null;

export type Doc = {
  type: 'doc',
  version: 1,
  content?: any[]
};

export interface Props {
  id?: string;
  maxContentSize?: number;
  onSubmit?: (value: Doc | any[]) => void;
  onChange?: () => void;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  presenceProvider?: any;
  reverseMentionPicker?: boolean;
  useLegacyFormat?: boolean;
}

export interface State {
  editorView?: EditorView;
  schema: HCSchema;
  maxLengthReached?: boolean;
  flashToggle?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
}

export default class Editor extends PureComponent<Props, State> {
  version = `${version} (editor-core ${coreVersion})`;

  public static defaultProps: Props = {
    reverseMentionPicker: true
  };

  state: State;

  providerFactory: ProviderFactory;

  constructor(props: Props) {
    super(props);
    this.state = { schema };
    this.providerFactory = new ProviderFactory();
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
    const doc = editorView && toJSON(editorView.state.doc);
    if (!doc) {
      return { type: 'doc', version: 1, content: [] };
    }

    return this.props.useLegacyFormat ? hipchatEncoder(doc) : doc;
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
  focus(): void {
    const { editorView } = this.state;

    if (editorView) {
      editorView.focus();
    }
  }

  /**
   * Set document from JSON
   */
  setFromJson(value: any): void {
    const { editorView } = this.state;
    if (editorView) {
      const { state } = editorView;
      const { useLegacyFormat } = this.props;

      let content: Node[];

      if (useLegacyFormat) {
        content = [schema.nodeFromJSON(hipchatDecoder(value).content[0])];
      } else {
        content = [];
        (value.content || []).forEach(child => {
          content.push(schema.nodeFromJSON(child));
        });
      }

      if (content && content.length > 0) {
        const tr = state.tr
          .replaceWith(0, state.doc.nodeSize - 2, content)
          .scrollIntoView();
        editorView.dispatch(tr);
      }

      if (useLegacyFormat && !value.length) {
        this.clear();
      }
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

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this;
    if (props.emojiProvider !== nextProps.emojiProvider || props.mentionProvider !== nextProps.mentionProvider) {
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

  render() {
    const { props } = this;
    const { editorView, emojiProvider, mentionProvider } = this.state;

    const editorState = editorView && editorView.state;
    const emojisState = editorState && emojiProvider && emojisStateKey.getState(editorState);
    const mentionsState = editorState && mentionProvider && mentionsStateKey.getState(editorState);
    const codeBlockState = editorState && codeBlockStateKey.getState(editorState);
    const hyperlinkState = editorState && hyperlinkStateKey.getState(editorState);
    const classNames = cx('ak-editor-hipchat', {
      'max-length-reached': this.state.maxLengthReached,
      'flash-toggle': this.state.flashToggle
    });

    return (
      <div className={classNames} id={this.props.id}>
        <div ref={this.handleRef}>
          {!hyperlinkState ? null :
            <HyperlinkEdit pluginState={hyperlinkState} editorView={editorView!} />
          }
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
          {!codeBlockState ? null :
            <LanguagePicker
              pluginState={codeBlockState}
              editorView={editorView!}
            />
          }
        </div>
      </div>
    );
  }

  private handleRef = (place: Element | null) => {
    if (!place) {
      return this.setState({ editorView: undefined });
    }

    const hcKeymap = {
      'Enter': this.handleSubmit
    };

    const editorState = EditorState.create({
      schema,
      doc: '',
      plugins: [
        ...mentionsPlugins(schema),
        ...emojisPlugins(schema),
        ...blockTypePlugins(schema),
        ...hyperlinkPlugins(schema),
        ...textFormattingPlugins(schema),
        ...codeBlockPlugins(schema),
        history(),
        keymap(hcKeymap),
        keymap(baseKeymap) // should be last
      ]
    });

    const { maxContentSize }  = this.props;

    const editorView = new EditorView(place, {
      state: editorState,
      dispatchTransaction: (tr) => {
        if (maxContentSize) {
          if (tr.doc.nodeSize > maxContentSize) {
            this.setState({
              maxLengthReached: true,
              flashToggle: this.state.maxLengthReached && !this.state.flashToggle
            });
            return;
          } else if (this.state.maxLengthReached) {
            this.setState({
              maxLengthReached: false,
              flashToggle: false
            });
          }
        }

        const newState = editorView.state.apply(tr);
        editorView.updateState(newState);
        this.handleChange();
      },
      nodeViews: {
        emoji: emojiNodeView(this.providerFactory),
        mention: mentionNodeView(this.providerFactory)
      }
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
    this.focus();
  }

  private handleSubmit = () => {
    const { onSubmit } = this.props;
    const { editorView } = this.state;
    if (onSubmit && editorView) {
      onSubmit(this.value);
    }

    return true;
  }

  private handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      if (debounced) {
        clearTimeout(debounced);
      }

      debounced = setTimeout(() => { onChange(); }, 200);
    }
  }

}

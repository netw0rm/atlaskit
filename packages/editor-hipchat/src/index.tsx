import {
  baseKeymap,
  BlockTypePlugin,
  EditorState,
  EditorView,
  history,
  HyperlinkEdit,
  HyperlinkPlugin,
  keymap,
  mentionNodeView,
  MentionPicker,
  MentionsPlugin,
  ProviderFactory,
  TextFormattingPlugin,
  TextSelection,
  version as coreVersion
} from '@atlaskit/editor-core';
import { MentionProvider } from '@atlaskit/mention';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { HCSchema, default as schema } from './schema';
import { version } from './version';
import { hipchatEncoder } from './encoders';

let debounced: number | null = null;

export type Doc = {
  type: 'doc',
  content?: any[]
};

export interface Props {
  id?: string;
  maxContentSize?: number;
  onSubmit?: (doc: Doc) => void;
  onChange?: () => void;
  mentionProvider?: Promise<MentionProvider>;
  presenceProvider?: any;
  reverseMentionPicker?: boolean;
}

export interface State {
  editorView?: EditorView;
  schema: HCSchema;
  maxLengthReached?: boolean;
  flashToggle?: boolean;
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
   * The current value of the editor, encoded as HipChat-format.
   */
  get value(): string {
    return this.encodeDocument();
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
      const val = {
        type: 'paragraph',
        content: (value.length ? value : [{ type: 'text', text: ' ' }]) // We need to insert a space instead of an empty node in order to trigger the update event (which will close the mentions picker)
      };

      const { state } = editorView;
      const content = schema.nodeFromJSON(val);
      const tr = state.tr
        .replaceWith(0, state.doc.nodeSize - 2, content)
        .scrollIntoView();
      editorView.dispatch(tr);

      if (!value.length) {
        this.clear(); // Part of hack above
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
    if (props.mentionProvider !== nextProps.mentionProvider) {
      this.handleProviders(nextProps);
    }
  }

  handleProviders = (props: Props) => {
    const { mentionProvider } = props;
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.setState({
      mentionProvider
    });
  }

  render() {
    const { props } = this;
    const { editorView, mentionProvider } = this.state;

    const editorState = editorView && editorView.state;

    const mentionsState = editorState && mentionProvider && MentionsPlugin.getState(editorState);
    const hyperlinkState = editorState && HyperlinkPlugin.getState(editorState);
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
        BlockTypePlugin,
        HyperlinkPlugin,
        TextFormattingPlugin,
        MentionsPlugin,
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
        mention: mentionNodeView(this.providerFactory)
      }
    });

    MentionsPlugin.getState(editorView.state).subscribeToFactory(this.providerFactory);

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
      onSubmit(this.encodeDocument());
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

  private encodeDocument() {
    const { editorView } = this.state;
    return editorView ? hipchatEncoder(editorView.state.doc.toJSON()) : '';
  }

}

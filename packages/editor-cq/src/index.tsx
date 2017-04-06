import {
  AnalyticsHandler,
  analyticsService,
  baseKeymap,
  BlockTypePlugin,
  Chrome,
  CodeBlockPlugin,
  ContextName,
  EditorState,
  EditorView,
  history,
  HyperlinkPlugin,
  keymap,
  ListsPlugin,
  RulePlugin,
  TextFormattingPlugin,
  TextSelection,
  ClearFormattingPlugin,
  version as coreVersion
} from '@atlaskit/editor-core';
import * as React from 'react';
import { PureComponent } from 'react';
import { encode, parse } from './cxhtml';
import { version, name } from './version';
import { CQSchema, default as schema } from './schema';

export { version };


export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
}

export interface State {
  editorView?: EditorView;
  isExpanded?: boolean;
  schema: CQSchema;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  version = `${version} (editor-core ${coreVersion})`;

  constructor(props: Props) {
    super(props);

    this.state = {
      schema,
      isExpanded: props.isExpandedByDefault,
    };

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
  get value(): string | undefined {
    const { editorView } = this.state;

    return editorView && editorView.state.doc
      ? encode(editorView.state.doc)
      : this.props.defaultValue;
  }

  render() {
    const { editorView, isExpanded } = this.state;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const editorState = editorView && editorView.state;

    const blockTypeState = editorState && BlockTypePlugin.getState(editorState);
    const codeBlockState = editorState && CodeBlockPlugin.getState(editorState);
    const clearFormattingState = editorState && ClearFormattingPlugin.getState(editorState);
    const hyperlinkState = editorState && HyperlinkPlugin.getState(editorState);
    const listsState = editorState && ListsPlugin.getState(editorState);
    const textFormattingState = editorState && TextFormattingPlugin.getState(editorState);

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
      const cqKeymap = {
        'Mod-Enter': this.handleSave,
      };

      const editorState = EditorState.create({
        schema,
        doc: parse(this.props.defaultValue || ''),
        plugins: [
          BlockTypePlugin,
          ClearFormattingPlugin,
          CodeBlockPlugin,
          HyperlinkPlugin,
          ListsPlugin,
          RulePlugin,
          TextFormattingPlugin,
          history(),
          keymap(cqKeymap),
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
        handleDOMEvents: {
          paste(view: EditorView, event: ClipboardEvent) {
            analyticsService.trackEvent('atlassian.editor.paste');
            return false;
          }
        }
      });

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ editorView });
      this.focus();
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

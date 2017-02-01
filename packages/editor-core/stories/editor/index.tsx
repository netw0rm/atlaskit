import * as React from 'react';
import { PureComponent } from 'react';
import {
  Chrome,
  ContextName,
  ListsPlugin
} from '../../';
import { buildKeymap } from '../../src/plugins/keymaps';
import buildMarkdownInputRules from '../../src/plugins/markdown-inputrules/input-future';
import {
  baseKeymap,
  EditorState,
  EditorView,
  inputRules,
  keymap,
  Node,
  TextSelection
} from '../../src/prosemirror/future';
import schema from './schema';

export interface Props {
  context?: ContextName;
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploader?: Function;
}

export interface State {
  editorView?: EditorView;
  editorState?: EditorState<any>;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };
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
    return editorView && editorView.state.doc
      ? !!editorView.state.doc.textContent
      : false;
  }

  get value(): string | undefined {
    return this.props.defaultValue;
  }

  get doc(): Node | undefined {
    const { editorView } = this.state;
    return editorView
      ? editorView.state.doc
      : undefined;
  }

  render() {
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { isExpanded, editorState, editorView } = this.state;

    const listsState = editorState && ListsPlugin.plugin.getState(editorState);

    if (listsState) {
      listsState.setView(editorView);
    }

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl="https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}

        pluginStateLists={listsState}
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
      const editorState = EditorState.create(
        createEdiorConfig(schema, [
          ListsPlugin,
          inputRules({ rules: buildMarkdownInputRules(schema) }),
          keymap(buildKeymap(schema)),
          keymap(baseKeymap) // should be last :(
        ])
      );
      const editorView = new EditorView(place, {
        state: editorState,
        dispatchTransaction: (tr) => {
          const newState = editorView.state.apply(tr);
          editorView.updateState(newState);
          this.handleChange();
        }
      });

      editorView.focus();

      this.setState({ editorView, editorState });
    } else {
      this.setState({ editorView: undefined });
    }
  }
}

const createEdiorConfig = (schema, plugins: any[] = []) => {
  return {
    schema,
    plugins: plugins.reduce((acc: any, plugin: { plugin?: any, keymap?: any }) => {
      if (!plugin.plugin) {
        return acc.concat(plugin);
      }

      acc = acc.concat(plugin.plugin);

      if (plugin.keymap) {
        acc = acc.concat(keymap(plugin.keymap));
      }

      return acc;
    }, [])
  };
};

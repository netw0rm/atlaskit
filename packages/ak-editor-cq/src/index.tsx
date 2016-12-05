import React, { PureComponent } from 'react';
import { ProseMirror } from 'ak-editor-prosemirror';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
import ListsPlugin from 'ak-editor-plugin-lists';
import TextFormattingPlugin from 'ak-editor-plugin-text-formatting';
import { Chrome } from 'ak-editor-ui';
import schema from './schema';
import { parse, encode } from './cxhtml';
import { buildKeymap } from './keymap';

interface Props {
  context?: 'default' | 'comment';
  defaultExpanded?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
}

interface State {
  pm?: ProseMirror;
}

export default class Editor extends PureComponent<Props, State> {
  state: State = {};

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    const { pm } = this.state;
    if (pm) {
      pm.focus();
    }
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    const { pm } = this.state;
    if (pm) {
      pm.tr.delete(0, pm.doc.content.size).apply();
    }
  }

  /**
   * Check if the user has entered any significant content.
   * (i.e. text)
   */
  isEmpty(): boolean {
    const { pm } = this.state;
    return pm && pm.doc
      ? !!pm.doc.textContent
      : false;
  }

  /**
   * The current value of the editor, encoded as CXTML.
   */
  get value(): string | undefined {
    const { pm } = this.state;
    return pm
      ? encode(pm.doc)
      : this.props.defaultValue;
  }

  render() {
    const { pm } = this.state;
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        defaultExpanded={this.props.defaultExpanded}
        feedbackFormUrl='https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/'
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        pluginStateBlockType={pm && BlockTypePlugin.get(pm)}
        pluginStateLists={pm && ListsPlugin.get(pm)}
        pluginStateTextFormatting={pm && TextFormattingPlugin.get(pm)}
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
      const { context, onChange } = this.props;
      const pm = new ProseMirror({
        place,
        doc: parse(this.props.defaultValue || ''),
        plugins: [
          BlockTypePlugin,
          ListsPlugin,
          TextFormattingPlugin,
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm)!.changeContext(context);
      }

      pm.addKeymap(buildKeymap(pm.schema));
      pm.on.change.add(this.handleChange);
      pm.focus();

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }
}

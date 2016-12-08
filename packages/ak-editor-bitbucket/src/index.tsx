import React, { PureComponent } from 'react';
import { ProseMirror, Schema, Node } from 'ak-editor-prosemirror';
import ListsPlugin from 'ak-editor-plugin-lists';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
import MarkdownInputRulesPlugin from 'ak-editor-plugin-markdown-inputrules';
import HyperlinkPlugin from 'ak-editor-plugin-hyperlink';
import { default as ImageUploadPlugin, ImageUploadHandler } from 'ak-editor-plugin-image-upload';
import TextFormattingPlugin from 'ak-editor-plugin-text-formatting';
import MentionsPlugin from 'ak-editor-plugin-mentions';
import { Chrome } from 'ak-editor-ui';
import schema from './schema';
import { buildKeymap } from './keymap';
import markdownSerializer from './markdown-serializer';
import { blockTypes, blockTypeType, blockTypesType } from './block-types';
import parseHtml from './parse-html';

interface Props {
  context?: 'comment' | 'pr',
  defaultExpanded?: boolean,
  defaultValue?: string,
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploadHandler?: ImageUploadHandler;
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
      pm.tr.delete(0, pm.doc.nodeSize - 2).apply();
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
   * Return the current python-markdown value from the editor.
   */
  get value(): string | undefined {
    const { pm } = this.state;
    return pm
      ? markdownSerializer.serialize(pm.doc)
      : this.props.defaultValue;
  }

  /**
   * Return the current ProseMirror doc value from the editor;
   */
  get doc(): Node | undefined {
    const { pm } = this.state;
    return pm
      ? pm.doc
      : undefined;
  }

  render() {
    const handleCancel = this.props.onCancel ? this.handleCancel : undefined;
    const handleSave = this.props.onSave ? this.handleSave : undefined;
    const { pm } = this.state;

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        defaultExpanded={this.props.defaultExpanded}
        feedbackFormUrl='https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/'
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        pluginStateBlockType={pm && BlockTypePlugin.get(pm)}
        pluginStateHyperlink={pm && HyperlinkPlugin.get(pm)}
        pluginStateLists={pm && ListsPlugin.get(pm)}
        pluginStateTextFormatting={pm && TextFormattingPlugin.get(pm)}
        pluginStateImageUpload={pm && ImageUploadPlugin.get(pm)}
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
        doc: parseHtml(this.props.defaultValue || ''),
        plugins: [
          MarkdownInputRulesPlugin,
          HyperlinkPlugin,
          BlockTypePlugin,
          ListsPlugin,
          TextFormattingPlugin,
          MentionsPlugin,
          ...( this.props.imageUploadHandler ? [ ImageUploadPlugin ] : [] )
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm)!.changeContext(context);
      }

      if (this.props.imageUploadHandler) {
        ImageUploadPlugin.get(pm)!.uploadHandler = this.props.imageUploadHandler; 
        
        // const insertImage = (attr: ImageUploadOptions) => imageUploadState.addImage(attr);
        // const handler = (_: any, e: any) => this.props.imageUploader(e, insertImage);
        // imageUploadState.dropAdapter.add(handler);
        // imageUploadState.pasteAdapter.add(handler);
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

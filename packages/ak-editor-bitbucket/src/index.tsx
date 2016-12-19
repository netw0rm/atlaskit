import * as React from 'react';
import { PureComponent } from 'react';
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
import markdownSerializer from './markdown-serializer';
import { blockTypes, blockTypeType, blockTypesType } from './block-types';
import parseHtml from './parse-html';

export interface Props {
  context?: 'comment' | 'pr',
  isExpandedByDefault?: boolean,
  defaultValue?: string,
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  imageUploadHandler?: ImageUploadHandler;
}

export interface State {
  pm?: ProseMirror;
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
    const { pm } = this.state;
    if (pm) {
      pm.focus();
    }
  }

  /**
   * Expand the editor chrome
   */
  expand = () => {
    this.setState({ isExpanded: true });
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
   * Set value from HTML string
   */
  setFromHtml(html: string): void {
    const { pm } = this.state;

    if (!pm || !pm.doc) {
      throw new Error('Unable to set from HTML before the editor is initialized');
    }

    pm.setDoc(parseHtml(html.trim()), null);
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
    const { pm, isExpanded } = this.state;

    return (
      <Chrome
        children={<div ref={this.handleRef} />}
        isExpanded={isExpanded}
        feedbackFormUrl='https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/'
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
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
      }

      pm.on.change.add(this.handleChange);
      pm.focus();

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }
}

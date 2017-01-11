import * as React from 'react';
import { PureComponent } from 'react';
import {
  ProseMirror,
  Schema,
  Node,
  Keymap,
  ListsPlugin,
  BlockTypePlugin,
  CodeBlockPlugin,
  DefaultInputRulesPlugin,
  MarkdownInputRulesPlugin,
  HyperlinkPlugin,
  TextFormattingPlugin,
  HorizontalRulePlugin,
  MentionsPlugin,
  ImageUploadPlugin,
  Chrome,
  AnalyticsHandler,
  analyticsService
} from 'ak-editor-core';

import schema from './schema';
import markdownSerializer from './markdown-serializer';
import { parseHtml, transformHtml } from './parse-html';
import { MentionResource, MentionSource } from './mention-resource';

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;

export interface Props {
  context?: 'comment' | 'pr';
  isExpandedByDefault?: boolean;
  defaultValue?: string;
  onCancel?: (editor?: Editor) => void;
  onChange?: (editor?: Editor) => void;
  onSave?: (editor?: Editor) => void;
  placeholder?: string;
  analyticsHandler?: AnalyticsHandler;
  imageUploadHandler?: ImageUploadHandler;
  mentionSource?: MentionSource;
}

export interface State {
  pm?: ProseMirror;
  isExpanded?: boolean;
}

export default class Editor extends PureComponent<Props, State> {
  state: State;
  mentionsResourceProvider: MentionResource;

  constructor(props: Props) {
    super(props);
    this.state = { isExpanded: props.isExpandedByDefault };

    analyticsService.handler = props.analyticsHandler || ((name) => {});

    if (props.mentionSource) {
      this.mentionsResourceProvider = new MentionResource({
        minWait: 10,
        maxWait: 25,
      }, props.mentionSource);
    }
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
        feedbackFormUrl="https://atlassian.wufoo.com/embed/zy8kvpl0qfr9ov/"
        onCancel={handleCancel}
        onSave={handleSave}
        placeholder={this.props.placeholder}
        onCollapsedChromeFocus={this.expand}
        pluginStateBlockType={pm && BlockTypePlugin.get(pm)}
        pluginStateHyperlink={pm && HyperlinkPlugin.get(pm)}
        pluginStateLists={pm && ListsPlugin.get(pm)}
        pluginStateTextFormatting={pm && TextFormattingPlugin.get(pm)}
        pluginStateImageUpload={pm && ImageUploadPlugin.get(pm)}
        pluginStateMentions={pm && this.mentionsResourceProvider && MentionsPlugin.get(pm)}
        mentionsResourceProvider={this.mentionsResourceProvider}
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
          CodeBlockPlugin,
          ListsPlugin,
          TextFormattingPlugin,
          HorizontalRulePlugin,
          ...( this.mentionsResourceProvider ? [ MentionsPlugin ] : [] ),
          DefaultInputRulesPlugin,
          ...( this.props.imageUploadHandler ? [ ImageUploadPlugin ] : [] )
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm)!.changeContext(context);
      }

      if (this.props.imageUploadHandler) {
        ImageUploadPlugin.get(pm)!.uploadHandler = this.props.imageUploadHandler;
      }

      pm.addKeymap(new Keymap({
        'Mod-Enter': this.handleSave,
        'Esc'() {} // Disable Esc handler
      }));

      pm.on.transformPastedHTML.add((html: string) => {
        return transformHtml(html).innerHTML;
      });

      pm.on.domPaste.add(() => {
        analyticsService.trackEvent('atlassian.editor.paste');
      });

      pm.on.change.add(this.handleChange);
      pm.focus();

      analyticsService.trackEvent('atlassian.editor.start');

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }
}

import React, { PureComponent } from 'react';
import { ProseMirror, Schema } from 'ak-editor-prosemirror';
import { ListsPlugin } from 'ak-editor-plugin-lists';
import { BlockTypePlugin } from 'ak-editor-plugin-block-type';
import MarkdownInputRulesPlugin from 'ak-editor-plugin-markdown-inputrules';
import { HyperlinkPlugin } from 'ak-editor-plugin-hyperlink';
import { ImageUploadPlugin } from 'ak-editor-plugin-image-upload';
import { TextFormattingPlugin } from 'ak-editor-plugin-text-formatting';
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
  imageUploader?: Function;
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
   * Return the current python-markdown value from the editor.
   */
  get value(): string | undefined {
    const { pm } = this.state;
    return pm
      ? markdownSerializer.serialize(pm.doc)
      : this.props.defaultValue;
  }

  // _hyperlinkHref: string;
  // _hyperlinkElement: HTMLElement | undefined;
  // _hyperlinkActive: boolean;
  // _canLinkHyperlink: boolean;

  // // internal
  // _blockTypes: blockTypeType[];
  // _justToggledExpansion: boolean;
  // _pm?: ProseMirror;
  // _ready: boolean;
  // _wrapper: HTMLElement;

  render() {
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
        pm={this.state.pm}
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
          ImageUploadPlugin,
          BlockTypePlugin,
          ListsPlugin,
          TextFormattingPlugin,
          MentionsPlugin,
        ],
      });

      if (context) {
        BlockTypePlugin.get(pm).changeContext(context);
      }

      pm.addKeymap(buildKeymap(pm.schema));
      pm.on.change.add(this.handleChange);
      pm.focus();

      this.setState({ pm });
    } else {
      this.setState({ pm: undefined });
    }
  }

  // private initEditor = () => {

  // static render(elem: AkEditorBitbucket) {
  //   let fakeInputClassNames = shadowStyles.locals['fakeInput'];

  //   if (elem.context === 'comment') {
  //     fakeInputClassNames += ` ${shadowStyles.locals['comment']}`;
  //   }

  //   if (elem.context && blockTypes[elem.context]) {
  //     elem._blockTypes = blockTypes[elem.context];
  //   } else {
  //     elem._blockTypes = blockTypes._defaultContext;
  //   }

  //   const fullEditor: any = (<div>
  //     <Toolbar className={shadowStyles.locals['toolbar']}>
  //       <ToolbarBlockType
  //         disabled={!elem._canChangeBlockType}
  //         selectedBlockType={elem._selectedBlockType}
  //         blockTypes={elem._blockTypes}
  //         onSelectBlockType={elem._selectBlockType}
  //       />
  //       <ToolbarTextFormatting
  //         boldActive={elem._strongActive}
  //         italicActive={elem._emActive}
  //         underlineActive={elem._underlineActive}
  //         codeActive={elem._codeActive}
  //         boldDisabled={!elem._canChangeTextFormatting}
  //         italicDisabled={!elem._canChangeTextFormatting}
  //         underlineDisabled={!elem._canChangeTextFormatting}
  //         codeDisabled={!elem._canChangeTextFormatting}
  //         underlineHidden
  //         onToggletextformatting={elem._toggleMark}
  //       />
  //       <ToolbarHyperlink
  //         active={elem._hyperlinkActive}
  //         disabled={!elem._canLinkHyperlink}
  //         onAddHyperlink={elem._addHyperlink}
  //       />
  //       <ToolbarLists
  //         bulletlistDisabled={elem._bulletlistDisabled}
  //         numberlistDisabled={elem._numberlistDisabled}
  //         bulletlistActive={elem._bulletListActive}
  //         numberlistActive={elem._numberListActive}
  //         on-toggle-number-list={() => elem._toggleList('ordered_list')}
  //         on-toggle-bullet-list={() => elem._toggleList('bullet_list')}
  //       />
  //     </Toolbar>
  //     <Content
  //       className={shadowStyles.locals['content']}
  //       onclick={elem._onContentClick}
  //       ref={(wrapper: HTMLElement) => { elem._wrapper = wrapper; }}
  //       openTop
  //       openBottom
  //       skip
  //     />
  //     {elem._hyperlinkActive ?
  //       <HyperlinkEdit
  //         href={elem._hyperlinkHref}
  //         textInputValue={elem._hyperlinkHref}
  //         attachTo={elem._hyperlinkElement}
  //         onUnlink={elem._unlink}
  //         onEnterKeyup={elem._handleEnterKeyup}
  //         onEscKeyup={elem._handleEscKeyup}
  //       />
  //       : null
  //     }
  //     <Footer
  //       openTop
  //       hide-buttons={elem.context === 'pr'}
  //       onInsertimage={elem._insertImage}
  //     />
  //   </div>);

  //   return (
  //     <div
  //       className={
  //         cx(shadowStyles.locals['root'], {
  //           [shadowStyles.locals['focused']]: elem._focused,
  //         })
  //       }
  //     >
  //       <style>{shadowStyles.toString()}</style>
  //       {elem.expanded ?
  //         fullEditor
  //         :
  //         <input
  //           placeholder={elem.placeholder}
  //           onfocus={elem._expand}
  //           className={fakeInputClassNames}
  //         />
  //       }
  //     </div>
  //   );
  // }

  /**
   * Set the value from HTML string
   */
  // setFromHtml(html: string): void {
  //   const { pm } = this.state;
  //   if (!pm || !pm.doc) {
  //     throw new Error('Unable to set from HTML before the editor is initialized');
  //   }

  //   pm.setDoc(parseHtml(html.trim()));
  // }

  // _addHyperlink(event: CustomEvent): void {
  //   const href = event.detail.value;

  //   if (this._pm) {
  //     const pm = this._pm;
  //     HyperlinkPlugin.get(pm).addLink({ href });
  //     pm.setTextSelection(pm.selection.$to.pos);
  //     pm.focus();
  //   }
  // }

  // _insertImage(): void {
  //   this.imageUploader(false, (attr: ImageUploadOptions) => {
  //     if (this._pm) {
  //       ImageUploadPlugin.get(this._pm).addImage(attr);
  //     }
  //   });
  // }

  // _unlink(): void {
  //   if (this._pm) {
  //     HyperlinkPlugin.get(this._pm).removeLink();
  //   }
  // }

  // _handleEnterKeyup(event: CustomEvent) {
  //   this._updateHyperlinkValue(event);
  //   this._closeHyperlinkPanel();
  // }

  // _handleEscKeyup() {
  //   this._closeHyperlinkPanel();
  // }

  // _updateHyperlinkValue(event: CustomEvent) {
  //   const newLink = event.detail.value;

  //   if (this._pm) {
  //     HyperlinkPlugin.get(this._pm).updateLink({
  //       href: newLink,
  //     });
  //   }
  // }

  // _closeHyperlinkPanel() {
  //   if (this._pm) {
  //     const pm = this._pm;
  //     this._hyperlinkActive = false;
  //     pm.setTextSelection(pm.selection.$to.pos);
  //   }
  // }

  // _initEditor() {
  //   // Hyperlink plugin wiring
  //   HyperlinkPlugin.get(pm).subscribe(state => {
  //     this._canLinkHyperlink = state.enabled as boolean;
  //     this._hyperlinkActive = state.active as boolean;
  //     this._hyperlinkElement = state.element as HTMLElement;
  //     this._hyperlinkHref = state.href as string;
  //   });

  //   // Image upload plugin wiring
  //   const insertImage = (attr: ImageUploadOptions) => ImageUploadPlugin.get(pm).addImage(attr);
  //   const handler = (_: any, e: any) => this.imageUploader(e, insertImage);
  //   ImageUploadPlugin.get(pm).dropAdapter.add(handler);
  //   ImageUploadPlugin.get(pm).pasteAdapter.add(handler);

  //   // Mentions wiring
  //   const emitMentionEvent = (ev: string) => {
  //     return (el: HTMLElement, pm: ProseMirror) => emit(this, ev, {
  //       detail: { el, pm }
  //     });
  //   }
  //   MentionsPlugin.get(pm).renderHandler = emitMentionEvent('mentionrender');
  //   MentionsPlugin.get(pm).autocompleteHandler = emitMentionEvent('mentionautocomplete');

  //   // add the keymap
  //   pm.addKeymap(buildKeymap(pm.schema));

  //   // 'change' event is public API
  //   pm.on.change.add(() => emit(this, 'change'));

  //   // Focus on the PM content area if necessary
  //   if (this._focused) {
  //     pm.focus();
  //   }

  //   this._pm = pm
  // }
}

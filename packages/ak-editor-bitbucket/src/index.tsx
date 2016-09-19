import './types';
import autobind from 'autobind-decorator';
import * as events from './internal/events';
import { define, prop, emit, Component } from 'skatejs';
import { ProseMirror, Schema, Text } from 'ak-editor-prosemirror';
import 'style!./host.less';
import cx from 'classnames';
import maybe from './maybe';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import HyperLink from 'ak-editor-hyperlink-edit';
import ToolbarBlockType from 'ak-editor-toolbar-block-type';
import ToolbarLists from 'ak-editor-toolbar-lists';
import ToolbarTextFormatting from 'ak-editor-toolbar-text-formatting';
import ToolbarHyperlink from 'ak-editor-toolbar-hyperlink';
import schema from 'ak-editor-schema';
import { buildKeymap } from './keymap';
import { markdownSerializer } from './markdown-serializer';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
import { blockTypes, blockTypeType, blockTypesType } from './block-types';

import {
  default as ListsPlugin,
  ListType,
} from 'ak-editor-plugin-lists';
import MarkdownInputRulesPlugin from 'ak-editor-plugin-markdown-inputrules';
import {
  default as HyperlinkPlugin,
  DISABLED_GROUP as HyperlinkPluginDisabledGroup
} from 'ak-editor-plugin-hyperlink';
import {
  default as ImageUploadPlugin,
  DISABLED_GROUP as ImageUploadPluginDisabledGroup,
  ImageUploadOptions
} from 'ak-editor-plugin-image-upload';
import {
  default as TextFormattingPlugin,
  MarkType,
} from 'ak-editor-plugin-text-formatting';
import MentionsPlugin from 'ak-editor-plugin-mentions';

// typescript removes unused var if we import it :(
const { vdom } = require('skatejs');

const functionProp = () => ({
  coerce: (val: any) => (typeof val === 'function' ? val : () => {}),
  default: null,
});

type getBlockTypeType = { blockType?: string, blockName?: string };

function getBlockType({ blockType, blockName }: getBlockTypeType, blockTypes: blockTypesType): blockTypeType | void {
  let len = blockTypes.length;
  while (--len >= 0) {
    const bt = blockTypes[len];
    if (bt.name === blockName ||
      (bt.schemaName + (bt.level ? bt.level : '')) === blockType) {
      return bt;
    }
  }
}

interface formattingMap {
  [propName: string]: MarkType;
}

const formattingToProseMirrorMark: formattingMap = {
  bold: 'strong',
  italic: 'em',
  code: 'code',
};

@autobind
class AkEditorBitbucket extends Component {
  // public state
  defaultValue: string;
  placeholder: string;
  imageUploader: Function;
  context: string;
  expanded: boolean;

  // private state
  _focused: boolean;
  _canChangeBlockType: boolean;
  _strongActive: boolean;
  _emActive: boolean;
  _underlineActive: boolean;
  _codeActive: boolean;
  _canChangeTextFormatting: boolean;
  _hyperLinkHref: string;
  _selectedBlockType: any;
  _hyperLinkElement: HTMLElement | undefined;
  _hyperLinkActive: boolean;
  _canLinkHyperlink: boolean;
  _bulletlistDisabled: boolean;
  _numberlistDisabled: boolean;
  _bulletListActive: boolean;
  _numberListActive: boolean;

  // internal
  _blockTypes: blockTypeType[];
  _justToggledExpansion: boolean;
  _pm: ProseMirror | null = null;
  _ready: boolean;
  _wrapper: HTMLElement;

  static get props() {
    return {
      /**
       * The initial markdown value for the editor.
       *
       * Changes to this value are not reflected in the editor. This property
       * follows the "uncontrolled" component pattern in React. See
       * https://facebook.github.io/react/docs/forms.html#uncontrolled-components
       * for details.
       */
      defaultValue: prop.string({ attribute: true }),
      placeholder: prop.string({ attribute: true }),
      imageUploader: functionProp(),
      context: prop.string({ attribute: true }),
      expanded: prop.boolean({ attribute: true }),

      /**
       * True if the editor has focus.
       * @private
       */
      _focused: prop.boolean(),
      _canChangeBlockType: prop.boolean(),
      _strongActive: prop.boolean(),
      _emActive: prop.boolean(),
      _underlineActive: prop.boolean(),
      _codeActive: prop.boolean(),
      _canChangeTextFormatting: prop.boolean(),
      _hyperLinkHref: prop.string(),
      _selectedBlockType: {},
      _hyperLinkElement: {},
      _hyperLinkActive: prop.boolean(),
      _canLinkHyperlink: prop.boolean(),
      _bulletlistDisabled: prop.boolean(),
      _numberlistDisabled: prop.boolean(),
      _bulletListActive: prop.boolean(),
      _numberListActive: prop.boolean(),
    };
  }

  static created(elem: AkEditorBitbucket) : void {
    if (blockTypes[elem.context]) {
      elem._blockTypes = blockTypes[elem.context];
    } else {
      elem._blockTypes = blockTypes._defaultContext;
    }
  }

  static rendered(elem: AkEditorBitbucket) : void {
    if (elem.expanded && elem._justToggledExpansion) {
      elem._justToggledExpansion = false;
      elem._initEditor();
      if (!elem._ready) {
        emit(elem, 'ready');
        elem._ready = true;
      }

      elem.focus();
    }
  }

  static render(elem: AkEditorBitbucket) {
    let fakeInputClassNames = shadowStyles.locals.fakeInput;

    if (elem.context === 'comment') {
      fakeInputClassNames += ` ${shadowStyles.locals.comment}`;
    }

    const fullEditor: any = (<div>
      <Toolbar>
        <ToolbarBlockType
          disabled={!elem._canChangeBlockType}
          selectedBlockType={elem._selectedBlockType}
          blockTypes={elem._blockTypes}
          onSelectBlockType={elem._selectBlockType}
        />
        <ToolbarTextFormatting
          boldActive={elem._strongActive}
          italicActive={elem._emActive}
          underlineActive={elem._underlineActive}
          codeActive={elem._codeActive}
          boldDisabled={!elem._canChangeTextFormatting}
          italicDisabled={!elem._canChangeTextFormatting}
          underlineDisabled={!elem._canChangeTextFormatting}
          codeDisabled={!elem._canChangeTextFormatting}
          underlineHidden
          onToggletextformatting={elem._toggleMark}
        />
        <ToolbarHyperlink
          active={elem._hyperLinkActive}
          disabled={!elem._canLinkHyperlink}
          onSave={elem._addHyperLink}
        />
        <ToolbarLists
          bulletlistDisabled={elem._bulletlistDisabled}
          numberlistDisabled={elem._numberlistDisabled}
          bulletlistActive={elem._bulletListActive}
          numberlistActive={elem._numberListActive}
          on-toggle-number-list={() => elem._toggleList('ordered_list')}
          on-toggle-bullet-list={() => elem._toggleList('bullet_list')}
        />
      </Toolbar>
      <Content
        className={shadowStyles.locals.content}
        onclick={elem._onContentClick}
        ref={(wrapper: HTMLElement) => { elem._wrapper = wrapper; }}
        openTop
        openBottom
        skip
      />
      {elem._hyperLinkActive ?
        <HyperLink
          href={elem._hyperLinkHref}
          textInputValue={elem._hyperLinkHref}
          attachTo={elem._hyperLinkElement}
          onUnlink={elem._unlink}
          onchange={elem._changeHyperLinkValue}
        />
        : null
      }
      <Footer
        openTop
        onSave={elem._toggleExpansion}
        onCancel={elem._toggleExpansion}
        onInsertimage={elem._insertImage}
      />
    </div>);

    return (
      <div
        className={
          cx(shadowStyles.locals.root, {
            [shadowStyles.locals.focused]: elem._focused,
          })
        }
      >
        <style>{shadowStyles.toString()}</style>
        {elem.expanded ?
          fullEditor
          :
          <input
            placeholder={elem.placeholder}
            onclick={elem._toggleExpansion}
            className={fakeInputClassNames}
          />
        }
      </div>
    );
  }

  /**
   * Focus the content region of the editor.
   */
  focus(): void {
    for (const pm of maybe(this._pm)) {
      pm.focus();
    }
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear(): void {
    for (const pm of maybe(this._pm)) {
      pm.tr.delete(0, pm.doc.content.size).apply();
    }
  }

  /**
   * Return the current markdown value from the editor.
   * @returns {string}
   */
  get value(): string {
    for (const pm of maybe(this._pm)) {
      return markdownSerializer.serialize(pm.doc);
    }
    return this.defaultValue;
  }

  /**
   * Returns true if the editor has been initialised and is ready for
   * interaction.
   */
  get ready(): boolean {
    return this._ready || false;
  }

  _onContentClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      this.focus();
    }
  }

  _selectBlockType(event: CustomEvent): void {
    const blockType = event.detail.blockType;
    const schemaName = blockType.schemaName;
    const level = blockType.level;

    for (const pm of maybe(this._pm)) {
      BlockTypePlugin.get(pm).changeBlockType(schemaName, { level });
    }
  }

  _toggleMark(event: CustomEvent): void {
    const mark: MarkType = formattingToProseMirrorMark[event.detail.mark];

    for (const pm of maybe(this._pm)) {
      TextFormattingPlugin.get(pm).toggleMark(mark);
    }
  }

  _toggleList(name: ListType): void {
    for (const pm of maybe(this._pm)) {
      ListsPlugin.get(pm).toggleList(name);
    }
  }

  _addHyperLink(event: CustomEvent): void {
    const href = event.detail.value;
    for (const pm of maybe(this._pm)) {
      HyperlinkPlugin.get(pm).addLink({ href });
    }
  }

  _insertImage(): void {
    for (const pm of maybe(this._pm)) {
      this.imageUploader(false, (attr: ImageUploadOptions) =>
        ImageUploadPlugin.get(pm).addImage(attr));
    }
  }

  _unlink(): void {
    for (const pm of maybe(this._pm)) {
      HyperlinkPlugin.get(pm).removeLink();
    }
  }

  _changeHyperLinkValue(event: Event) {
    const newLink = (event.target as any).value;
    if (newLink) {
      for (const pm of maybe(this._pm)) {
        HyperlinkPlugin.get(pm).updateLink({
          href: newLink,
          text: newLink,
        });
      }
    }
  }

  _toggleExpansion() {
    this.expanded = !this.expanded;
    this._justToggledExpansion = true;
  }

  _initEditor() {
    this.addEventListener('blur', () => { this._focused = false; });
    this.addEventListener('focus', () => { this._focused = true; });

    schema.nodes.code_block.group += ` ${HyperlinkPluginDisabledGroup}`;
    schema.nodes.code_block.group += ` ${ImageUploadPluginDisabledGroup}`;

    const pm = new ProseMirror({
      place: this._wrapper,
      doc: new Text({}, this.defaultValue),
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

    // Hyperlink plugin wiring
    HyperlinkPlugin.get(pm).subscribe(state => {
      this._canLinkHyperlink = state.enabled as boolean;
      this._hyperLinkActive = state.active as boolean;
      this._hyperLinkElement = state.element as HTMLElement;
      this._hyperLinkHref = state.href as string;
    });

    // Image upload plugin wiring
    const insertImage = (attr: ImageUploadOptions) => ImageUploadPlugin.get(pm).addImage(attr);
    const handler = (_: any, e: any) => this.imageUploader(e, insertImage);
    ImageUploadPlugin.get(pm).dropAdapter.add(handler);
    ImageUploadPlugin.get(pm).pasteAdapter.add(handler);

    // Block type plugin wiring
    BlockTypePlugin.get(pm).subscribe(state => {
      const blockType = state.selectedBlockType;
      this._selectedBlockType = getBlockType({ blockType }, this._blockTypes);
      this._canChangeBlockType = state.enabled as boolean;
    });

    // Lists
    ListsPlugin.get(pm).subscribe(state => {
      this._bulletListActive = Boolean(state.active && state.type === 'bullet_list');
      this._numberListActive = Boolean(state.active && state.type === 'ordered_list');

      this._bulletlistDisabled = Boolean(state.enabled);
      this._numberlistDisabled = Boolean(state.enabled);
    });

    // Text formatting
    TextFormattingPlugin.get(pm).subscribe(state => {
      this._strongActive = state.strongActive;
      this._emActive = state.emActive;
      this._underlineActive = state.underlineActive;
      this._codeActive = state.codeActive;
      this._canChangeTextFormatting = !state.disabled;
    });

    // Mentions wiring
    const emitMentionEvent = (ev: string) => {
      return (el: HTMLElement, pm: ProseMirror) => emit(this, ev, {
        detail: { el, pm }
      });
    }
    MentionsPlugin.get(pm).renderHandler = emitMentionEvent('mentionrender');
    MentionsPlugin.get(pm).autocompleteHandler = emitMentionEvent('mentionautocomplete');

    // avoid invoking keyboard shortcuts in BB
    pm.wrapper.addEventListener('keypress', e => e.stopPropagation());
    pm.wrapper.addEventListener('keydown', e => e.stopPropagation());

    // add the keymap
    pm.addKeymap(buildKeymap(pm.schema));

    // 'change' event is public API
    pm.on.change.add(() => emit(this, 'change'));

    this._pm = pm;
  }
}

export default define('ak-editor-bitbucket', AkEditorBitbucket);
export { events };

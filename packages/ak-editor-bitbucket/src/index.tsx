import './types';
import autobind from 'autobind-decorator';
import * as events from './internal/events';
import { define, prop, emit, Component } from 'skatejs';
import { ProseMirror, Schema } from 'ak-editor-prosemirror';
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
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { markdownTransformer } from './paste-handlers';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
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

type blockTypeType = {
  name: string,
  display: string,
  schemaName: string,
  level?: number,
};

type blockTypesType = blockTypeType[];

const commentFonts = [{
  name: 'normalText',
  display: 'Normal text',
  schemaName: 'paragraph',
}, {
  name: 'blockQuote',
  display: 'Block quote',
  schemaName: 'blockquote',
}, {
  name: 'monospace',
  display: 'Monospace',
  schemaName: 'code_block',
}];

const objectFonts = [{
  name: 'normalText',
  display: 'Normal text',
  schemaName: 'paragraph',
}, {
  name: 'heading1',
  display: 'Heading 1',
  schemaName: 'heading',
  level: 2,
}, {
  name: 'heading2',
  display: 'Heading 2',
  schemaName: 'heading',
  level: 3,
}, {
  name: 'heading3',
  display: 'Heading 3',
  schemaName: 'heading',
  level: 4,
}, {
  name: 'blockQuote',
  display: 'Block quote',
  schemaName: 'blockquote',
}, {
  name: 'monospace',
  display: 'Monospace',
  schemaName: 'code_block',
}];

type getFontParamType = { blockType?: string, fontName?: string };

function getFont({ blockType, fontName }: getFontParamType, fonts: blockTypesType): blockTypeType | void {
  let len = fonts.length;
  while (--len >= 0) {
    const font = fonts[len];
    if (font.name === fontName ||
      (font.schemaName + (font.level ? font.level : '')) === blockType) {
      return font;
    }
  }
}

interface formattingMap {
  [propName: string]: MarkType;
}

const formattingToProseMirrorMark: formattingMap = {
  bold: 'strong',
  italic: 'em',
};

@autobind
class AkEditorBitbucket extends Component {
  // public state
  defaultValue: string;
  placeholder: string;
  imageUploader: Function;
  context: string;

  get expanded(): boolean {
    return this._expanded;
  }

  set expanded(val) {
    this._expanded = val;

    if (!this._expanded) {
      this._pm = null;
    }
  }

  // private state
  _expanded: boolean;
  _focused: boolean;
  _canChangeBlockType: boolean;
  _strongActive: boolean;
  _emActive: boolean;
  _underlineActive: boolean;
  _canChangeTextFormatting: boolean;
  _hyperLinkHref: string;
  _selectedFont: any;
  _hyperLinkElement: HTMLElement | undefined;
  _hyperLinkActive: boolean;
  _canLinkHyperlink: boolean;
  _bulletListActive: boolean;
  _numberListActive: boolean;

  // internal
  _fonts: any;
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

      _expanded: prop.boolean({ attribute: true }),
      /**
       * True if the editor has focus.
       * @private
       */
      _focused: prop.boolean(),
      _canChangeBlockType: prop.boolean(),
      _strongActive: prop.boolean(),
      _emActive: prop.boolean(),
      _underlineActive: prop.boolean(),
      _canChangeTextFormatting: prop.boolean(),
      _hyperLinkHref: prop.string(),
      _selectedFont: {},
      _hyperLinkElement: {},
      _hyperLinkActive: prop.boolean(),
      _canLinkHyperlink: prop.boolean(),
      _bulletListActive: prop.boolean(),
      _numberListActive: prop.boolean(),
    };
  }

  static created(elem: AkEditorBitbucket) {
    if (elem.context === 'comment') {
      elem._fonts = commentFonts;
    } else {
      elem._fonts = objectFonts;
    }
  }

  static rendered(elem: AkEditorBitbucket) {
    if (elem.expanded) {
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
          selectedFont={elem._selectedFont}
          fonts={elem._fonts}
          onSelectFont={elem._selectFont}
        />
        <ToolbarTextFormatting
          boldActive={elem._strongActive}
          italicActive={elem._emActive}
          underlineActive={elem._underlineActive}
          boldDisabled={!elem._canChangeTextFormatting}
          italicDisabled={!elem._canChangeTextFormatting}
          underlineDisabled={!elem._canChangeTextFormatting}
          underlineHidden
          onToggletextformatting={elem._toggleMark}
        />
        <ToolbarHyperlink
          active={elem._hyperLinkActive}
          disabled={!elem._canLinkHyperlink}
          onSave={elem._addHyperLink}
        />
        <ToolbarLists
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
        onSave={() => elem.expanded = false}
        onCancel={() => elem.expanded = false}
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
            onclick={() => elem.expanded = true}
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

  _selectFont(event: CustomEvent): void {
    const font = event.detail.font;

    const blockType = font.schemaName;
    const level = font.level;

    for (const pm of maybe(this._pm)) {
      BlockTypePlugin.get(pm).changeBlockType(blockType, { level });
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

  _initEditor() {
    if (this._pm) {
      return;
    }

    this.addEventListener('blur', () => { this._focused = false; });
    this.addEventListener('focus', () => { this._focused = true; });

    schema.nodes.code_block.group += ` ${HyperlinkPluginDisabledGroup}`;
    schema.nodes.code_block.group += ` ${ImageUploadPluginDisabledGroup}`;

    const pm = new ProseMirror({
      place: this._wrapper,
      doc: markdownParser(new Schema(schema)).parse(this.defaultValue),
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
    HyperlinkPlugin.get(pm).onChange(state => {
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
    BlockTypePlugin.get(pm).onChange(state => {
      const blockType = state.selectedBlockType;
      const font = getFont({ blockType }, this._fonts);
      this._selectedFont = font;
      this._canChangeBlockType = state.enabled as boolean;
    });

    // Lists
    ListsPlugin.get(pm).onChange(state => {
      this._bulletListActive = Boolean(state.active && state.type === 'bullet_list');
      this._numberListActive = Boolean(state.active && state.type === 'ordered_list');
    });

    // Text formatting
    TextFormattingPlugin.get(pm).onChange(state => {
      this._strongActive = state.strongActive;
      this._emActive = state.emActive;
      this._underlineActive = state.underlineActive;
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

    // add paste handlers
    pm.on.transformPasted.add(slice => markdownTransformer(pm.schema, slice));

    // 'change' event is public API
    pm.on.change.add(() => emit(this, 'change'));

    this._pm = pm;
  }
}

export default define('ak-editor-bitbucket', AkEditorBitbucket);
export { events };

import './types';
import * as events from './internal/events';
import { define, prop, emit } from 'skatejs';
import { ProseMirror, Schema } from 'ak-editor-prosemirror';
import 'style!./host.less';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import HyperLink from 'ak-editor-hyperlink-edit';
import ToolbarBlockType from 'ak-editor-toolbar-block-type';
import ToolbarLists from 'ak-editor-toolbar-lists';
import ToolbarTextFormatting from 'ak-editor-toolbar-text-formatting';
import ToolbarHyperlink from 'ak-editor-toolbar-hyperlink';
import { schema } from './schema';
import { buildKeymap } from './keymap';
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { nodeLifecycleHandler } from './node-lifecycle';
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

// typescript only supports this. TODO: investigate why
const { vdom } = require('skatejs');

const $selectFont = '__selectFont__';
const $toggleMark = '__toggleMark__';
const $toggleList = '__toggleList__';
const $addHyperLink = '__addHyperLink__';
const $unlink = '__unlink__';
const $insertImage = '__insertImage__';
const $changeHyperLinkValue = '__changeHyperLinkValue__';
const $toggleExpansion = '__toggleExpansion__';
// a flag that indicates it just toggled so that rendered wouldn't init pm again
const $justToggledExpansion = '__justToggledExpansion__';
const $initEditor = '__init_editor__';
const $pm = '__pm__';
const $ready = '__ready__';
const $focused = '__focused__';
const $wrapper = '__wrapper__';
const $onContentClick = '__onContentClick__';
const $canChangeBlockType = '__canChangeBlockType__';
const $strongActive = '__strongActive__';
const $emActive = '__emActive__';
const $underlineActive = '__underlineActive__';
const $canChangeTextFormatting = '__canChangeTextFormatting__';
const $hyperLinkText = '__hyperLinkText__';
const $canLinkHyperlink = '__canLinkHyperlink__';
const $selectedFont = '__selectedFont__';
const $fonts = '__fonts__';
const $hyperLinkElement = '__hyperLinkElement__';
const $hyperLinkActive = '__hyperLinkActive__';
const $bulletListActive = '__bulletListActive__';
const $numberListActive = '__numberListActive__';
const $listsPlugin = '__listsPlugin__';

const functionProp = () => ({
  coerce: (val: any) => (typeof val === 'function' ? val : () => {}),
  default: null,
});

function bind(object: any, propName: string) {
  object[propName] = object[propName].bind(object);
}

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

function getFont({ blockType, fontName }: getFontParamType, fonts: blockTypesType): blockTypeType {
  let len = fonts.length;
  while (--len >= 0) {
    const font = fonts[len];
    if (font.name === fontName ||
      (font.schemaName + (font.level ? font.level : '')) === blockType) {
      return font;
    }
  }

  // not found (should not reach this!)
  throw new Error('Cannot get your font!');
}

interface formattingMap {
  [propName: string]: MarkType;
}

const formattingToProseMirrorMark: formattingMap = {
  bold: 'strong',
  italic: 'em',
};

export default define('ak-editor-bitbucket', {
  created(elem: any) {
    if (elem.context === 'comment') {
      elem[$fonts] = commentFonts;
    } else {
      elem[$fonts] = objectFonts;
    }

    bind(elem, $onContentClick);
    bind(elem, 'focus');
    bind(elem, $selectFont);
    bind(elem, $toggleMark);
    bind(elem, $toggleList);
    bind(elem, $addHyperLink);
    bind(elem, $unlink);
    bind(elem, $changeHyperLinkValue);
    bind(elem, $toggleExpansion);
    bind(elem, $insertImage);
  },

  rendered(elem: any) {
    if (elem.expanded && elem[$justToggledExpansion]) {
      elem[$justToggledExpansion] = false;
      elem[$initEditor]();
      if (!elem[$ready]) {
        emit(elem, 'ready');
        elem[$ready] = true;
      }

      elem[$pm].focus();
    }
  },

  render(elem: any) {
    let fakeInputClassNames = shadowStyles.locals.fakeInput;

    if (elem.context === 'comment') {
      fakeInputClassNames += ` ${shadowStyles.locals.comment}`;
    }

    const fullEditor: any = (<div>
      <Toolbar>
        <ToolbarBlockType
          disabled={!elem[$canChangeBlockType]}
          selectedFont={elem[$selectedFont]}
          fonts={elem[$fonts]}
          onSelectFont={elem[$selectFont]}
        />
        <ToolbarTextFormatting
          boldActive={elem[$strongActive]}
          italicActive={elem[$emActive]}
          underlineActive={elem[$underlineActive]}
          boldDisabled={!elem[$canChangeTextFormatting]}
          italicDisabled={!elem[$canChangeTextFormatting]}
          underlineDisabled={!elem[$canChangeTextFormatting]}
          underlineHidden
          onToggletextformatting={elem[$toggleMark]}
        />
        <ToolbarHyperlink
          active={elem[$hyperLinkActive]}
          disabled={!elem[$canLinkHyperlink]}
          onSave={elem[$addHyperLink]}
        />
        <ToolbarLists
          bulletlistActive={elem[$bulletListActive]}
          numberlistActive={elem[$numberListActive]}
          on-toggle-number-list={() => elem[$toggleList]('ordered_list')}
          on-toggle-bullet-list={() => elem[$toggleList]('bullet_list')}
        />
      </Toolbar>
      <Content
        className={shadowStyles.locals.content}
        onclick={elem[$onContentClick]}
        ref={(wrapper: HTMLElement) => { elem[$wrapper] = wrapper; }}
        openTop
        openBottom
        skip
      />
      {elem[$hyperLinkActive] ?
        <HyperLink
          href={elem[$hyperLinkText]}
          textInputValue={elem[$hyperLinkText]}
          attachTo={elem[$hyperLinkElement]}
          onUnlink={elem[$unlink]}
          onchange={elem[$changeHyperLinkValue]}
        />
        : null
      }
      <Footer
        openTop
        onSave={elem[$toggleExpansion]}
        oncancel={elem[$toggleExpansion]}
        onInsertimage={elem[$insertImage]}
      />
    </div>);

    return (
      <div
        className={
          cx(shadowStyles.locals.root, {
            [shadowStyles.locals.focused]: elem[$focused],
          })
        }
      >
        <style>{shadowStyles.toString()}</style>
        {elem.expanded ?
          fullEditor
          :
          <input
            placeholder={elem.defaultValue}
            onclick={elem[$toggleExpansion]}
            className={fakeInputClassNames}
          />
        }
      </div>
    );
  },

  props: {
    /**
     * The initial markdown value for the editor.
     *
     * Changes to this value are not reflected in the editor. This property
     * follows the "uncontrolled" component pattern in React. See
     * https://facebook.github.io/react/docs/forms.html#uncontrolled-components
     * for details.
     */
    defaultValue: prop.string({ attribute: true }),
    imageUploader: functionProp(),
    context: prop.string({ attribute: true }),
    expanded: prop.boolean({ attribute: true }),

    /**
     * True if the editor has focus.
     * @private
     */
    [$focused]: prop.boolean(),
    [$canChangeBlockType]: prop.boolean(),
    [$strongActive]: prop.boolean(),
    [$emActive]: prop.boolean(),
    [$underlineActive]: prop.boolean(),
    [$canChangeTextFormatting]: prop.boolean(),
    [$hyperLinkText]: prop.string(),
    [$selectedFont]: {},
    [$hyperLinkElement]: {},
    [$hyperLinkActive]: prop.boolean(),
    [$canLinkHyperlink]: prop.boolean(),
    [$bulletListActive]: prop.boolean(),
    [$numberListActive]: prop.boolean(),
  },

  prototype: {
    /**
     * Focus the content region of the editor.
     */
    focus() {
      const pm = this[$pm];
      pm.focus();
    },

    /**
     * Clear the content of the editor, making it an empty document.
     */
    clear() {
      const pm = this[$pm];
      pm.tr.delete(0, pm.doc.content.size).apply();
    },

    /**
     * Return the current markdown value from the editor.
     * @returns {string}
     */
    get value() {
      const pm = this[$pm];
      return markdownSerializer.serialize(pm.doc);
    },

    /**
     * Returns true if the editor has been initialised and is ready for
     * interaction.
     * @returns {boolean}
     */
    get ready() {
      return this[$ready] || false;
    },

    [$onContentClick](e: MouseEvent) {
      if (e.target === e.currentTarget) {
        this.focus();
      }
    },

    [$selectFont](event: CustomEvent) {
      const font = event.detail.font;

      const blockType = font.schemaName;
      const level = font.level;

      BlockTypePlugin.get(this[$pm]).changeBlockType(blockType, { level });
    },

    [$toggleMark](event: CustomEvent) {
      const mark: MarkType = formattingToProseMirrorMark[event.detail.mark];
      TextFormattingPlugin.get(this[$pm]).toggleMark(mark);
    },

    [$toggleList](name: ListType) {
      ListsPlugin.get(this[$pm]).toggleList(name);
    },

    [$addHyperLink](event: CustomEvent) {
      const href = event.detail.value;
      HyperlinkPlugin.get(this[$pm]).addLink({
        href,
      });
    },

    [$insertImage]() {
      this.imageUploader(false, (attr: ImageUploadOptions) => ImageUploadPlugin.get(this[$pm]).addImage(attr));
    },

    [$unlink]() {
      HyperlinkPlugin.get(this[$pm]).removeLink();
    },

    [$changeHyperLinkValue](event: Event) {
      const newLink = (event.target as any).value;
      if (newLink) {
        HyperlinkPlugin.get(this[$pm]).updateLink({
          href: newLink,
          text: newLink,
        });
      }
    },

    [$toggleExpansion]() {
      this.expanded = !this.expanded;
      this[$justToggledExpansion] = true;
    },

    [$initEditor]() {
      const elem = this;
      elem.addEventListener('blur', () => { elem[$focused] = false; });
      elem.addEventListener('focus', () => { elem[$focused] = true; });

      schema.nodes.code_block.group += ` ${HyperlinkPluginDisabledGroup}`;
      schema.nodes.code_block.group += ` ${ImageUploadPluginDisabledGroup}`;

      const pm = new ProseMirror({
        place: this[$wrapper],
        doc: markdownParser(new Schema(schema)).parse(this.defaultValue),
        plugins: [
          MarkdownInputRulesPlugin,
          HyperlinkPlugin,
          ImageUploadPlugin,
          BlockTypePlugin,
          ListsPlugin,
          TextFormattingPlugin,
        ],
      });

      // Hyperlink plugin wiring
      HyperlinkPlugin.get(pm).onChange(state => {
        elem[$canLinkHyperlink] = state.enabled;
        elem[$hyperLinkActive] = state.active;
        elem[$hyperLinkElement] = state.element;
        elem[$hyperLinkText] = state.text;
      });

      // Image upload plugin wiring
      const insertImage = (attr: ImageUploadOptions) => ImageUploadPlugin.get(pm).addImage(attr);
      const handler = (_: any, e: any) => elem.imageUploader(e, insertImage);
      ImageUploadPlugin.get(pm).dropAdapter.add(handler);
      ImageUploadPlugin.get(pm).pasteAdapter.add(handler);

      // Block type plugin wiring
      BlockTypePlugin.get(pm).onChange(state => {
        const blockType = state.selectedBlockType;
        const font = getFont({ blockType }, elem[$fonts]);
        elem[$selectedFont] = font;
        elem[$canChangeBlockType] = state.enabled;
      });

      // Lists
      ListsPlugin.get(pm).onChange(state => {
        elem[$bulletListActive] = state.active && state.type === 'bullet_list';
        elem[$numberListActive] = state.active && state.type === 'ordered_list';
      });

      // Text formatting
      TextFormattingPlugin.get(pm).onChange(state => {
        elem[$strongActive] = state.strongActive;
        elem[$emActive] = state.emActive;
        elem[$underlineActive] = state.underlineActive;
        elem[$canChangeTextFormatting] = !state.disabled;
      });

      // avoid invoking keyboard shortcuts in BB
      pm.wrapper.addEventListener('keypress', e => e.stopPropagation());
      pm.wrapper.addEventListener('keydown', e => e.stopPropagation());

      // add the keymap
      pm.addKeymap(buildKeymap(pm.schema));

      // add paste handlers
      pm.on.transformPasted.add(slice => markdownTransformer(pm.schema, slice));

      // add node life cycle handler
      pm.on.flush.add(() => nodeLifecycleHandler(pm));

      // 'change' event is public API
      pm.on.change.add(() => emit(this, 'change'));

      this[$pm] = pm;
    },
  },
});

export { events };

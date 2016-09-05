import { vdom, define, prop, emit } from 'skatejs';
import { ProseMirror, Plugin } from 'prosemirror/dist/edit';
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
import { Schema } from 'prosemirror/dist/model';
import { schema } from './schema';
import { buildKeymap } from './keymap';
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { nodeLifecycleHandler } from './node-lifecycle';
import { markdownTransformer } from './paste-handlers';
import * as events from './internal/events';

// editorKit plugings
import BlockTypePlugin from 'atlassian-editorkit-block-type-plugin';
import ListsPlugin from 'atlassian-editorkit-lists-plugin';
import MarkdownInputRulesPlugin from 'atlassian-editorkit-markdown-inputrules-plugin';
import HyperLinkPlugin from 'atlassian-editorkit-hyperlink-plugin';
import ImageUploadPlugin from 'atlassian-editorkit-image-upload-plugin';
import TextFormattingPlugin from 'atlassian-editorkit-text-formatting-plugin';

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
const $textFormattingPlugin = '__textFormattingPlugin__';
const $hyperLinkText = '__hyperLinkText__';
const $canLinkHyperlink = '__canLinkHyperlink__';
const $selectedFont = '__selectedFont__';
const $fonts = '__fonts__';
const $blockTypePlugin = '__blockTypePlugin__';
const $listsPlugin = '__listsPlugin__';
const $hyperLinkElement = '__hyperLinkElement__';
const $hyperLinkPlugin = '__hyperLinkPlugin__';
const $hyperLinkActive = '__hyperLinkActive__';
const $bulletListActive = '__bulletListActive__';
const $numberListActive = '__numberListActive__';

const functionProp = () => ({
  coerce: val => (typeof val === 'function' ? val : () => {}),
  default: null,
});

function bind(elem, propName) {
  elem[propName] = elem[propName].bind(elem);
}

const commentFonts = [{
  name: 'normalText',
  display: 'Normal text',
  schemaName: 'paragraph',
}, {
  name: 'blockQuote',
  display: 'Block quote',
  schemaName: 'blockQuote',
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
  schemaName: 'blockQuote',
}, {
  name: 'monospace',
  display: 'Monospace',
  schemaName: 'code_block',
}];

function getFont({ blockType, fontName }, fonts) {
  let len = fonts.length;
  while (--len >= 0) {
    const font = fonts[len];
    if (font.name === fontName ||
      (font.schemaName + (font.level ? font.level : '')) === blockType) {
      return font;
    }
  }

  // not found
  return {};
}

function selectFont(blockTypePlugin) {
  return (event) => {
    const font = event.detail.font;
    const blockType = font.schemaName;
    const level = font.level;

    blockTypePlugin.changeBlockType(blockType, { level });
  };
}

function toggleMark(textFormattingPlugin, name) {
  return () => {
    textFormattingPlugin.toggleMark(name);
  };
}

function addHyperLink(hyperLinkPlugin) {
  return (event) => {
    const href = event.detail.value;
    hyperLinkPlugin.addLink({
      href,
    });
  };
}

function unlink(hyperLinkPlugin) {
  return () => {
    hyperLinkPlugin.removeLink();
  };
}

function changeHyperLinkValue(hyperLinkPlugin) {
  return (event) => {
    const newLink = event.target.value;
    if (newLink) {
      hyperLinkPlugin.updateLink({
        href: newLink,
        text: newLink,
      });
    }
  };
}

export default define('ak-editor-bitbucket', {
  created(elem) {
    if (elem.context === 'comment') {
      elem[$fonts] = commentFonts;
    } else {
      elem[$fonts] = objectFonts;
    }
    bind(elem, $onContentClick);
    bind(elem, 'focus');
  },

  rendered(elem) {
    if (!elem[$ready]) {
      elem[$ready] = true;
      elem[$initEditor]();
      emit(elem, events.ready);
    }
  },

  render(elem) {
    return (
      <div
        className={
          cx(shadowStyles.locals.root, {
            [shadowStyles.locals.focused]: elem[$focused],
          })
        }
      >
        <style>{shadowStyles.toString()}</style>
        <Toolbar>
          <ToolbarBlockType
            disabled={!elem[$canChangeBlockType]}
            selectedFont={elem[$selectedFont]}
            fonts={elem[$fonts]}
            onSelectFont={selectFont(elem[$blockTypePlugin])}
          />
          <ToolbarTextFormatting
            boldActive={elem[$strongActive]}
            italicActive={elem[$emActive]}
            underlineActive={elem[$underlineActive]}
            boldDisabled={!elem[$canChangeTextFormatting]}
            italicDisabled={!elem[$canChangeTextFormatting]}
            underlineDisabled={!elem[$canChangeTextFormatting]}
            underlineHidden
            on-toggle-bold={toggleMark(elem[$textFormattingPlugin], 'strong')}
            on-toggle-italic={toggleMark(elem[$textFormattingPlugin], 'em')}
            on-toggle-underline={toggleMark(elem[$textFormattingPlugin], 'underline')}
          />
          <ToolbarHyperlink
            active={elem[$hyperLinkActive]}
            disabled={!elem[$canLinkHyperlink]}
            onSave={addHyperLink(elem[$hyperLinkPlugin])}
          />
          <ToolbarLists
            bulletlistActive={elem[$bulletListActive]}
            numberlistActive={elem[$numberListActive]}
            on-toggle-number-list={() => elem[$listsPlugin].toggleList('ordered_list')}
            on-toggle-bullet-list={() => elem[$listsPlugin].toggleList('bullet_list')}
          />
        </Toolbar>
        <Content
          className={shadowStyles.locals.content}
          onclick={elem[$onContentClick]}
          ref={(wrapper) => { elem[$wrapper] = wrapper; }}
          openTop
          openBottom
          skip
        />
        {elem[$hyperLinkActive] ?
          <HyperLink
            href={elem[$hyperLinkText]}
            textInputValue={elem[$hyperLinkText]}
            attachTo={elem[$hyperLinkElement]}
            onUnlink={unlink(elem[$hyperLinkPlugin])}
            onchange={changeHyperLinkValue(elem[$hyperLinkPlugin])}
          />
        : null}
        <Footer openTop />
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

    [$onContentClick](e) {
      if (e.target === e.currentTarget) {
        this.focus();
      }
    },

    [$initEditor]() {
      const elem = this;
      elem.addEventListener('blur', () => { elem[$focused] = false; });
      elem.addEventListener('focus', () => { elem[$focused] = true; });

      schema.nodes.code_block.group += ` ${HyperLinkPlugin.DISABLED_GROUP}`;
      schema.nodes.code_block.group += ` ${ImageUploadPlugin.DISABLED_GROUP}`;

      const pm = new ProseMirror({
        place: this[$wrapper],
        doc: markdownParser(new Schema(schema)).parse(this.defaultValue),
        plugins: [
          new Plugin(MarkdownInputRulesPlugin),
          new Plugin(class HyperLinkPluginDecorator {
            constructor(proseMirrorInstance) {
              const hyperLinkPlugin = new HyperLinkPlugin(proseMirrorInstance);

              hyperLinkPlugin.onChange(state => {
                elem[$canLinkHyperlink] = state.enabled;
                elem[$hyperLinkActive] = state.active;
                elem[$hyperLinkElement] = state.element;
                elem[$hyperLinkText] = state.text;
              });

              elem[$hyperLinkPlugin] = hyperLinkPlugin;

              return hyperLinkPlugin;
            }
          }),
          new Plugin(class ImageUploadPluginDecorator {
            constructor(proseMirrorInstance) {
              const imageUploadPlugin = new ImageUploadPlugin(proseMirrorInstance);
              const insertImage = (url) => imageUploadPlugin.addImage(url);
              const handler = (_, e) => elem.imageUploader(e, insertImage);

              imageUploadPlugin.dropAdapter.add(handler);
              imageUploadPlugin.pasteAdapter.add(handler);

              return imageUploadPlugin;
            }
          }),
          new Plugin(class BlockTypePluginDecorator {
            constructor(proseMirrorInstance) {
              const blockTypePlugin = new BlockTypePlugin(proseMirrorInstance);

              blockTypePlugin.onChange(state => {
                const blockType = state.selectedBlockType;
                const font = getFont({ blockType }, elem[$fonts]);

                elem[$selectedFont] = font;
                elem[$canChangeBlockType] = state.enabled;
              });

              elem[$blockTypePlugin] = blockTypePlugin;

              return blockTypePlugin;
            }
          }),
          new Plugin(class ListsPluginDecorator {
            constructor(proseMirrorInstance) {
              const listsPlugin = new ListsPlugin(proseMirrorInstance);

              listsPlugin.onChange(state => {
                elem[$bulletListActive] = state.active && state.type === 'bullet_list';
                elem[$numberListActive] = state.active && state.type === 'ordered_list';
              });

              elem[$listsPlugin] = listsPlugin;

              return listsPlugin;
            }
          }),
          new Plugin(class TextFormattingPluginDecorator {
            constructor(proseMirrorInstance) {
              const textFormattingPlugin = new TextFormattingPlugin(proseMirrorInstance);

              textFormattingPlugin.onChange(state => {
                elem[$strongActive] = state.strongActive;
                elem[$emActive] = state.emActive;
                elem[$underlineActive] = state.underlineActive;
                elem[$canChangeTextFormatting] = !state.enabled;
              });

              elem[$textFormattingPlugin] = textFormattingPlugin;

              return textFormattingPlugin;
            }
          }),
        ],
      });

      // avoid invoking keyboard shortcuts in BB
      pm.wrapper.addEventListener('keypress', e => e.stopPropagation());
      pm.wrapper.addEventListener('keydown', e => e.stopPropagation());

      // add the keymap
      pm.addKeymap(buildKeymap(pm.schema));

      // add paste handlers
      pm.on.transformPasted.add((slice) => markdownTransformer(pm.schema, slice));

      // add node life cycle handler
      pm.on.flush.add(() => nodeLifecycleHandler(pm));

      // 'change' event is public API
      pm.on.change.add(() => emit(this, events.change));

      this[$pm] = pm;
    },
  },
});

export { events };

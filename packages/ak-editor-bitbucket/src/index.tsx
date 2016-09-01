import './types';
import { define, prop, emit } from 'skatejs';
import invert from 'lodash.invert';
import { ProseMirror } from 'prosemirror/dist/edit';
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
} from 'ak-editor-plugin-image-upload';
import {
  default as TextFormattingPlugin,
  MarkType,
} from 'ak-editor-plugin-text-formatting';

const { vdom } = require('skatejs');

const $initEditor = '__init_editor__';
const $pm = '__pm__';
const $ready = '__ready__';
const $expanded = '__expanded__';
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
const $hyperLinkElement = '__hyperLinkElement__';
const $hyperLinkActive = '__hyperLinkActive__';
const $bulletListActive = '__bulletListActive__';
const $numberListActive = '__numberListActive__';

const functionProp = () => ({
  coerce: (val: any) => (typeof val === 'function' ? val : () => {}),
  default: null,
});

function bind(object: any, propName: string) {
  object[propName] = object[propName].bind(object);
}

const prosemirrorBlockToToolbarMap: {[key: string]: string} = {
  paragraph: 'normalText',
  // heading 1 (displayed in the blockType button) is actually heading 2
  // heading 1 is reserved and not used in the editor
  heading2: 'heading1',
  heading3: 'heading2',
  heading4: 'heading3',
  code_block: 'monospace',
};

const toolbarToProsemirrorMap = invert(prosemirrorBlockToToolbarMap);

function selectFont(elem: any) {
  return (event: any) => {
    const font = event.detail.font;

    const matches = toolbarToProsemirrorMap[font].match(/([a-zA-Z_]+)(\d*)/);
    const blockType = matches[1];
    const level = matches[2];

    BlockTypePlugin.get(elem[$pm]).changeBlockType(blockType, { level });
  };
}

function toggleMark(elem: any, name: MarkType) {
  return () => TextFormattingPlugin.get(elem[$pm]).toggleMark(name);
}

function toggleList(elem: any, name: ListType) {
  return () => ListsPlugin.get(elem[$pm]).toggleList(name);
}

function addHyperLink(hyperLinkPlugin) {
  return (event) => {
    const href = event.detail.value;
    hyperLinkPlugin.addLink({
      href,
    });
  };
}

function unlink(elem: any) {
  return () => HyperlinkPlugin.get(elem[$pm]).removeLink();
}

function changeHyperLinkValue(elem: any) {
  return (event: MouseEvent) => {
    const newLink = (event.target as any).value;
    if (newLink) {
      HyperlinkPlugin.get(elem[$pm]).updateLink({
        href: newLink,
        text: newLink,
      });
    }
  };
}

function toggleExpansion(elem) {
  return () => {
    elem[$expanded] = !elem[$expanded];
  };
}

export default define('ak-editor-bitbucket', {
  created(elem: any) {
    bind(elem, $onContentClick);
    bind(elem, 'focus');
  },

  rendered(elem: any) {
    if (elem[$expanded]) {
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

    const FullEditor = (<div>
      <Toolbar>
        <ToolbarBlockType
          disabled={!elem[$canChangeBlockType]}
          selectedFont={elem[$selectedFont]}
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
        : null
      }
      <Footer
        openTop
        onSave={toggleExpansion(elem)}
        oncancel={toggleExpansion(elem)}
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
        {elem[$expanded] ?
          <FullEditor />
          :
          <input
            placeholder={elem.defaultValue}
            onclick={toggleExpansion(elem)}
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

    /**
     * True if the editor has focus.
     * @private
     */
    [$focused]: prop.boolean(),
    [$expanded]: prop.boolean(),
    [$canChangeBlockType]: prop.boolean(),
    [$strongActive]: prop.boolean(),
    [$emActive]: prop.boolean(),
    [$underlineActive]: prop.boolean(),
    [$canChangeTextFormatting]: prop.boolean(),
    [$hyperLinkText]: prop.string(),
    [$selectedFont]: prop.string({ default: 'normalText' }),
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

    /**
     * Returns true if the editor is expanded for
     * interaction.
     * @returns {boolean}
     */
    get expanded() {
      return this[$expanded];
    },

    [$onContentClick](e: MouseEvent) {
      if (e.target === e.currentTarget) {
        this.focus();
      }
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
      const insertImage = (url: string) => ImageUploadPlugin.get(pm).addImage(url);
      const handler = (_: any, e: any) => elem.imageUploader(e, insertImage);
      ImageUploadPlugin.get(pm).dropAdapter.add(handler);
      ImageUploadPlugin.get(pm).pasteAdapter.add(handler);

      // Block type plugin wiring
      BlockTypePlugin.get(pm).onChange(state => {
        const name = state.selectedBlockType
        if (typeof name === 'string') {
          const blockType = prosemirrorBlockToToolbarMap[name] as string;
          elem[$selectedFont] = blockType;
          elem[$canChangeBlockType] = state.enabled;
        }
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
        elem[$canChangeTextFormatting] = !state.enabled;
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

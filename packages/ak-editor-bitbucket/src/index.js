import { vdom, define, prop, emit } from 'skatejs';
import { ProseMirror, Plugin } from 'prosemirror/dist/edit';
import 'style!./host.less';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import ToolbarBlockType from 'ak-editor-toolbar-block-type';
import ToolbarTextFormatting from 'ak-editor-toolbar-text-formatting';
import ToolbarHyperlink from 'ak-editor-toolbar-hyperlink';
import { Schema } from 'prosemirror/dist/model';
import { schema } from './schema';
import { buildKeymap } from './keymap';
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { nodeLifecycleHandler } from './node-lifecycle';
import { markdownTransformer } from './paste-handlers';

// editorKit plugings
import MarkdownInputRulesPlugin from 'atlassian-editorkit-markdown-inputrules-plugin';
import HyperLinkPlugin from 'atlassian-editorkit-hyperlink-plugin';
import ImageUploadPlugin from 'atlassian-editorkit-image-upload-plugin';

const $initEditor = '__init_editor__';
const $pm = '__pm__';
const $ready = '__ready__';
const $focused = '__focused__';
const $wrapper = '__wrapper__';
const $onContentClick = '__onContentClick__';

function bind(elem, propName) {
  elem[propName] = elem[propName].bind(elem);
}

export default define('ak-editor-bitbucket', {
  created(elem) {
    bind(elem, $onContentClick);
    bind(elem, 'focus');
  },

  rendered(elem) {
    if (!elem[$ready]) {
      elem[$ready] = true;
      elem[$initEditor]();
      emit(elem, 'ready');
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
          <ToolbarBlockType />
          <ToolbarTextFormatting />
          <ToolbarHyperlink />
        </Toolbar>
        <Content
          className={shadowStyles.locals.content}
          onclick={elem[$onContentClick]}
          ref={(wrapper) => { elem[$wrapper] = wrapper; }}
          openTop
          openBottom
          skip
        />
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

    /**
     * True if the editor has focus.
     * @private
     */
    [$focused]: prop.boolean(),
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
          new Plugin(HyperLinkPlugin),
          new Plugin(class ImageUploadPluginDecorator {
            constructor(proseMirrorInstance) {
              const imageUploadPlugin = new ImageUploadPlugin(proseMirrorInstance);

              imageUploadPlugin.dropAdapter.add((
                _pm,
                e
              ) => {
                if (typeof elem.imageUploader === 'function') {
                  elem.imageUploader(e, imageUploadPlugin.addImage.bind(imageUploadPlugin));
                }
              });

              imageUploadPlugin.pasteAdapter.add((
                _pm,
                e
              ) => {
                if (typeof elem.imageUploader === 'function') {
                  elem.imageUploader(e, imageUploadPlugin.addImage.bind(imageUploadPlugin));
                }
              });

              return imageUploadPlugin;
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
      pm.on.change.add(() => emit(this, 'change'));

      this[$pm] = pm;
    },
  },
});

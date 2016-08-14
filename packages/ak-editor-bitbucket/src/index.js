import { vdom, define, prop, symbols, emit } from 'skatejs';
import { ProseMirror, Plugin } from 'prosemirror/dist/edit';
import 'style!./host.less';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import ToolbarBlockType from 'ak-editor-toolbar-block-type';
import ToolbarTextFormatting from 'ak-editor-toolbar-text-formatting';
import ToolbarHyperlink from 'ak-editor-toolbar-hyperlink';
import { schema } from './schema';
import { inputRules } from './input-rules';
import { buildKeymap } from './keymap';
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { nodeLifecycleHandler } from './node-lifecycle';
import { hyperlinkTransformer, markdownTransformer } from './paste-handlers';
import BlockTypePlugin from 'atlassian-editorkit-block-type-plugin';
import invert from 'lodash.invert';

// A hack to target the content element until https://github.com/skatejs/skatejs/issues/721
// is fixed.
const contentClassName = `__content__${Date.now()}`;
const initEditorSymbol = '__init_editor__';
const pmSymbol = '__pm__';
const readySymbol = '__ready__';

const prosemirrorBlockToToolbarMap = {
  paragraph: 'normalText',
  // heading 1 (displayed in the blockType button) is actually heading 2
  // heading 1 is reserved and not used in the editor
  heading2: 'heading1',
  heading3: 'heading2',
  heading4: 'heading3',
  code_block: 'monospace',
};

const toolbarToProsemirrorMap = invert(prosemirrorBlockToToolbarMap);

export default define('ak-editor-bitbucket', {
  rendered(elem) {
    if (!elem[readySymbol]) {
      elem[readySymbol] = true;
      elem[initEditorSymbol]();
      emit(elem, 'ready');
    }
  },

  render(elem) {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <Toolbar>
          <ToolbarBlockType
            disabled={!elem.canChangeBlockType}
            selectedFont={elem.selectedFont}
            onSelectFont={(event) => {
              const font = event.detail.font;

              const matches = toolbarToProsemirrorMap[font].match(/([a-zA-Z_]+)(\d*)/);
              const blockType = matches[1];
              const level = matches[2];

              this.blockTypePluginInstance.changeBlockType(blockType, { level });
            }}
          />
          <ToolbarTextFormatting />
          <ToolbarHyperlink />
        </Toolbar>
        <Content
          className={contentClassName}
          openTop
          openBottom
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
    canChangeBlockType: prop.boolean(),
    selectedFont: prop.string({ default: 'normalText' }),
  },

  prototype: {
    /**
     * Focus the editor.
     */
    focus() {
      const pm = this[pmSymbol];
      pm.focus();
    },

    /**
     * Clear the content of the editor, making it an empty document.
     */
    clear() {
      const pm = this[pmSymbol];
      pm.tr.delete(0, pm.doc.content.size).apply();
    },

    /**
     * Return the current markdown value from the editor.
     * @returns {string}
     */
    get value() {
      const pm = this[pmSymbol];
      return markdownSerializer.serialize(pm.doc);
    },

    /**
     * Returns true if the editor has been initialised and is ready for
     * interaction.
     * @returns {boolean}
     */
    get ready() {
      return this[readySymbol] || false;
    },

    [initEditorSymbol]() {
      const contentElement = this[symbols.shadowRoot].querySelector(`.${contentClassName}`);
      let blockTypePluginInstance;
      const pm = new ProseMirror({
        place: contentElement,
        doc: markdownParser(schema).parse(this.defaultValue),
        plugins: [
          inputRules,
          new Plugin(
            class BlockTypePluginDecorator {
              constructor(_pm) {
                blockTypePluginInstance = new BlockTypePlugin(_pm);
                return blockTypePluginInstance;
              }
            }
          ),
        ],
      });

      blockTypePluginInstance.onChange(state => {
        const name = state.selectedBlockType;
        const blockType = prosemirrorBlockToToolbarMap[name];

        this.selectedFont = blockType;
        this.canChangeBlockType = state.enabled;
      });

      this.blockTypePluginInstance = blockTypePluginInstance;

      // avoid invoking keyboard shortcuts in BB
      pm.wrapper.addEventListener('keypress', e => e.stopPropagation());
      pm.wrapper.addEventListener('keydown', e => e.stopPropagation());

      // add the keymap
      pm.addKeymap(buildKeymap(pm.schema));

      // add paste handlers
      pm.on.transformPasted.add(() => markdownTransformer(pm.schema));
      pm.on.transformPasted.add(() => hyperlinkTransformer(pm));

      // add node life cycle handler
      pm.on.flush.add(() => nodeLifecycleHandler(pm));

      // 'change' event is public API
      pm.on.change.add(() => emit(this, 'change'));

      this[pmSymbol] = pm;
    },
  },
});

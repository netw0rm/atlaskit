import { vdom, define, prop, symbols, emit } from 'skatejs';
import { ProseMirror } from 'prosemirror/dist/edit';
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

// A hack to target the content element until https://github.com/skatejs/skatejs/issues/721
// is fixed.
const contentClassName = `__content__${Date.now()}`;
const initEditorSymbol = '__init_editor__';
const pmSymbol = '__pm__';
const readySymbol = '__ready__';

export default define('ak-editor-bitbucket', {
  rendered(elem) {
    if (!elem[readySymbol]) {
      elem[readySymbol] = true;
      elem[initEditorSymbol]();
      emit(elem, 'ready');
    }
  },

  render() {
    return (
      <div className={shadowStyles.locals.root}>
        <style>{shadowStyles.toString()}</style>
        <Toolbar>
          <ToolbarBlockType />
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
      const pm = new ProseMirror({
        place: contentElement,
        doc: markdownParser(schema).parse(this.defaultValue),
        plugins: [inputRules],
      });

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

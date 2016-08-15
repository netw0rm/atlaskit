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

  render(elem) {
    return (
      <div>
        <div class="prosemirror" />
        <button onclick={() => elem.abc = 'foo'}>foo</button>
      </div>
    );
  },

  props: {
    abc: prop.string({ attribute: true }),
  },

  prototype: {
    [initEditorSymbol]() {
      const contentElement = this[symbols.shadowRoot].querySelector(`.prosemirror`);
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
    },
  },
});

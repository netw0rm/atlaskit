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

      const img = document.createElement('img');
      img.src = 'https://design.atlassian.com/images/brand/logo-21.png';
      elem.querySelector('.modify-me').appendChild(img);
    }
  },

  render(elem) {
    return (
      <div>
        <div skip>
          <div class="prosemirror" />
          {/* <input />
          <iframe src="http://w3schools.com" /> */}
          <div class="modify-me" skip></div>
        </div>
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

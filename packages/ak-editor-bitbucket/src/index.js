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
import { buildKeymap } from './keymap';
import { markdownParser } from './markdown-parser';
import { markdownSerializer } from './markdown-serializer';
import { nodeLifecycleHandler } from './node-lifecycle';
import { hyperlinkTransformer, markdownTransformer } from './paste-handlers';
import BlockTypePlugin from 'atlassian-editorkit-block-type-plugin';
import invert from 'lodash.invert';

const readySymbol = '__ready__';

export default define('ak-editor-bitbucket', {
  rendered(elem) {
    if (!elem[readySymbol]) {
      elem[readySymbol] = true;

      const img = document.createElement('img');
      img.src = 'https://design.atlassian.com/images/brand/logo-21.png';
      elem[symbols.shadowRoot].querySelector('.modify-me').appendChild(img);
    }
  },

  render(elem) {
    return (
      <div>
        <div>
          <div class="modify-me" skip></div>
        </div>
        <button onclick={() => elem.abc = 'foo'}>foo</button>
      </div>
    );
  },

  props: {
    abc: prop.string({ attribute: true }),
  },
});

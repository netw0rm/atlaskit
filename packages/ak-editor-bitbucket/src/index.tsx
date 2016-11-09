import './types';
import autobind from 'autobind-decorator';
import * as events from './internal/events';
import { define, prop, emit, Component } from 'skatejs';
import { ProseMirror, Schema } from 'ak-editor-prosemirror';
import 'style!./host.less';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import HyperlinkEdit from 'ak-editor-hyperlink-edit';
import ToolbarBlockType from 'ak-editor-toolbar-block-type';
import ToolbarLists from 'ak-editor-toolbar-lists';
import ToolbarTextFormatting from 'ak-editor-toolbar-text-formatting';
import ToolbarHyperlink from 'ak-editor-toolbar-hyperlink';
import schema from './schema';
import { buildKeymap } from './keymap';
import markdownSerializer from './markdown-serializer';
import BlockTypePlugin from 'ak-editor-plugin-block-type';
import { blockTypes, blockTypeType, blockTypesType } from './block-types';
import parseHtml from './parse-html';

import {
  default as ListsPlugin,
  ListType,
} from 'ak-editor-plugin-lists';
import MarkdownInputRulesPlugin from 'ak-editor-plugin-markdown-inputrules';
import {
  default as HyperlinkPlugin,
} from 'ak-editor-plugin-hyperlink';
import {
  default as ImageUploadPlugin,
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

type getBlockTypeType = { blockType?: string, blockName?: string };

function getBlockType({ blockType, blockName }: getBlockTypeType, blockTypes: blockTypesType): blockTypeType | void {
  let len = blockTypes.length;
  while (--len >= 0) {
    const bt = blockTypes[len];
    if (bt.name === blockName ||
      (bt.schemaName + (bt.level ? bt.level : '')) === blockType) {
      return bt;
    }
  }
}

function stopEventPropagation(event: Event) : void {
  event.stopPropagation();
}

interface formattingMap {
  [propName: string]: MarkType;
}

const formattingToProseMirrorMark: formattingMap = {
  bold: 'strong',
  italic: 'em',
  code: 'code',
};

@autobind
class AkEditorBitbucket extends Component {
  // public state
  defaultValue: string;
  placeholder: string;
  imageUploader: Function;
  context: string;
  outterCheck: boolean;

  // private state
  _focused: boolean;
  _canChangeBlockType: boolean;
  _strongActive: boolean;
  _emActive: boolean;
  _underlineActive: boolean;
  _codeActive: boolean;
  _canChangeTextFormatting: boolean;
  _hyperlinkHref: string;
  _selectedBlockType: any;
  _hyperlinkElement: HTMLElement | undefined;
  innerCheck: boolean;
  _canLinkHyperlink: boolean;
  _bulletlistDisabled: boolean;
  _numberlistDisabled: boolean;
  _bulletListActive: boolean;
  _numberListActive: boolean;

  // internal
  _blockTypes: blockTypeType[];
  _justToggledExpansion: boolean;
  _pm?: ProseMirror;
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
      outterCheck: prop.boolean({ attribute: true }),

      /**
       * True if the editor has focus.
       * @private
       */
      _focused: prop.boolean(),
      _canChangeBlockType: prop.boolean(),
      _strongActive: prop.boolean(),
      _emActive: prop.boolean(),
      _underlineActive: prop.boolean(),
      _codeActive: prop.boolean(),
      _canChangeTextFormatting: prop.boolean(),
      _hyperlinkHref: prop.string(),
      _selectedBlockType: {},
      _hyperlinkElement: {},
      innerCheck: prop.boolean(),
      _canLinkHyperlink: prop.boolean(),
      _bulletlistDisabled: prop.boolean(),
      _numberlistDisabled: prop.boolean(),
      _bulletListActive: prop.boolean(),
      _numberListActive: prop.boolean(),
    };
  }

  static rendered(elem: AkEditorBitbucket) : void {
    if (elem.outterCheck && !elem._pm) {
      elem._initEditor();
      (elem._pm as any).focus();
    } else if (!elem.outterCheck) {
      elem._pm = undefined;
    }
  }

  static render(elem: AkEditorBitbucket) {
    let fakeInputClassNames = shadowStyles.locals['fakeInput'];

    if (elem.context === 'comment') {
      fakeInputClassNames += ` ${shadowStyles.locals['comment']}`;
    }

    if (elem.context && blockTypes[elem.context]) {
      elem._blockTypes = blockTypes[elem.context];
    } else {
      elem._blockTypes = blockTypes._defaultContext;
    }

    let inner = null;

    let innerDIV = null;
    if (elem.innerCheck) {
      innerDIV = <div>inner DIV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</div>
    }

    if (elem.outterCheck) {
      inner = <div>
      <input type="checkbox" onChange={(event) => {
        elem.innerCheck = !elem.innerCheck;
      }} />
      {innerDIV}
    </div>
    }

    return (
      <div>
        <input type="checkbox" onChange={(event) => {
          elem.outterCheck = !elem.outterCheck;
        }} />
        {inner}
      </div>
    );
  }

  _initEditor() {
    this.addEventListener('blur', () => { this._focused = false; });
    this.addEventListener('focus', () => { this._focused = true; });

    const pm = new ProseMirror({
      place: this._wrapper,
      doc: parseHtml(this.defaultValue),
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

    this._pm = pm;
  }
}

export default define('ak-editor-bitbucket', AkEditorBitbucket);
export { events };

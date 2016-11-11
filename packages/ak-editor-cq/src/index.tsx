import './types';
import * as events from './internal/events';
import { define, prop, emit, Component } from 'skatejs';
import { ProseMirror, Schema } from 'ak-editor-prosemirror';
import 'style!./host.less';
import cx from 'classnames';
import shadowStyles from './shadow.less';
import { Content, Footer, Toolbar, ToolbarBlockType, ToolbarLists,
  ToolbarTextFormatting } from 'ak-editor-ui';
import schema from './schema';
import { parse, encode } from './cxhtml';
import { buildKeymap } from './keymap';
import { BlockTypePlugin } from 'ak-editor-plugin-block-type';
import ListsPlugin from 'ak-editor-plugin-lists';
import TextFormattingPlugin from 'ak-editor-plugin-text-formatting';

// typescript removes unused var if we import it :(
const { vdom } = require('skatejs');

const functionProp = () => ({
  coerce: (val: any) => (typeof val === 'function' ? val : () => {}),
  default: null,
});

function stopEventPropagation(event: Event) {
  event.stopPropagation();
}

const formattingToProseMirrorMark = {
  bold: 'strong',
  italic: 'em',
  code: 'code',
};

export default class Editor extends Component {
  defaultValue: string;
  placeholder: string;
  context: string;
  expanded: boolean;
  noActions: boolean;
  _pm?: ProseMirror;
  shadowRoot: ShadowRoot;

  private _wrapper?: HTMLElement;
  private _ready: boolean = false;
  private _focused: boolean;
  private _strongActive: boolean;
  private _emActive: boolean;
  private _underlineActive: boolean;
  private _codeActive: boolean;
  private _canChangeTextFormatting: boolean;
  private _bulletlistDisabled: boolean;
  private _numberlistDisabled: boolean;
  private _bulletListActive: boolean;
  private _numberListActive: boolean;
  private _triggerRender: boolean;

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
      defaultValue: prop.string({ default: '' }),
      placeholder: prop.string({ default: '' }),
      context: prop.string({ default: '' }),
      expanded: prop.boolean(),
      noActions: prop.boolean({ default: false }),

      /**
       * True if the editor has focus.
       * @private
       */
      _focused: prop.boolean(),
      _strongActive: prop.boolean(),
      _emActive: prop.boolean(),
      _underlineActive: prop.boolean(),
      _codeActive: prop.boolean(),
      _canChangeTextFormatting: prop.boolean(),
      _bulletlistDisabled: prop.boolean(),
      _numberlistDisabled: prop.boolean(),
      _bulletListActive: prop.boolean(),
      _numberListActive: prop.boolean(),
      _triggerRender: prop.boolean()
    };
  }

  static created(elem: Editor) {
    elem.focus = elem.focus.bind(elem);
    elem.clear = elem.clear.bind(elem);
    elem.isEmpty = elem.isEmpty.bind(elem);
    elem._expand = elem._expand.bind(elem);
    elem._onContentClick = elem._onContentClick.bind(elem);
    elem._toggleMark = elem._toggleMark.bind(elem);
    elem._toggleList = elem._toggleList.bind(elem);
    elem._initEditor = elem._initEditor.bind(elem);
  }

  static rendered(elem: Editor) {
    if (elem.expanded && elem._wrapper && !elem._pm) {
      elem._initEditor();
      if (!elem._ready) {
        emit(elem, 'ready');
        elem._ready = true;
      }

      elem.focus();
    } else if (!elem.expanded) {
      elem._pm = undefined;
    }
  }

  static attached(elem: Editor) {
    // Prevent any keyboard events from bubbling outside of the editor chrome
    elem.addEventListener('keydown', stopEventPropagation);
    elem.addEventListener('keyup', stopEventPropagation);
    elem.addEventListener('keypress', stopEventPropagation);
  }

  static detached(elem: Editor) {
    elem.removeEventListener('keydown', stopEventPropagation);
    elem.removeEventListener('keyup', stopEventPropagation);
    elem.removeEventListener('keypress', stopEventPropagation);
  }

  static render(elem: Editor) {
    const pm = elem._pm;
    let fakeInputClassNames = shadowStyles.locals.fakeInput;

    if (elem.context === 'comment') {
      fakeInputClassNames += ` ${shadowStyles.locals.comment}`;
    }

    const fullEditor = (<div>
      <Toolbar className={shadowStyles.locals.toolbar}>
        {pm ? <ToolbarBlockType plugin={BlockTypePlugin.get(pm)} /> : null}

        <ToolbarTextFormatting
          boldActive={elem._strongActive}
          italicActive={elem._emActive}
          underlineActive={elem._underlineActive}
          codeActive={elem._codeActive}
          boldDisabled={!elem._canChangeTextFormatting}
          italicDisabled={!elem._canChangeTextFormatting}
          underlineDisabled={!elem._canChangeTextFormatting}
          codeDisabled={!elem._canChangeTextFormatting}
          underlineHidden
          onToggletextformatting={elem._toggleMark}
        />
        <ToolbarLists
          bulletlistDisabled={elem._bulletlistDisabled}
          numberlistDisabled={elem._numberlistDisabled}
          bulletlistActive={elem._bulletListActive}
          numberlistActive={elem._numberListActive}
          on-toggle-number-list={() => elem._toggleList('ordered_list')}
          on-toggle-bullet-list={() => elem._toggleList('bullet_list')}
        />
      </Toolbar>
      <Content
        className={shadowStyles.locals.content}
        onclick={elem._onContentClick}
        ref={(wrapper: any) => { elem._wrapper = wrapper; }}
        openTop
        openBottom
        skip
      />
      <Footer
        openTop
        hide-buttons={elem.noActions}
      />
    </div>);

    return (
      <div
        className={
          cx(shadowStyles.locals.root, {
            [shadowStyles.locals.focused]: elem._focused,
          })
        }
      >
        <style>{shadowStyles.toString()}</style>
        {elem.expanded ?
          fullEditor
          :
          <input
            placeholder={elem.placeholder}
            onfocus={elem._expand}
            className={fakeInputClassNames}
          />
        }
      </div>
    );
  }

  /**
   * Focus the content region of the editor.
   */
  focus() {
    if (this._pm) {
      this._pm.focus();
    }
  }

  /**
   * Clear the content of the editor, making it an empty document.
   */
  clear() {
    if (this._pm) {
      this._pm.tr.delete(0, this._pm.doc.content.size).apply();
    }
  }

  /**
   * Returns true if the editor has been initialised and is ready for
   * interaction.
   */
  get ready() {
    return this._ready || false;
  }

  /**
   * Check if the current editor's value is empty - an empty value includes one or more empty paragraphs.
   */
  isEmpty() {
    if (!this._pm || !this._pm.doc) {
      throw 'Unable to check if editor is empty before it is initialized';
    }

    return !this._pm.doc.textContent;
  }

  _expand() {
    this.expanded = true;
  }

  _onContentClick(e: any) {
    if (e.target === e.currentTarget) {
      this.focus();
    }
  }

  _toggleMark(event: any) {
    const mark = (formattingToProseMirrorMark as any)[event.detail.mark];

    if (this._pm) {
      TextFormattingPlugin.get(this._pm).toggleMark(mark);
    }
  }

  _toggleList(name: string) {
    if (this._pm) {
      ListsPlugin.get(this._pm).toggleList(name as 'bullet_list' | 'ordered_list');
    }
  }

  _initEditor() {
    this.addEventListener('blur', () => { this._focused = false; });
    this.addEventListener('focus', () => { this._focused = true; });

    const pm = new ProseMirror({
      place: this._wrapper,
      doc: parse(this.defaultValue),
      plugins: [
        BlockTypePlugin,
        ListsPlugin,
        TextFormattingPlugin,
      ],
    });

    // Lists
    ListsPlugin.get(pm).subscribe(state => {
      this._bulletListActive = Boolean(state.active && state.type === 'bullet_list');
      this._numberListActive = Boolean(state.active && state.type === 'ordered_list');

      this._bulletlistDisabled = !Boolean(state.enabled);
      this._numberlistDisabled = !Boolean(state.enabled);
    });

    // Text formatting
    TextFormattingPlugin.get(pm).subscribe(state => {
      this._strongActive = state.strongActive;
      this._emActive = state.emActive;
      this._underlineActive = state.underlineActive;
      this._codeActive = state.codeActive;
      this._canChangeTextFormatting = !state.disabled;
    });

    // avoid invoking keyboard shortcuts in BB
    pm.wrapper.addEventListener('keypress', e => e.stopPropagation());
    pm.wrapper.addEventListener('keydown', e => e.stopPropagation());

    // add the keymap
    pm.addKeymap(buildKeymap(pm.schema));

    // 'change' event is public API
    pm.on.change.add(() => emit(this, 'change'));

    this._pm = pm;
    setTimeout(() => { this._triggerRender = !this._triggerRender });
  }

  /**
   * Return the current CXHTML value from the editor.
   * @returns {string}
   */
  get value() {
    if (this._pm) {
      return encode(this._pm.doc)
        .replace(/ ?xmlns="[^"]+"/g, '');
    }
    return this.defaultValue;
  }
}

define('ak-editor-cq', Editor);
export { events };

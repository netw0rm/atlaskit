import { vdom, define, prop, symbols, emit } from 'skatejs';
import invert from 'lodash.invert';
import { ProseMirror, Plugin } from 'prosemirror/dist/edit';
import 'style!./host.less';
import shadowStyles from './shadow.less';
import Content from 'ak-editor-content';
import Footer from 'ak-editor-footer';
import Toolbar from 'ak-editor-toolbar';
import HyperLink from 'ak-editor-hyperlink-edit';
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
import BlockTypePlugin from 'atlassian-editorkit-block-type-plugin';
import MarkdownInputRulesPlugin from 'atlassian-editorkit-markdown-inputrules-plugin';
import HyperLinkPlugin from 'atlassian-editorkit-hyperlink-plugin';
import ImageUploadPlugin from 'atlassian-editorkit-image-upload-plugin';
import TextFormattingPlugin from 'atlassian-editorkit-text-formatting-plugin';

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

function selectFont(blockTypePlugin) {
  return (event) => {
    const font = event.detail.font;

    const matches = toolbarToProsemirrorMap[font].match(/([a-zA-Z_]+)(\d*)/);
    const blockType = matches[1];
    const level = matches[2];

    blockTypePlugin.changeBlockType(blockType, { level });
  };
}

function toggleMark(textFormattingPlugin, name) {
  return () => {
    textFormattingPlugin.toggleMark(name);
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
            onSelectFont={selectFont(elem.blockTypePlugin)}
          />
          <ToolbarTextFormatting
            boldActive={elem.strongActive}
            italicActive={elem.emActive}
            underlineActive={elem.underlineActive}
            boldDisabled={elem.textFormattingDisabled}
            italicDisabled={elem.textFormattingDisabled}
            underlineDisabled={elem.textFormattingDisabled}
            onToggle-bold={toggleMark(elem.textFormattingPlugin, 'bold')}
            onToggle-italic={toggleMark(elem.textFormattingPlugin, 'italic')}
            onToggle-underline={toggleMark(elem.textFormattingPlugin, 'underline')}
          />
          <ToolbarHyperlink />
        </Toolbar>
        <div skip={elem[readySymbol]}>
          <Content
            className={contentClassName}
            openTop
            openBottom
          />
        </div>
        {elem.hyperLinkActive ?
          <HyperLink
            href={elem.hyperLinkText}
            textInputValue={elem.hyperLinkText}
            attachTo={elem.hyperLinkElement}
            onUnlink={unlink(elem.hyperLinkPlugin)}
            onchange={changeHyperLinkValue(elem.hyperLinkPlugin)}
          /> :
          null}
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
      const elem = this;
      const contentElement = elem[symbols.shadowRoot].querySelector(`.${contentClassName}`);

      schema.nodes.code_block.group += ` ${HyperLinkPlugin.DISABLED_GROUP}`;
      schema.nodes.code_block.group += ` ${ImageUploadPlugin.DISABLED_GROUP}`;

      const pm = new ProseMirror({
        place: contentElement,
        doc: markdownParser(new Schema(schema)).parse(elem.defaultValue),
        plugins: [
          new Plugin(MarkdownInputRulesPlugin),
          new Plugin(class HyperLinkPluginDecorator {
            constructor(proseMirrorInstance) {
              const hyperLinkPlugin = new HyperLinkPlugin(proseMirrorInstance);

              hyperLinkPlugin.onChange(state => {
                elem.hyperLinkActive = state.active;
                elem.hyperLinkElement = state.element;
                elem.hyperLinkText = state.text;
              });

              elem.hyperLinkPlugin = hyperLinkPlugin;

              return hyperLinkPlugin;
            }
          }),
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
          new Plugin(class BlockTypePluginDecorator {
            constructor(proseMirrorInstance) {
              const blockTypePlugin = new BlockTypePlugin(proseMirrorInstance);

              blockTypePlugin.onChange(state => {
                const name = state.selectedBlockType;
                const blockType = prosemirrorBlockToToolbarMap[name];

                elem.selectedFont = blockType;
                elem.canChangeBlockType = state.enabled;
              });

              elem.blockTypePlugin = blockTypePlugin;

              return blockTypePlugin;
            }
          }),
          new Plugin(class TextFormattingPluginDecorator {
            constructor(proseMirrorInstance) {
              const textFormattingPlugin = new TextFormattingPlugin(proseMirrorInstance);

              textFormattingPlugin.onChange(state => {
                elem.strongActive = state.strongActive;
                elem.emActive = state.emActive;
                elem.underlineActive = state.underlineActive;
                elem.textFormattingDisabled = state.enabled;
              });

              elem.textFormattingPlugin = textFormattingPlugin;

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
      pm.on.change.add(() => emit(this, 'change'));

      this[pmSymbol] = pm;
    },
  },
});

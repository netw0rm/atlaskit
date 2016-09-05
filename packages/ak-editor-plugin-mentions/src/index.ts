import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { InputRule, inputRules } from 'prosemirror/dist/inputrules';

import { mentionRule, emoticonRule } from './input-rules';

class MentionsPluginState {
  pm: ProseMirror;
  renderHandler: (el: HTMLElement, pm: ProseMirror) => void
  autocompleteHandler: (el: HTMLElement, pm: ProseMirror) => void

  constructor(pm: ProseMirror) {
    this.pm = pm;

    // add the input rules to insert mentions and emoticons
    if (this.pm.schema.nodes.mention) {
      [ mentionRule, emoticonRule ].forEach((rule) => {
        inputRules.ensure(pm).addRule(rule);
      });
    }

    this.pm.on.flush.add(() => this.hydrateNodes());
  }

  hydrateNodes(): void {
    const pm = this.pm;
    const wrapper = pm.wrapper;
    const elements = wrapper.querySelectorAll('[editor-hydrate]');

    if (!elements.length) {
      return
    }

    Array.prototype.forEach.call(elements, (el: HTMLElement) => {
      el.removeAttribute('editor-hydrate');

      const nodeType = el.getAttribute('editor-node-type');
      if (nodeType === 'mention') {
        const data = el.getAttribute('editor-data');

        // if theres data set, render the element
        // otherwise prompt for autocomplete.
        if (data && data.length) {
          this.renderHandler(el, pm);
        } else {
          this.autocompleteHandler(el, pm);
        }
      }
    });
  }
}

export default new Plugin(MentionsPluginState);

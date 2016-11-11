import { Plugin, ProseMirror, inputRules } from 'ak-editor-prosemirror';

import { mentionRule } from './input-rules';

class MentionsPluginState {
  pm: ProseMirror;
  renderHandler: (el: HTMLElement, pm: ProseMirror) => void;
  autocompleteHandler: (el: HTMLElement, pm: ProseMirror) => void;

  constructor(pm: ProseMirror) {
    this.pm = pm;

    // add the input rules to insert mentions and emoticons
    if (this.pm.schema.nodes.mention) {
      inputRules.ensure(pm).addRule(mentionRule);
    }

    this.pm.on.flush.add(() => this.hydrateNodes());
  }

  hydrateNodes(): void {
    const pm = this.pm;
    const wrapper = pm.wrapper;
    const elements = wrapper.querySelectorAll('[editor-entity-type]');

    if (!elements.length) {
      return
    }

    Array.prototype.forEach.call(elements, (el: HTMLElement) => {
      const hydrated = el.getAttribute('editor-hydrated');
      const entityType = el.getAttribute('editor-entity-type');
      if (!hydrated && entityType === 'mention') {
        el.setAttribute('editor-hydrated', 'true');
        const data = el.getAttribute('editor-entity-id');

        // if theres data set, render the element
        // otherwise prompt for autocomplete.
        if (data && data.length) {
          this.renderHandler && this.renderHandler(el, pm);
        } else {
          this.autocompleteHandler && this.autocompleteHandler(el, pm);
        }
      }
    });
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(MentionsPluginState, 'name', { value: 'MentionsPluginState' });

export default new Plugin(MentionsPluginState);

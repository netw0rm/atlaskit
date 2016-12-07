import { Plugin, ProseMirror, inputRules, TextSelection, Keymap } from 'ak-editor-prosemirror';

import { mentionQueryRule } from './input-rules';
import { MentionQueryMarkType } from 'ak-editor-schema';

const mentionQueryMarkName = 'mention_query';
const mentionNodeName = 'mention';

export type StateChangeHandler = (state: MentionsPluginState) => any;

export class MentionsPluginState {
  private pm: ProseMirror;
  private hasKeymap = false;
  private changeHandlers: StateChangeHandler[] = [];

  renderHandler: (el: HTMLElement, pm: ProseMirror) => void;
  autocompleteHandler: (el: HTMLElement, pm: ProseMirror) => void;
  query?: string;
  queryActive = false;
  anchorElement?: HTMLElement;
  keymap: Keymap;
  onSelectPrevious = () => {};
  onSelectNext =  () => {};
  onSelectCurrent = () => {};

  constructor(pm: ProseMirror) {
    this.pm = pm;

    this.keymap = new Keymap({
      Up: () => this.onSelectPrevious(),
      Down: () => this.onSelectNext(),
      Enter: () => this.onSelectCurrent(),
      Esc: () => this.dismiss(),
    }, {
      name: 'mentions-plugin-keymap'
    });

    // add the input rules to insert mentions and emoticons
    if (pm.schema.nodes.mention) {
      inputRules.ensure(pm).addRule(mentionQueryRule);
    }

    if (pm.schema.marks.mention_query) {
      pm.updateScheduler([
        pm.on.selectionChange,
        pm.on.change,
        pm.on.activeMarkChange,
      ], () => this.update());
    }
  }

  private update(): void {
    let dirty = false;

    let marks = this.pm.activeMarks();
    if (this.pm.schema.marks[mentionQueryMarkName].isInSet(marks)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const nodeBefore = this.pm.selection.$from.nodeBefore;
      const nodeAfter = this.pm.selection.$from.nodeAfter;

      const newQuery = (nodeBefore ? nodeBefore.textContent : '' ).substr(1) + (nodeAfter && this.pm.schema.marks[mentionQueryMarkName].isInSet(nodeAfter.marks) ? nodeAfter.textContent : '');
      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;

      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = this.pm.wrapper.querySelector('[data-mention-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (dirty) {
      if (this.queryActive) {
        if (!this.hasKeymap) {
          this.pm.addKeymap(this.keymap);
          this.hasKeymap = true;
        }
      } else {
        if (this.hasKeymap) {
          this.pm.removeKeymap(this.keymap);
          this.hasKeymap = false;
        }
      }
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  dismiss() {
    let sel = this.pm.selection;
    this.queryActive = false;
    this.query = undefined;

    this.pm.tr.removeMark(0, this.pm.doc.nodeSize - 2, this.pm.schema.marks[mentionQueryMarkName]).applyAndScroll();

    if (this.hasKeymap) {
      this.pm.removeKeymap(this.keymap);
      this.hasKeymap = false;
    }
    this.changeHandlers.forEach(cb => cb(this));
  }

  findMentionQueryMark() {
    let start = this.pm.selection.from;
    let node = this.pm.doc.nodeAt(start);

    while (start > 0 && (!node || !this.pm.schema.marks[mentionQueryMarkName].isInSet(node.marks))) {
      start--;
      node = this.pm.doc.nodeAt(start);
    }

    let end = start;

    if (node && this.pm.schema.marks[mentionQueryMarkName].isInSet(node.marks)) {
      start = this.pm.doc.resolve(start).start(2) - 1;
      end = this.pm.doc.resolve(start).end(1);
    }

    return { start, end };
  }

  insertMention(mention: Mention) {
    if (!mention) {
      return;
    }

    if (this.pm.schema.nodes[mentionNodeName]) {
      const { start, end } = this.findMentionQueryMark();
      const node = this.pm.schema.nodes[mentionNodeName as any].create({ displayName: `@${mention.name}`, id: `@${mention.mentionName}` });
      this.pm.tr.delete(start, end).insert(start, node).apply();
    } else {
      this.dismiss();
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(MentionsPluginState, 'name', { value: 'MentionsPluginState' });

export default new Plugin(MentionsPluginState);

interface Mention {
  name: string;
  mentionName: string;
}
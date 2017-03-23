import Keymap from 'browserkeymap';
import { inputRules, Fragment, Plugin, ProseMirror, Schema, Text } from '../../prosemirror';

import {
  MentionNodeType,
  MentionQueryMarkType
} from '../../schema';

import { mentionQueryRule } from './input-rules';

export type StateChangeHandler = (state: MentionsPluginState) => any;

export class MentionsPluginState {
  private pm: PM;
  private hasKeymap = false;
  private changeHandlers: StateChangeHandler[] = [];

  query?: string;
  queryActive = false;
  anchorElement?: HTMLElement;
  keymap: Keymap;
  onSelectPrevious = () => { };
  onSelectNext = () => { };
  onSelectCurrent = () => { };
  onTrySelectCurrent = (): boolean => { return false; };

  constructor(pm: PM) {
    this.pm = pm;

    this.keymap = new Keymap({
      Up: () => this.onSelectPrevious(),
      Down: () => this.onSelectNext(),
      Enter: () => this.onSelectCurrent(),
      Tab: () => this.onSelectCurrent(),
      Space: () => this.onTrySelectCurrent(),
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

    const marks = this.pm.activeMarks();
    if (this.pm.schema.marks.mention_query.isInSet(marks)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const nodeBefore = this.pm.selection.$from.nodeBefore;
      const nodeAfter = this.pm.selection.$from.nodeAfter;

      const newQuery = (nodeBefore ? nodeBefore.textContent : '').substr(1) + (nodeAfter && this.pm.schema.marks.mention_query.isInSet(nodeAfter.marks) ? nodeAfter.textContent : '');
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
          this.pm.addKeymap(this.keymap, 100);
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
    this.queryActive = false;
    this.query = undefined;

    this.pm.tr.removeMark(0, this.pm.doc.nodeSize - 2, this.pm.schema.marks.mention_query).applyAndScroll();

    if (this.hasKeymap) {
      this.pm.removeKeymap(this.keymap);
      this.hasKeymap = false;
    }
    this.changeHandlers.forEach(cb => cb(this));
  }

  findMentionQueryMark() {
    let start = this.pm.selection.from;
    let node = this.pm.doc.nodeAt(start);

    while (start > 0 && (!node || !this.pm.schema.marks.mention_query.isInSet(node.marks))) {
      start--;
      node = this.pm.doc.nodeAt(start);
    }

    let end = start;

    if (node && this.pm.schema.marks.mention_query.isInSet(node.marks)) {
      const resolvedPos = this.pm.doc.resolve(start);
      // -1 is to include @ in replacement
      // resolvedPos.depth + 1 to make mentions work inside other blocks e.g. "list item" or "blockquote"
      start = resolvedPos.start(resolvedPos.depth + 1) - 1;
      end = start + node.nodeSize;
    }

    return { start, end };
  }

  insertMention(mentionData?: Mention) {
    const { mention, text } = this.pm.schema.nodes;

    if (mention && mentionData) {
      const { start, end } = this.findMentionQueryMark();
      const node = mention.create({ displayName: `@${mentionData.name}`, id: mentionData.id });
      const textNode = text.create({}, ' ');
      const fragment = new Fragment([node, textNode], node.nodeSize + textNode.nodeSize);
      this.pm.tr.delete(start, end).insert(start, fragment).apply();
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

export interface Mention {
  name: string;
  mentionName: string;
  id: string;
}

export interface S extends Schema {
  nodes: {
    mention?: MentionNodeType
    text: Text;
  };

  marks: {
    mention_query: MentionQueryMarkType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

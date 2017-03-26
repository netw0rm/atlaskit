import Keymap from 'browserkeymap';
import * as keymaps from '../../keymaps';
import { trackAndInvoke } from '../../analytics';
import {
  commands,
  Plugin,
  ProseMirror,
  Schema,
  MarkType,
} from '../../prosemirror';
import {
  BlockQuoteNodeType,
  CodeBlockNodeType,
  HardBreakNodeType,
  HeadingNodeType,
  LinkMarkType,
  PanelNodeType,
  ParagraphNodeType,
  EmMarkType,
  CodeMarkType,
  StrikeMarkType,
  StrongMarkType,
  UnderlineMarkType,
  isParagraphNode,
} from '../../schema';
import { setSelectionToNormalText, liftSelectionBlocks } from '../../utils';

export class ClearFormattingState {
  private pm: PM;
  private markTypes = ['em', 'code', 'strike', 'strong', 'u', 'link'];
  private activeMarkTypes: string[];
  private changeHandlers: ClearFormattingStateSubscriber[] = [];

  formattingIsPresent: boolean = false;

  constructor(pm: PM) {
    this.pm = pm;

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());

    this.pm.addKeymap(new Keymap({
      [keymaps.clearFormatting.common!]: trackAndInvoke('atlassian.editor.format.clear.keyboard', this.clearFormatting),
    }));

    this.update();
  }

  subscribe(cb: ClearFormattingStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: ClearFormattingStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  clearFormatting = () => {
    const { pm } = this;
    setSelectionToNormalText(pm).apply();
    liftSelectionBlocks(pm).apply();
    this.clearActiveMarks();
  }

  private clearActiveMarks = () => {
    const { pm } = this;
    this.activeMarkTypes.forEach((mark) => {
      const markTypeObj = pm.schema.marks[mark];
      if (markTypeObj) {
        commands.toggleMark(markTypeObj)(pm);
      }
    });
  }

  private update() {
    const { pm } = this;
    this.activeMarkTypes = this.markTypes.filter(
      mark => pm.schema.marks[mark] && this.markIsActive(pm.schema.marks[mark])
    );
    const formattingIsPresent = this.activeMarkTypes.length > 0 || this.blockStylingIsPresent();
    if (formattingIsPresent !== this.formattingIsPresent) {
      this.formattingIsPresent = formattingIsPresent;
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private markIsActive(markType: MarkType): boolean {
    const { pm } = this;
    const { from, to, empty } = pm.selection;
    if (empty) {
      return !!markType.isInSet(pm.activeMarks());
    }
    return pm.doc.rangeHasMark(from, to, markType);
  }

  private blockStylingIsPresent = (): boolean => {
    const { pm } = this;
    let { from, to } = pm.selection;
    let isBlockStyling = false;
    pm.doc.nodesBetween(from, to, (node, pos) => {
      if (node.isBlock && !isParagraphNode(node)) {
          isBlockStyling = true;
      }
    });
    return isBlockStyling;
  }
}

export interface S extends Schema {
  nodes: {
    blockquote?: BlockQuoteNodeType;
    code_block?: CodeBlockNodeType;
    heading?: HeadingNodeType;
    paragraph?: ParagraphNodeType;
    panel?: PanelNodeType;
    hard_break?: HardBreakNodeType;
  };
  marks: {
    em?: EmMarkType;
    code?: CodeMarkType;
    strike?: StrikeMarkType;
    strong?: StrongMarkType;
    u?: UnderlineMarkType;
    link?: LinkMarkType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

export type ClearFormattingStateSubscriber = (state: ClearFormattingState) => any;

Object.defineProperty(ClearFormattingState, 'name', { value: 'ClearFormattingState' });

export default new Plugin(ClearFormattingState);

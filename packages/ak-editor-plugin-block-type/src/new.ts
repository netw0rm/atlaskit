import {
  commands,
  Plugin,
  ProseMirror,
  Schema,
  Selection,
  UpdateScheduler
} from 'ak-editor-prosemirror';
import {
  BlockQuoteNodeType,
  CodeBlockNodeType,
  HeadingNodeType,
  ParagraphNodeType,
  isBlockQuoteNode,
  isCodeBlockNode,
  isHeadingNode,
  isParagraphNode
} from 'ak-editor-schema';
import CodeBlockPasteListener from './code-block-paste-listener';
import transformToCodeBlock from './transform-to-code-block';

// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
const NormalText = makeBlockType('normal', 'Normal text');
const Heading1 = makeBlockType('heading1', 'Heading 1');
const Heading2 = makeBlockType('heading2', 'Heading 2');
const Heading3 = makeBlockType('heading3', 'Heading 3');
const Quote = makeBlockType('quote', 'Block quote');
const Code = makeBlockType('code', 'Code block');
const Other = makeBlockType('other', 'Other…');

export class BlockTypeState {
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private pm: PM;
  private schema: S;

  // public state
  currentBlockType: BlockType = NormalText;
  canChange: boolean = true;
  availableBlockTypes: BlockType[] = [];

  constructor(pm: PM) {
    this.pm = pm;

    if (pm.schema.nodes.paragraph) {
      this.availableBlockTypes.push(NormalText);
    }

    if (pm.schema.nodes.heading) {
      this.availableBlockTypes.push(Heading1);
      this.availableBlockTypes.push(Heading2);
      this.availableBlockTypes.push(Heading3);
    }

    if (pm.schema.nodes.blockquote) {
      this.availableBlockTypes.push(Quote);
    }

    if (pm.schema.nodes.code_block) {
      this.availableBlockTypes.push(Code);
    }

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    this.update();
  }

  subscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  changeBlockType(name: BlockTypeName): void {
    const { canChange, pm } = this;

    if (canChange) {
      // clear blockquote
      commands.lift(pm);

      switch (name) {
        case 'normal':
          commands.setBlockType(pm.schema.nodes.paragraph)(pm);
          break;
        case 'heading1':
          commands.setBlockType(pm.schema.nodes.heading, { level: 1 })(pm);
          break;
        case 'heading2':
          commands.setBlockType(pm.schema.nodes.heading, { level: 2 })(pm);
          break;
        case 'heading3':
          commands.setBlockType(pm.schema.nodes.heading, { level: 3 })(pm);
          break;
        case 'quote':
          commands.setBlockType(pm.schema.nodes.paragraph)(pm);
          commands.wrapIn(pm.schema.nodes.blockquote)(pm);
          break;
        case 'code':
          transformToCodeBlock(pm.schema.nodes.code_block, pm);
          break;
      }
    }
  }

  private update() {
    const { pm } = this;
    let dirty = false;

    const newBlockType = this.detectBlockType();
    if (newBlockType !== this.currentBlockType) {
      this.currentBlockType = newBlockType;
      dirty = true;
    }

    // we can get away by not checking all the types since the dropdown get
    // enabled as a group instead of per option
    const newEnabled = pm.selection && (
      commands.setBlockType(pm.schema.nodes.paragraph)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.heading)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.code_block)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.blockquote)(pm, false)
    );
    if (newEnabled !== this.canChange) {
      this.canChange = newEnabled;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private detectBlockType(): BlockType {
    const { pm } = this;

    // Before a document is loaded, there is no selection.
    if (!pm.selection) {
      return NormalText;
    }

    const block = pm.selection.$from.node(1);
    if (isHeadingNode(block)) {
      switch (block.attrs.level) {
        case 1:
          return Heading1;
        case 2:
          return Heading2;
        default:
          return Heading3;
      }
    } else if (isCodeBlockNode(block)) {
      return Code;
    } else if (isBlockQuoteNode(block)) {
      return Quote;
    } else if (isParagraphNode(block)) {
      return NormalText;
    } else {
      return Other;
    }
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(BlockTypeState, 'name', { value: 'BlockTypeState' });

export default new Plugin(BlockTypeState);

export type BlockTypeStateSubscriber = (state: BlockTypeState) => any;

export type BlockTypeName = 'normal' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'code' | 'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
}

interface S extends Schema {
  nodes: {
    blockquote?: BlockQuoteNodeType;
    code_block: CodeBlockNodeType;
    heading?: HeadingNodeType;
    paragraph?: ParagraphNodeType;
  }
}

interface PM extends ProseMirror {
  schema: S;
}

function makeBlockType(name: BlockTypeName, title: string): BlockType {
  return { name, title };
}

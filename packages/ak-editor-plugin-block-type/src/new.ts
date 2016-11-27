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
const Heading4 = makeBlockType('heading4', 'Heading 4');
const Heading5 = makeBlockType('heading5', 'Heading 5');
const Heading6 = makeBlockType('heading6', 'Heading 6');
const Quote = makeBlockType('quote', 'Block quote');
const Code = makeBlockType('code', 'Code block');
const Other = makeBlockType('other', 'Other…');

type ContextName = 'default' | 'comment' | 'pr';

export class BlockTypeState {
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private pm: PM;

  // public state
  currentBlockType: BlockType = NormalText;
  canChange: boolean = true;
  availableBlockTypes: BlockType[] = [];
  context?: ContextName;

  constructor(pm: PM) {
    this.pm = pm;

    // add paste listener to overwrite the prosemirror's
    // see https://discuss.prosemirror.net/t/handle-paste-inside-code-block/372/5?u=bradleyayers
    pm.root.addEventListener('paste', new CodeBlockPasteListener(pm), true);

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    this.changeContext('default');
    this.update();
  }

  subscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: BlockTypeStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  changeContext(name: ContextName): void {
    if (name !== this.context) {
      const preferredBlockTypes = (() => {
        switch (name) {
          case 'pr':
            return [
              NormalText,
              Heading1,
              Heading2,
              Heading3,
              Quote,
              Code
            ];
          case 'comment':
            return [
              NormalText,
              Quote,
              Code
            ];
          default:
            return [
              NormalText,
              Heading1,
              Heading2,
              Heading3,
              Heading4,
              Heading5,
              Heading6,
              Quote,
              Code,
            ];
        }
      })();

      this.context = name;
      this.availableBlockTypes = preferredBlockTypes
        .filter(this.isBlockTypeSchemaSupported);
      this.update(true);
    }
  }

  changeBlockType(name: BlockTypeName): void {
    const { canChange, pm } = this;

    if (canChange) {
      // clear blockquote
      commands.lift(pm);
      const nodes = pm.schema.nodes;

      switch (name) {
        case 'normal':
          if (nodes.paragraph) {
            commands.setBlockType(nodes.paragraph)(pm);
          }
          break;
        case 'heading1':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 1 })(pm);
          }
          break;
        case 'heading2':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 2 })(pm);
          }
          break;
        case 'heading3':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 3 })(pm);
          }
          break;
        case 'heading4':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 4 })(pm);
          }
          break;
        case 'heading5':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 5 })(pm);
          }
          break;
        case 'heading6':
          if (nodes.heading) {
            commands.setBlockType(nodes.heading, { level: 6 })(pm);
          }
          break;
        case 'quote':
          if (nodes.paragraph && nodes.blockquote) {
            commands.setBlockType(nodes.paragraph)(pm);
            commands.wrapIn(nodes.blockquote)(pm);
          }
          break;
        case 'code':
          if (nodes.code_block) {
            transformToCodeBlock(nodes.code_block, pm);
          }
          break;
      }
    }
  }

  private update(dirty = false) {
    const { pm } = this;

    const newBlockType = this.detectBlockType();
    if (newBlockType !== this.currentBlockType) {
      this.currentBlockType = newBlockType;
      dirty = true;
    }

    // we can get away by not checking all the types since the dropdown get
    // enabled as a group instead of per option
    const newEnabled = pm.selection && (
      commands.setBlockType(pm.schema.nodes.paragraph!)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.heading!)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.code_block!)(pm, false) ||
      commands.setBlockType(pm.schema.nodes.blockquote!)(pm, false)
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
        case 3:
          return Heading3;
        case 4:
          return Heading4;
        default:
          return Heading5;
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

  private isBlockTypeSchemaSupported = (blockType: BlockType) => {
    const { pm } = this;
    switch (blockType) {
      case NormalText:
        return !!pm.schema.nodes.paragraph;
      case Heading1:
      case Heading2:
      case Heading3:
      case Heading4:
      case Heading5:
      case Heading6:
        return !!pm.schema.nodes.heading;
      case Quote:
        return !!pm.schema.nodes.blockquote;
      case Code:
        return !!pm.schema.nodes.code_block;
    }
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(BlockTypeState, 'name', { value: 'BlockTypeState' });

export default new Plugin(BlockTypeState);

export type BlockTypeStateSubscriber = (state: BlockTypeState) => any;

export type BlockTypeName =
  'normal' |
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'heading6' |
  'quote' |
  'code' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
}

interface S extends Schema {
  nodes: {
    blockquote?: BlockQuoteNodeType;
    code_block?: CodeBlockNodeType;
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

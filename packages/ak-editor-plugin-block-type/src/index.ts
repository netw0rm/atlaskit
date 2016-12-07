import {
  commands,
  Plugin,
  ProseMirror,
  Schema,
  Selection,
  UpdateScheduler,
  Keymap,
  browser,
  Node
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
const NormalText = makeBlockType('normal', 'Normal text', '0');
const Heading1 = makeBlockType('heading1', 'Heading 1', '1');
const Heading2 = makeBlockType('heading2', 'Heading 2', '2');
const Heading3 = makeBlockType('heading3', 'Heading 3', '3');
const Heading4 = makeBlockType('heading4', 'Heading 4', '4');
const Heading5 = makeBlockType('heading5', 'Heading 5', '5');
const Quote = makeBlockType('quote', 'Block quote', '7');
const Code = makeBlockType('code', 'Code block', '8');
const Other = makeBlockType('other', 'Other…', 'N/A');

type ContextName = 'default' | 'comment' | 'pr';

export class BlockTypeState {
  private changeHandlers: BlockTypeStateSubscriber[] = [];
  private pm: PM;

  // public state
  currentBlockType: BlockType = NormalText;
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

    this.addKeymap();
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
    const { pm } = this;

    // clear blockquote
    commands.lift(pm);
    const nodes = pm.schema.nodes;

    switch (name) {
      case NormalText.name:
        if (nodes.paragraph) {
          commands.setBlockType(nodes.paragraph)(pm);
        }
        break;
      case Heading1.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 1 })(pm);
        }
        break;
      case Heading2.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 2 })(pm);
        }
        break;
      case Heading3.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 3 })(pm);
        }
        break;
      case Heading4.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 4 })(pm);
        }
        break;
      case Heading5.name:
        if (nodes.heading) {
          commands.setBlockType(nodes.heading, { level: 5 })(pm);
        }
        break;
      case Quote.name:
        if (nodes.paragraph && nodes.blockquote) {
          commands.setBlockType(nodes.paragraph)(pm);
          commands.wrapIn(nodes.blockquote)(pm);
        }
        break;
      case Code.name:
        if (nodes.code_block) {
          transformToCodeBlock(nodes.code_block, pm);
        }
        break;
    }
  }

  private addKeymap(): void {
    const assistKey = browser.mac ? 'Cmd-Alt-' : 'Ctrl-'; 

    const bindings = this.availableBlockTypes.reduce((bindings, blockType) => {
      const binding = {[assistKey + blockType.key]: () => this.toggleBlockType(blockType.name)};
      return Object.assign({}, bindings, binding);
    }, {});

    this.pm.addKeymap(new Keymap(bindings));
  }

  private toggleBlockType(name: BlockTypeName): void {
    debugger;
    const blockNodes = this.blockNodesBetweenSelection();

    const nodeThatDoesNotMatchTargetBlockType = blockNodes.find((node) => {
      return this.nodeBlockType(node).name !== name
    });

    if(this.nodeBlockType(blockNodes[0]).name !== name) {
      this.changeBlockType(name);
    } else if(name !== Quote.name){
      this.changeBlockType(NormalText.name);
    } else {
      commands.lift(this.pm);
    }
  }

  private blockNodesBetweenSelection(): Node[] {
    const { pm } = this;
    const {$from, $to} = pm.selection;
    let blockNodes: Node[] = [];

    pm.doc.nodesBetween($from.pos, $to.pos, (node) => {
      if(node.isBlock) {
        blockNodes.push(node);
      }
      return false;
    });

    return blockNodes;
  }

  private update(dirty = false) {
    const { pm } = this;

    const newBlockType = this.detectBlockType();
    if (newBlockType !== this.currentBlockType) {
      this.currentBlockType = newBlockType;
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

    const { $from } = pm.selection;

    for (let depth = 0; depth <= $from.depth; depth++) {
      const block = $from.node(depth)!;
      let blocktype = this.nodeBlockType(block);
      if (blocktype !== Other) {
        return blocktype;
      }
    }

    return Other;
  }

  private nodeBlockType(node: Node): BlockType {
    if (isHeadingNode(node)) {
        switch (node.attrs.level) {
          case 1:
            return Heading1;
          case 2:
            return Heading2;
          case 3:
            return Heading3;
          case 4:
            return Heading4;
          case 5:
            return Heading5;
      }
    } else if (isCodeBlockNode(node)) {
      return Code;
    } else if (isBlockQuoteNode(node)) {
      return Quote;
    } else if (isParagraphNode(node)) {
      return NormalText;
    }

    return Other;
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
  'quote' |
  'code' |
  'other';

export interface BlockType {
  name: BlockTypeName;
  title: string;
  key: string;
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

function makeBlockType(name: BlockTypeName, title: string, key: string): BlockType {
  return { name: name, title: title, key: key };
}

import { Node } from '../../../prosemirror';
import { ReactComponentConstructor } from '../';

import Blockquote from './blockquote';
import BulletList from './bulletList';
import Doc from './doc';
import Emoji from './emoji';
import HardBreak from './hardBreak';
import Heading from './heading';
import ListItem from './listItem';
import Mention from './mention';
import OrderedList from './orderedList';
import Panel from './panel';
import Paragraph from './paragraph';

export const nodeToReact = {
  'blockquote': Blockquote,
  'bulletList': BulletList,
  'doc': Doc,
  'emoji': Emoji,
  'hardBreak': HardBreak,
  'heading': Heading,
  'listItem': ListItem,
  'mention': Mention,
  'orderedList': OrderedList,
  'panel': Panel,
  'paragraph': Paragraph,
};

export const toReact = (node: Node): ReactComponentConstructor => {
  return nodeToReact[node.type.name];
};

export interface TextWrapper {
  type: {
    name: 'textWrapper'
  };
  content: Node[];
}

export interface NodeSimple {
  type: {
    name: string;
  };
  attrs?: any;
}

/*
 *  Wraps adjecent textnodes in a textWrapper
 *
 *  Input:
 *  [
 *    {
 *      type: 'text',
 *      text: 'Hello'
 *    },
 *    {
 *      type: 'text',
 *      text: 'World!',
 *      marks: [
 *        {
 *          type: 'strong'
 *        }
 *      ]
 *    }
 *  ]
 *
 *  Output:
 *  [
 *    {
 *      type: 'textWrapper',
 *      content: [
 *        {
 *          type: 'text',
 *          text: 'Hello'
 *        },
 *        {
 *          type: 'text',
 *          text: 'World!',
 *          marks: [
 *            {
 *              type: 'strong'
 *            }
 *          ]
 *        }
 *      ]
 *    }
 *  ]
 */
export const mergeTextNodes = (nodes: (Node | NodeSimple)[]) => {
  return nodes.reduce<(TextWrapper | Node | NodeSimple)[]>((acc, current) => {
    if (!isText(current.type.name)) {
      acc.push(current);
      return acc;
    }

    // Append node to previous node, if it was a text wrapper
    if (acc.length > 0 && isTextWrapper(acc[acc.length - 1].type.name)) {
      (acc[acc.length - 1] as TextWrapper).content!.push(current as Node);
    } else {
      acc.push({
        type: {
          name: 'textWrapper',
        },
        content: [current]
      } as TextWrapper);
    }

    return acc;
  }, []);
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};

export const isTextWrapper = (type: string): type is 'textWrapper' => {
  return type === 'textWrapper';
};

export {
  Blockquote,
  BulletList,
  Doc,
  Emoji,
  HardBreak,
  Heading,
  ListItem,
  Mention,
  OrderedList,
  Panel,
  Paragraph,
};

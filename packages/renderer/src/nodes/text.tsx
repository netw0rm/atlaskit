import {
  getMarksByOrder,
  isSameMark,
  Mark,
  MarkNode,
  renderMark,
} from '../marks';

import {
  Node,
} from './';

export interface TextNode extends Node {
  text: string;
  marks?: Mark[];
}

export interface TextWrapper extends Node {
  textNodes: TextNode[];
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
export const mergeTextNodes = (nodes: Node[]) => {
  let index = 0;
  return nodes.reduce<(Node | TextWrapper)[]>((acc, current) => {
    const isText = current.type === 'text';

    if (!isText) {
      acc.push(current);
      index++;
      return acc;
    }

    const previousNodeWasText = index > 0 && acc[index - 1].type === 'textWrapper';

    if (previousNodeWasText) {
      (acc[index - 1] as TextWrapper).textNodes.push(current as TextNode);
    } else {
      acc.push({
        type: 'textWrapper',
        textNodes: [current]
      } as TextWrapper);
      index++;
    }

    return acc;
  }, []);
};

export const isTextWrapper = (type: string): type is 'textWrapper' => {
  return type === 'textWrapper';
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};

export const renderTextNodes = (textNodes: TextNode[]) => {
  let currentMarkNode: MarkNode | Node | null = null;
  const content = textNodes.reduce((acc, node, index) => {
    if (!node.marks || !node.marks.length) {
      currentMarkNode = {
        type: 'text',
        text: node.text
      };

      acc.push(currentMarkNode);
    } else {
      let newMark = true;

      getMarksByOrder(node.marks).forEach(mark => {
        if (index > 0 && isSameMark(mark, currentMarkNode as Mark)) {
          newMark = false;
        } else {

          if (newMark) {
            currentMarkNode = {
              type: mark.type,
              attrs: mark.attrs,
              content: []
            };
            (acc as any).push(currentMarkNode);
          } else {
            let newMark = {
              type: mark.type,
              attrs: mark.attrs,
              content: []
            };

            (currentMarkNode as MarkNode).content.push(newMark);
            currentMarkNode = newMark;
          }
        }
      });

      (currentMarkNode as MarkNode).content.push({
        type: 'text',
        text: node.text
      });
    }

    return acc;
  }, [] as (MarkNode | Node)[]);

  return content.map((mark, index) => renderMark(mark as MarkNode, index));
};

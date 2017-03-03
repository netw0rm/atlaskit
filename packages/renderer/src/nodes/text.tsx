import {
  getMarksByOrder,
  isSameMark,
  Mark,
  renderMark,
} from '../marks';

import {
  Renderable,
} from './';

import {
  isText,
  isTextWrapper
} from '../utils';

export interface TextNode extends Renderable {
  text: string;
  marks?: Mark[];
}

export interface TextWrapper extends Renderable {
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
export const mergeTextNodes = (nodes: Renderable[]) => {
  return nodes.reduce<(Renderable)[]>((acc, current) => {
    if (!isText(current.type)) {
      acc.push(current);
      return acc;
    }

    // Append node to previous node, if it was a text wrapper
    if (acc.length > 0 && isTextWrapper(acc[acc.length - 1].type)) {
      (acc[acc.length - 1]).content!.push(current as TextNode);
    } else {
      acc.push({
        type: 'textWrapper',
        content: [current]
      });
    }

    return acc;
  }, []);
};

export const renderTextNodes = (textNodes: TextNode[]) => {
  let currentMarkNode: Renderable;
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

            currentMarkNode.content!.push(newMark);
            currentMarkNode = newMark;
          }
        }
      });

      currentMarkNode.content!.push({
        type: 'text',
        text: node.text
      });
    }

    return acc;
  }, [] as Renderable[]);

  return content.map((mark, index) => renderMark(mark, index));
};

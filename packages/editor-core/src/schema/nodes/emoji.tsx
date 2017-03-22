import { Emoji } from 'ak-emoji';
import { akColorN50 } from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { NodeSpec, Node } from '../../prosemirror';

const width = '20px';
const height = '20px';

const emojiStyle = style({
    display: 'inline-block',
    width: width,
    height: height,
    verticalAlign: 'middle',
    userSelect: 'all',

    $nest: {
        '&.ProseMirror-selectednode': {
            background: akColorN50,
            outline: 'none'
        },
        '&&> div': {
            width: width,
            height: height,

            $nest: {
                '> span': {
                    margin: '0',
                    width: width,
                    height: height,
                }
            }
        }
    }
});

export interface EmojiNode extends Node {
    attrs: {
        id: string;
        [key: string]: any;
    };
}

export const emoji: NodeSpec = {
    inline: true,
    group: 'inline',
    attrs: {
        id: { default: '' },
        shortcut: { default: '' },
        representation: {
            default: {
                xIndex: 0,
                yIndex: 0,
                sprite: {
                    url: '',
                    row: '',
                    column: ''
                }
            }
        }
    },
    parseDOM: [{
        tag: 'span[data-emoji-id]',
        getAttrs: (dom: Element) => ({
            id: dom.getAttribute('data-emoji-id')!
        })
    }],
    toDOM(node: EmojiNode): any {
        const dom = document.createElement('span');
        dom.setAttribute('contenteditable', 'false');
        dom.setAttribute('data-emoji-id', node.attrs.id);
        dom.classList.add(emojiStyle);
        ReactDOM.render(<Emoji {...node.attrs} />, dom);
        return dom;
    }
};

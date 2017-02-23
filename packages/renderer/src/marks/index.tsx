import * as React from 'react';
import Em from './em';
import Link from './link';
import Mono from './mono';
import Strike from './strike';
import Strong from './strong';
import SubSup from './subsup';
import Underline from './underline';
import { Node } from '../nodes';
import { isText } from '../nodes/text';

export interface Mark {
  type: string;
  attrs?: any;
}

export interface MarkNode extends Node {
  content: Node[];
}

enum MarkType {
  em,
  link,
  mono,
  strike,
  strong,
  subsup,
  underline
}

const marks = {
  [MarkType.em]: Em,
  [MarkType.link]: Link,
  [MarkType.mono]: Mono,
  [MarkType.strike]: Strike,
  [MarkType.strong]: Strong,
  [MarkType.subsup]: SubSup,
  [MarkType.underline]: Underline,
};

export const markOrder = [
  'link',
  'em',
  'strong',
  'strike',
  'mono',
  'subsup',
  'underline'
];

export const getMarksByOrder = (marks: Mark[]) => {
  return [...marks].sort((a, b) => markOrder.indexOf(a.type) - markOrder.indexOf(b.type));
};

const getKey = (mark: MarkNode, index: number) => {
  const { type } = mark;
  if (MarkType[type] === MarkType.subsup) {
    return `${type}-${mark.attrs!['type']}-${index}`;
  }

  return `${type}-${index}`;
};

export const renderMark = (mark: MarkNode, index: number = 0) => {
  const { type } = mark;

  //tslint:disable-next-line
  let Mark = marks[MarkType[type]] as any;

  if (Mark) {
    return (
      <Mark {...mark} key={getKey(mark, index)}>
        {(mark.content || []).map((child, index) => renderMark(child as MarkNode, index))}
      </Mark>
    );
  } else if (isText(type)) {
    return (mark as any).text;
  }

  return renderMark(mark.content[0] as MarkNode);
};

export const isSameMark = (mark: Mark | null, otherMark: Mark | null) => {
  if (mark === otherMark) {
    return true;
  }

  if (!mark || !otherMark) {
    return false;
  }

  if (mark.type !== otherMark.type) {
    return false;
  }

  if ((mark.attrs && !otherMark.attrs) || (!mark.attrs && otherMark.attrs)) {
    return false;
  }

  // TODO: Use some deep-equal function instead
  return !Object.keys(mark.attrs!).some(attr => mark.attrs![attr] !== otherMark.attrs![attr]);
};

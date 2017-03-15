import * as React from 'react';
import Em from './em';
import Link from './link';
import Mono from './mono';
import Strike from './strike';
import Strong from './strong';
import SubSup from './subsup';
import Underline from './underline';
import { Renderable } from '../nodes';
import { isText } from '../utils';

export interface Mark {
  type: string;
  attrs?: any;
}

enum MarkType {
  em,
  link,
  mono,
  strike,
  strong,
  subsup,
  underline,
}

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

const getKey = (node: Renderable, index: number) => {
  const { type } = node;
  if (MarkType[type] === MarkType.subsup) {
    return `${type}-${node.attrs!['type']}-${index}`;
  }

  return `${type}-${index}`;
};

export const renderMark = (mark: Renderable, index: number = 0) => {
  const { type } = mark;

  const content = (mark.content || []).map((child, index) => renderMark(child as Renderable, index));
  const key = getKey(mark, index);

  switch (MarkType[type]) {
    case MarkType.em:
      return <Em key={key}>{content}</Em>;
    case MarkType.link: {
      const { href, url }  = mark.attrs as any;
      return <Link key={key} href={href || url}>{content}</Link>;
    }
    case MarkType.mono:
      return <Mono key={key}>{content}</Mono>;
    case MarkType.strike:
      return <Strike key={key}>{content}</Strike>;
    case MarkType.strong:
      return <Strong key={key}>{content}</Strong>;
    case MarkType.subsup: {
      const { type } = mark.attrs as any;
      return <SubSup key={key} type={type}>{content}</SubSup>;
    }
    case MarkType.underline:
      return <Underline key={key}>{content}</Underline>;
    default: {
      if (isText(mark.type)) {
        return (mark as any).text;
      }

      return renderMark(mark.content![0] as Renderable);
    }
  }
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
  return !Object.keys(mark.attrs || {}).some(attr => mark.attrs![attr] !== otherMark.attrs![attr]);
};

import { Mark } from './';

export default function applyMark(nodeText: string, mark: Mark): string {
  if (mark.attrs.href === nodeText) {
    return nodeText;
  }

  if (!mark.attrs.href) {
    return nodeText;
  }

  const separator = /\s$/.test(nodeText) ? '' : ' ';
  return `${nodeText}${separator}(${mark.attrs.href})`;
}

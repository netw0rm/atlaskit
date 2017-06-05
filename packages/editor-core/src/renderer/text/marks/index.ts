import { Mark } from '../../../prosemirror';
import Link from './link';

const marksToText = {
  'link': Link,
};

export default function applyMark(nodeText: string, mark: Mark): string {
  return (marksToText[mark.type.name])
    ? marksToText[mark.type.name](nodeText, mark)
    : nodeText;
}

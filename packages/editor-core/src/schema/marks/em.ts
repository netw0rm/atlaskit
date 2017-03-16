import { MarkSpec, marks } from '../../prosemirror';

export const em: MarkSpec = {...marks.em,
  inclusiveRight: false,
  inclusiveLeft: false
};

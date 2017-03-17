import { MarkSpec, marks } from '../../prosemirror';

export const strong: MarkSpec = {...marks.strong,
  inclusiveRight: false,
  inclusiveLeft: false
};

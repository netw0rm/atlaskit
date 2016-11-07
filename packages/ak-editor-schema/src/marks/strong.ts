import { StrongMark as StrongMarkType, Mark } from 'ak-editor-prosemirror';

export { StrongMarkType };

export interface StrongMark extends Mark {
	type: StrongMarkType;
}
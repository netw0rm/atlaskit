import { EmMark as EmMarkType, Mark } from 'ak-editor-prosemirror';

export { EmMarkType };

export interface EmMark extends Mark {
	type: EmMarkType;
}
/* eslint-disable */
import './types';
import { Slice } from 'ak-editor-prosemirror';

export const markdownTransformer = function(schema: any, slice: any) {
  var sliceContents = '';

  if (sliceContents.length) {
    return new Slice(sliceContents, slice.openLeft, slice.openRight, slice.possibleParent);
  } else {
    return slice;
  }
}

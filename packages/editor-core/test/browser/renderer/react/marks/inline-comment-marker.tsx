import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import InlineCommentMarker from '../../../../../src/renderer/react/marks/inline-comment-marker';

describe('Renderer - React/Marks/InlineCommentMarker', () => {
  const createInlineCommentMarker = () => mount(<InlineCommentMarker reference="this-is-reference-hash">wrapped text</InlineCommentMarker>);

  it('should wrap content with <a>-tag', () => {
    const mark = createInlineCommentMarker();
    expect(mark.find('span').length).to.equal(1);
    mark.unmount();
  });

  it('should set data-reference to attrs.reference', () => {
    const mark = createInlineCommentMarker();
    expect(mark.find('span').props()).to.have.property('data-reference', 'this-is-reference-hash');
    mark.unmount();
  });
});

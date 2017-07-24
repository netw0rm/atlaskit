import { expect } from 'chai';
import { toHTML, fromHTML, doc, p, blockquote } from '../../../../src/test-helper';

import schema from '../../../../src/test-helper/schema';


describe('@atlaskit/editor-core/schema list-item', () => {

  it('should be possible to create a blockquote with a paragraph', () => {
    const html = toHTML(schema.nodes.blockquote.create({}, schema.nodes.paragraph.create()), schema);
    expect(html).to.have.string('<blockquote><p></p></blockquote>');
  });

  it('should not be possible to have heading inside blockquote', () => {
    const docFromHTML = fromHTML('<blockquote><h2>text</h2></blockquote>', schema);
    expect(docFromHTML).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should be possible to have paragraph inside blockquote', () => {
    const docFromHTML = fromHTML('<blockquote><p>text</p></blockquote>', schema);
    expect(docFromHTML).to.deep.equal(doc(blockquote(p('text'))));
  });

  it('should not be possible to have list inside blockquote', () => {
    const docFromHTML = fromHTML('<blockquote><ol><li>text</li></ol></blockquote>', schema);
    expect(docFromHTML).to.deep.equal(doc(blockquote(p('text'))));
  });
});

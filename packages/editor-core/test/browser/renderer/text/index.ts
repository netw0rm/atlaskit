import { expect } from 'chai';
import TextSerializer from '../../../../src/renderer/text';
import { applyMark, serializeNode } from '../../../../src/renderer/text/util';
import customNodeSerializers from '../../../../src/renderer/text/nodes';
import {
  media,
  p as paragraph,
} from '../../../../src/test-helper';
import schema from '../../../../src/test-helper/schema';
import doc from './_document';
import expectedText from './_expected-text';

const docFromSchema = schema.nodeFromJSON(doc);

describe('Renderer - TextSerializer', () => {

  it('should render document', () => {
    const serializer = TextSerializer.fromSchema(schema);
    const text = serializer.serializeFragment(docFromSchema.content);

    expect(text).to.equal(expectedText);
  });

  it('should return node text if there is no special mark behaviour', () => {
    const mark = schema.marks.underline.create();
    expect(applyMark('https://www.atlassian.com', mark)).to.equal('https://www.atlassian.com');
  });

  it('should use node text if there is no special node serialization behaviour', () => {
    const node = paragraph('Atlassian');
    expect(serializeNode(node, customNodeSerializers)).to.equal('Atlassian');
  });

  it('should use special node serialization behaviour if it exists', () => {
    const node = media({
      id: 'foo',
      type: 'file',
      collection: 'bar'
    });

    expect(serializeNode(node, customNodeSerializers)).to.not.equal('');
  });
});

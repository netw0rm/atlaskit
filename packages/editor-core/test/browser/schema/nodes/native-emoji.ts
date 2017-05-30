import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('@atlaskit/editor-core/schema native-emoji node', () => {
  it('should serialize to DOM as native-emoji when no shortName', () => {
    const html = toHTML(schema.nodes.nativeEmoji.create({ id: '123', text: 'A' }), schema);
    expect(html).to.equal('<span data-native-emoji-id="123">A</span>');
  });

  it('should serialize to DOM as emoji when there is a shortName', () => {
    const html = toHTML(schema.nodes.nativeEmoji.create({ shortName: 'abc', id: '123', text: 'monkeytrousers' }), schema);
    expect(html).to.have.string('data-emoji-short-name="abc"');
    expect(html).to.have.string('data-emoji-id="123"');
    expect(html).to.have.string('data-emoji-text="monkeytrousers"');
    expect(html).to.have.string('contenteditable="false"');
  });

  it('should extract the correct values of native emoji id', () => {
    const doc = fromHTML('<span data-native-emoji-id="123">A</span>');
    const nativeEmoji = doc.firstChild!.firstChild!;

    expect(nativeEmoji.type.name).to.equal('nativeEmoji');
    expect(nativeEmoji.attrs.id).to.equal('123');
    expect(nativeEmoji.attrs.text).to.equal('A');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'nativeEmoji']
  });
}

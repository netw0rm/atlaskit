import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('@atlaskit/editor-core/schema mention node', () => {
  it('should have mention id and display name when serializing to DOM', () => {
    const html = toHTML(schema.nodes.mention.create({ id: '@bar', text: 'foo bar' }), schema);
    expect(html).to.have.string('data-mention-id="@bar"');
    expect(html).to.have.string('contenteditable="false"');
    expect(html).to.have.string('foo bar');
  });

  it('should extract the correct values of mention id and display name', () => {
    const doc = fromHTML('<span data-mention-id=\'@user-1\'>foo bar</span>');
    const mention = doc.firstChild!.firstChild!;

    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('@user-1');
    expect(mention.attrs.text).to.equal('foo bar');
  });

  it('should ignore if userType is DEFAULT', () => {
    const html = toHTML(schema.nodes.mention.create({ id: 'id-foo-bar', text: '@foo bar', userType: 'DEFAULT' }), schema);
    expect(html).to.have.string('data-mention-id="id-foo-bar"');
    expect(html).to.have.string('contenteditable="false"');
    expect(html).to.have.string('data-user-type="DEFAULT"');
    expect(html).to.have.string('@foo bar');
  });

  it('should have userType if it is SPECIAL', () => {
    const html = toHTML(schema.nodes.mention.create({ id: 'id-rick', text: '@rick', userType: 'SPECIAL' }), schema);
    expect(html).to.have.string('data-mention-id="id-rick"');
    expect(html).to.have.string('data-user-type="SPECIAL"');
    expect(html).to.have.string('@rick');
  });

  it('should have userType if it is APP', () => {
    const html = toHTML(schema.nodes.mention.create({ id: 'id-coffee', text: '@coffee', userType: 'APP' }), schema);
    expect(html).to.have.string('data-mention-id="id-coffee"');
    expect(html).to.have.string('data-user-type="APP"');
    expect(html).to.have.string('@coffee');
  });

  it('should extract the valid userTypes - SPECIAL', () => {
    const doc = fromHTML('<span data-mention-id="id-rick" data-user-type="SPECIAL">@Rick Sanchez</span>');
    const mention = doc.firstChild!.firstChild!;

    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('id-rick');
    expect(mention.attrs.text).to.equal('@Rick Sanchez');
    expect(mention.attrs.userType).to.equal('SPECIAL');
  });

  it('should extract the valid userTypes - APP', () => {
    const doc = fromHTML('<span data-mention-id="id-coffee" data-user-type="APP">@coffee</span>');
    const mention = doc.firstChild!.firstChild!;

    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('id-coffee');
    expect(mention.attrs.text).to.equal('@coffee');
    expect(mention.attrs.userType).to.equal('APP');
  });

  it('should not extract invalid value of userType', () => {
    const doc = fromHTML('<span data-mention-id="id-morty" data-user-type="SIDEKICK">@Morty Smith</span>');
    const mention = doc.firstChild!.firstChild!;

    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('id-morty');
    expect(mention.attrs.text).to.equal('@Morty Smith');
    expect(mention.attrs.userType).to.equal(null);
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'mention']
  });
}

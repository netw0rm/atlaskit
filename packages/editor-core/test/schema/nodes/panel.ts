import { expect } from 'chai';
import { Schema, Text } from '../../../src';
import { DocNodeType, isPanelNode, PanelNodeType, ParagraphNodeType } from '../../../src';
import { fromHTML, toHTML } from '../../../src/test-helper';

const schema = makeSchema();
describe('@atlaskit/editor-core/schema panel node', () => {
  it('throws an error if it is not named "panel"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'block+' },
          foo: { type: PanelNodeType, content: 'block+', group: 'block' },
          text: { type: Text, group: 'inline' },
          paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' }
        }
      });
    }).to.throw(Error);
  });

  it('does not throw an error if it is named "panel"', () => {
    expect(() => {
      new Schema({
        nodes: {
          doc: { type: DocNodeType, content: 'block+' },
          panel: { type: PanelNodeType, content: 'block+', group: 'block' },
          text: { type: Text, group: 'inline' },
          paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' }
        }
      });
    }).to.not.throw(Error);
  });

  it('should have data-panel-type when serializing to DOM', () => {
    const html = toHTML(schema.nodes.panel.create({ panelType: 'info' }));
    expect(html).to.have.string('data-panel-type="info"');
    expect(html).to.have.string('class=');
  });

  it('should info panel type by default', () => {
    const html = toHTML(schema.nodes.panel.create());
    expect(html).to.have.string('data-panel-type="info"');
  });

  it('should extract the correct values of panelType', () => {
    const doc = fromHTML('<div data-panel-type=\'tip\'><p>testing</p></div>', schema);
    const panel = doc.firstChild;
    expect(panel && panel.type.name).to.equal('panel');
    expect(panel && panel.attrs['panelType']).to.equal('tip');
  });

  it('should return false if isPanelNode is called for DocNodeType', () => {
    const doc = fromHTML('<p>testing</p>', schema);
    expect(isPanelNode(doc)).to.equal(false);
  });
});

function makeSchema() {
  interface ISchema extends Schema{
    nodes: {
      doc: DocNodeType;
      text: Text;
      panel: PanelNodeType;
      paragraph: ParagraphNodeType;
    };
  }

  return new Schema({
    nodes: {
      doc: { type: DocNodeType, content: 'block+' },
      panel: { type: PanelNodeType, content: 'block+', group: 'block' },
      text: { type: Text, group: 'inline' },
      paragraph: { type: ParagraphNodeType, content: 'inline<_>*', group: 'block' },
    }
  }) as ISchema;
}

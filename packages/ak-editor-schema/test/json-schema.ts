import * as chai from 'chai';
import jsonSchema from '../src/json-schema';
import { Schema, Block, Text, Inline, Attribute, EmMark, MarkType } from 'ak-editor-prosemirror';

const { expect } = chai;

describe('ak-editor-bitbucket: json-schema', () => {
  class Image extends Inline {
    get attrs() {
      return {
        src: new Attribute,
        alt: new Attribute({default: ""}),
        title: new Attribute({default: ""})
      }
    }
  }

  it('returns an object', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema)).to.be.an.instanceOf(Object);
  });

  it('declares no additional properties', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema)).property('additionalProperties', false);
  })

  it('declares its type to be "object"', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema)).to.have.property('type', 'object');
  });

  it('requires a "doc" property', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema))
      .to.have.property('required')
      .and.to.deep.equal(['doc']);
  });

  it('has a "properties" property', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema))
      .to.have.property('properties')
      .and.to.be.an('object');
  });

  it('has a correct $schema property', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema)).to.have.property('$schema', 'http://json-schema.org/draft-04/schema#');
  });

  it('has a description', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema)).to.have.property('description')
      .that.is.a('string');
  });

  it('defines a _node definition for each node', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    expect(jsonSchema(schema))
      .to.have.property('definitions')
      .to.have.property('doc_node')
      .that.is.an('object');
    expect(jsonSchema(schema))
      .to.have.property('definitions')
      .to.have.property('text_node')
      .that.is.an('object');
  });

  it('defines `doc_node` content as type `array`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('properties')
      .property('content')
      .property('type', 'array');
  });

  it('defines `doc_node` without an `attrs` property', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const { doc_node } = jsonSchema(schema).definitions;

    expect(doc_node.properties)
      .to.not.have.property('attrs');
  });

  it('defines `doc_node` as having no additional properties', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('additionalProperties', false);
  });

  it('defines the only item in `doc_node.content.items` as an `p`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'p inline*' },
        p: { type: Text, content: 'img*' },
        img: { type: Image, group: 'inline' },
        text: { type: Text, group: 'inline' },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node.properties.content.items)
      .to.deep.equal([{ '$ref': '#/definitions/p_node' }]);
  });

  it('defines `doc_node` `content` property with minItems=1', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('properties')
      .property('content')
      .property('minItems', 1);
  });

  it('defines `doc_node` `content` property with additional items as inline nodes', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'p inline*' },
        p: { type: Text, content: 'img*' },
        img: { type: Image, group: 'inline' },
        text: { type: Text, group: 'inline' },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('properties')
      .property('content')
      .property('additionalItems')
      .to.deep.equal({
        oneOf: [
          { '$ref': '#/definitions/img_node' },
          { '$ref': '#/definitions/text_node' },
        ]
      });
  });

  it('defines a required `type` property for `doc` node', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('properties')
      .property('type')
      .property('enum')
      .deep.equal(['doc']);

    expect(doc_node)
      .property('required')
      .to.include('type');
  });

  it('defines a required `content` property for `doc` node', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const doc_node = jsonSchema(schema).definitions.doc_node;

    expect(doc_node)
      .property('required')
      .to.include('content');
  });

  it('defines a required type property for text node', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const text_node = jsonSchema(schema).definitions.text_node;

    expect(text_node)
      .property('properties')
      .property('type')
      .property('enum')
      .deep.equal(['text']);

    expect(text_node)
      .property('required')
      .to.include('type');
  });

  it('defines a required `text` property for `text` node', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const text_node = jsonSchema(schema).definitions.text_node;

    expect(text_node)
      .property('required')
      .to.include('text');
  });

  it('defines a `minLength=1` for the `text` property in `text` nodes', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text },
      },
    });
    const text_node = jsonSchema(schema).definitions.text_node;

    expect(text_node.properties.text)
      .property('minLength', 1);
  });

  it('defines an `attrs` property for `img_node`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        img: { type: Image },
        text: { type: Text },
      },
    });
    const { img_node } = jsonSchema(schema).definitions;

    expect(img_node.properties)
      .to.have.property('attrs');
  });

  it('defines `attrs` as required for `img_node`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        img: { type: Image },
        text: { type: Text },
      },
    });
    const { img_node } = jsonSchema(schema).definitions;

    expect(img_node.required)
      .to.include('attrs');
  });

  it('defines src, title, alt as strings in `attrs` for `img_node`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        img: { type: Image },
        text: { type: Text },
      },
    });
    const { img_node } = jsonSchema(schema).definitions;
    const { attrs } = img_node.properties;

    expect(attrs.properties)
      .to.have.property('src')
      .and.deep.equal({ type: 'string' });

    expect(attrs.properties)
      .to.have.property('title')
      .and.deep.equal({ type: 'string' });

    expect(attrs.properties)
      .to.have.property('alt')
      .and.deep.equal({ type: 'string' });
  });

  it('defines src to be required in `attrs` for `img_node`', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        img: { type: Image },
        text: { type: Text },
      },
    });
    const { img_node } = jsonSchema(schema).definitions;
    const { attrs } = img_node.properties;

    expect(attrs.required)
      .to.include('src');
  });

  it('supports nodes that specify "one or more" of a single group', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'group+' },
        text: { type: Text, group: 'group' },
      },
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content).to.deep.equal({
      type: 'array',
      items: {
        $ref: '#/definitions/text_node'
      },
      minItems: 1
    });
  });

  it('supports nodes that specify "one followed by zero or more group ____"', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'p group*' },
        p: { type: Text },
        text: { type: Text, group: 'group' },
      },
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content).to.deep.equal({
      type: 'array',
      items: [
        { $ref: '#/definitions/p_node' },
      ],
      additionalItems: {
        $ref: '#/definitions/text_node',
      },
      minItems: 1
    });
  });

  it('supports nodes that specify "one followed by one or more group ____"', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'p group+' },
        p: { type: Text },
        text: { type: Text, group: 'group' },
      },
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content).to.deep.equal({
      type: 'array',
      items: [
        { $ref: '#/definitions/p_node' },
      ],
      additionalItems: {
        $ref: '#/definitions/text_node',
      },
      minItems: 2
    });
  });

  it('omits `minItems=0` for "zero or more ____"', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text*' },
        text: { type: Text },
      },
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content).to.deep.equal({
      type: 'array',
      items: { $ref: '#/definitions/text_node' },
    });
  });

  it('omits `content` for leaf nodes', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        leaf: { type: Block },
        text: { type: Text },
      },
    });
    const { leaf_node } = jsonSchema(schema).definitions;
    expect(leaf_node.properties).to.not.have.property('content');
    expect(leaf_node.required).to.not.include('content');
  });

  it('omits `required` from `attrs` for nodes with only-optional attrs', () => {
    class Foo extends Inline {
      get attrs() {
        return {
          foo: new Attribute({default: ""}),
        }
      }
    }
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        foo: { type: Foo },
        text: { type: Text },
      },
    });
    const { foo_node } = jsonSchema(schema).definitions;
    expect(foo_node.properties.attrs).to.not.have.property('required');
  });

  it('defines a mark for each mark', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text},
      },
      marks: {
        a: EmMark,
        b: EmMark,
      }
    });
    const { a_mark, b_mark } = jsonSchema(schema).definitions;

    expect(a_mark).to.deep.equal({
      type: 'object',
      properties: {
        _: { enum: ['a'] },
      },
      required: ['_'],
      additionalProperties: false,
    });

    expect(b_mark).to.deep.equal({
      type: 'object',
      properties: {
        _: { enum: ['b'] },
      },
      required: ['_'],
      additionalProperties: false,
    });
  });

  it('defines attrs for marks that have them', () => {
    class LinkMark extends MarkType {
      get attrs() {
        return {
          href: new Attribute,
          title: new Attribute({default: ""})
        }
      }
    }
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text' },
        text: { type: Text},
      },
      marks: {
        link: LinkMark,
      }
    });
    const { link_mark } = jsonSchema(schema).definitions;
    expect(link_mark).to.deep.equal({
      type: 'object',
      properties: {
        _: { enum: ['link'] },
        href: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
      },
      required: ['_', 'href'],
      additionalProperties: false,
    });
  });

  it('supports wildcard for marks on a node when multiple marks are defined', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text<_>' },
        text: { type: Text},
      },
      marks: {
        a: EmMark,
        b: EmMark,
      }
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content.items)
      .to.deep.equal({
        allOf: [
          { $ref: '#/definitions/text_node' },
          {
            properties: {
              marks: {
                type: 'array',
                items: {
                  anyOf: [
                    { $ref: '#/definitions/a_mark' },
                    { $ref: '#/definitions/b_mark' },
                  ]
                }
              }
            }
          }
        ]
      });
  });

  it('supports a single mark on a node when multiple marks are defined', () => {
    const schema = new Schema({
      nodes: {
        doc: { type: Block, content: 'text<a>' },
        text: { type: Text},
      },
      marks: {
        a: EmMark,
        b: EmMark,
      }
    });
    const { doc_node } = jsonSchema(schema).definitions;
    expect(doc_node.properties.content.items)
      .to.deep.equal({
      allOf: [
        { $ref: '#/definitions/text_node' },
        {
          properties: {
            marks: {
              type: 'array',
              items: {
                anyOf: [
                  { $ref: '#/definitions/a_mark' },
                ]
              }
            }
          }
        }
      ]
    });
  });
});

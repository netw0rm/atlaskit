import * as chai from 'chai';
import { schema } from '../../test-helper/schema';
import { jsonSchema } from '../../docs-helper';
import * as ajvModule from 'ajv';

const { expect } = chai;
const Ajv = ((ajvModule as any).default || ajvModule);
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema(schema));

describe('ak-editor-core: schema as JSON Schema', () => {
  it('permits a paragraph with text', () => {
    expect(validate({
      'type': 'doc',
      'content': [
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'text': 'Foo'
            }
          ]
        }
      ]
    })).to.be.true;
  });

  it('permits a paragraph with no content', () => {
    expect(validate({
      'type': 'doc',
      'content': [
        {
          'type': 'paragraph',
        }
      ]
    })).to.be.true;
  });

  it('permits a paragraph with strong text', () => {
    expect(validate({
      'type': 'doc',
      'content': [
        {
          'type': 'paragraph',
          'content': [
            {
              'type': 'text',
              'marks': [
                {
                  '_': 'strong'
                }
              ],
              'text': 'foo'
            }
          ]
        }
      ]
    })).to.be.true;
  });

  it('does not permit a code_block with strong ext', () => {
    expect(validate({
      'type': 'doc',
      'content': [
        {
          'type': 'code_block',
          'content': [
            {
              'type': 'text',
              'marks': [
                {
                  '_': 'strong'
                }
              ],
              'text': 'foo'
            }
          ]
        }
      ]
    })).to.be.false;
  });
});


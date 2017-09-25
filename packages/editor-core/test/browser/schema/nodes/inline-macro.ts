import { expect } from 'chai';
import { inlineMacro } from '../../../../src';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema inlineMacro node', () => {
  describe('parse html', () => {
    it('converts to inline macro', () => {
      const doc = fromHTML(`
        <span
          data-node-type="inlineMacro"
        />
        `, schema);

      const inlineMacroNode = doc.firstChild!.firstChild!;

      expect(inlineMacroNode.type.spec).to.equal(inlineMacro);
    });

    it('gets attributes from html', () => {
      const id = '12345';
      const name = 'status';
      const placeholderUrl = 'www.google.com/placeholder.png';
      const params = '{"color": "yellow", "text": "In progress"}';
      const doc = fromHTML(`
      <span
        data-node-type="inlineMacro"
        data-id="${id}"
        data-name="${name}"
        data-placeholder-url="${placeholderUrl}"
        data-params='${params}'
      />
      `, schema);

      const inlineMacroNode = doc.firstChild!.firstChild!;

      expect(inlineMacroNode.attrs.id).to.equal(id);
      expect(inlineMacroNode.attrs.name).to.equal(name);
      expect(inlineMacroNode.attrs.placeholderUrl).to.equal(placeholderUrl);
      expect(inlineMacroNode.attrs.params).to.deep.equal({ color: 'yellow', text: 'In progress' });
    });
  });

  describe('encode html', () => {
    it('converts html data attributes to node attributes', () => {
      const id = 'abcdefg';
      const name = 'status';
      const placeholderUrl = 'www.google.com/placeholder.png';
      const params = { color: 'green', text: 'Decided' };

      const inlineMacroNode = schema.nodes.inlineMacro.create(
        {
          id, name, placeholderUrl, params
        });

      const inlineMacroDOM = toDOM(inlineMacroNode, schema).firstChild as HTMLElement;

      expect(inlineMacroDOM.dataset.nodeType).to.equal('inlineMacro');
      expect(inlineMacroDOM.dataset.id).to.equal(id);
      expect(inlineMacroDOM.dataset.name).to.equal(name);
      expect(inlineMacroDOM.dataset.placeholderUrl).to.equal(placeholderUrl);
      expect(inlineMacroDOM.dataset.params).to.equal('{"color":"green","text":"Decided"}');
    });

    it('encodes and decodes to the same node', () => {
      const id = '56789';
      const name = 'aInlineMacro';
      const placeholderUrl = 'www.google.com/placeholder.png';
      const params = { color: 'red', text: 'At risk' };

      const inlineMacroNode = schema.nodes.inlineMacro.create(
        {
          id, name, placeholderUrl, params
        });

      const inlineMacroDOM = toDOM(inlineMacroNode, schema).firstChild as HTMLElement;
      const parsedInlineMacro = fromHTML(inlineMacroDOM.outerHTML, schema).firstChild!.firstChild!;

      expect(parsedInlineMacro).to.deep.equal(inlineMacroNode);
    });
  });
});

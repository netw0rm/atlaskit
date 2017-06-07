import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../src';
import { Fragment, Node } from '../../../src/prosemirror';
import { chaiPlugin, li, p, ul } from '../../../src/test-helper';
import { visitAndReplace, visitAndReplaceFragment, VisitReplacer } from '../../../src/utils';

chai.use(chaiPlugin);

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'bulletList', 'listItem'],
    marks: ['textColor']
  });
}

describe('utils', () => {

  const schema = makeSchema();

  describe('visitAndReplace', () => {
    it('should copy a single node exactly when no replacement candidates', () => {
      // build a single node
      let redColour = { color: '#ff0000' };
      const original = schema.text('abc', [schema.marks.textColor.create(redColour)]);

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => false,
        replace: (node: Node) => []
      };

      const copy = visitAndReplace(original, replacer);

      expect(copy.length).to.equal(1);
      let copiedNode = copy[0];
      expect(copiedNode).not.to.equal(original);
      expect(copiedNode).to.deep.equal(original);

      // some extract paranoia just to make sure
      expect(copiedNode.text).to.equal('abc');
      expect(copiedNode.marks[0].attrs['color']).to.equal(redColour.color);
    });

    it('should replace a single node with multiple nodes correctly', () => {
      const original = p();

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => node.type.name === schema.nodes.paragraph.name,
        replace: (node: Node) => {
          return [
            p('abc'),
            p('def'),
            p('ghi')
          ];
        }
      };

      const copy = visitAndReplace(original, replacer);

      expect(copy.length).to.equal(3);
      expect(copy[0]).to.deep.equal(p('abc'));
      expect(copy[1]).to.deep.equal(p('def'));
      expect(copy[2]).to.deep.equal(p('ghi'));
    });

    it('should copy nodes with children exactly when no replacement candidates', () => {
      const original = ul(li('abc'), li('def'));

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => false,
        replace: (node: Node) => []
      };

      const copy = visitAndReplace(original, replacer);

      expect(copy.length).to.equal(1);
      expect(copy[0]).not.to.equal(original);
      expect(copy[0]).to.deep.equal(original);
    });

    it('should handle a replacer which returns no replacement nodes for a nested node', () => {
      const original = ul(li(ul(li('nested'))));

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => {
          return node.type.name === schema.nodes.listItem.name
            && node.firstChild !== undefined
            && node.firstChild.isText
            && node.firstChild.text === 'nested';
        },
        replace: (node: Node) => []
      };

      const copy = visitAndReplace(original, replacer);

      const expected = ul(li(ul()));
      expect(copy.length).to.equal(1);
      expect(copy[0]).to.deep.equal(expected);
    });

    it('should handle a replacer which returns no replacement nodes for a top level node', () => {
      const original = p();

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => {
          return node.type.name === schema.nodes.paragraph.name ;
        },
        replace: (node: Node) => []
      };

      const copy = visitAndReplace(original, replacer);

      expect(copy.length).to.equal(0);
    });

    it('should ignore the children of a replaced node', () => {
      const original = ul(li('abc'), li('def'), li('ghi'));

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => {
          return node.type.name === schema.nodes.bulletList.name ;
        },
        replace: (node: Node) => [p('monkey trousers')]
      };

      const copy = visitAndReplace(original, replacer);

      expect(copy.length).to.equal(1);
      expect(copy[0]).to.deep.equal(p('monkey trousers'));
    });
  });

  describe('visitAndReplaceFragment', () => {
    it('should handle empty Fragment', () => {
      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => false,
        replace: (node: Node) => []
      };

      const copy = visitAndReplaceFragment(Fragment.fromArray([]), replacer);
      expect(copy.childCount).to.equal(0);
    });

    it('should replace all nodes in a Fragment', () => {
      const original = Fragment.fromArray([ p('abc'), p('def'), p('ghi') ]);

      const replacer: VisitReplacer = {
        isCandidate: (node: Node) => node.type.name === schema.nodes.paragraph.name,
        replace: (node: Node) => [ p('z'), p('z') ]
      };

      const copy = visitAndReplaceFragment(original, replacer);
      expect(copy.childCount).to.equal(6);
      copy.forEach((node: Node, offset: number, index: number) => {
        expect(node.type.name).to.equal(schema.nodes.paragraph.name);
        expect(node.textContent).to.equal('z');
      });
    });
  });
});

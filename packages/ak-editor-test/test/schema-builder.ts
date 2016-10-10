import { p, text, nodeFactory, markFactory, sequence, RefsTracker } from '../src/schema-builder';
import { expect } from 'chai';

describe('ak-editor-test schema-builder', () => {
  const clone = (object = {}) => Object.assign({}, object);

  describe('text', () => {
    it('returns a refs tracking node for an empty string', () => {
      const nodes = text('');

      expect(nodes).to.be.an.instanceOf(RefsTracker);
      expect(nodes.refs).to.deep.equal({});
    });

    it('returns a refs tracking node for a string with a single ref only', () => {
      const nodes = text('{a}');

      expect(nodes).to.be.an.instanceOf(RefsTracker);
      expect(nodes.refs).to.deep.equal({ a: 0 });
    });

    it('returns a refs tracking node for a string with multiple refs only', () => {
      const nodes = text('{a}{b}');

      expect(nodes).to.be.an.instanceOf(RefsTracker);
      expect(nodes.refs).to.deep.equal({ a: 0, b: 0 });
    });

    it('returns a single text node for a non-empty string', () => {
      const nodes = text('0');

      expect(nodes).to.be.not.null;
    });

    it('adds a refs object to the return node', () => {
      const node = text('0');

      expect(node).to.have.property('refs');
      expect(node.refs).to.deep.equal({});
    });

    it('supports refs at the start of a string', () => {
      const node = text('{a}0');

      expect(node.refs).to.deep.equal({ a: 0 });
    });

    it('supports multiple refs at the start of a string', () => {
      const node = text('{a}{b}0');

      expect(node.refs).to.deep.equal({ a: 0, b: 0 });
    });

    it('supports ref in the middle of a string', () => {
      const node = text('0{a}1');

      expect(node.refs).to.deep.equal({ a: 1 });
    });

    it('supports multiple refs in the middle of a string', () => {
      const node = text('0{a}{b}1');

      expect(node.refs).to.deep.equal({ a: 1, b: 1 });
    });

    it('supports a ref at the end of a string', () => {
      const node = text('0{a}');

      expect(node.refs).to.deep.equal({ a: 1 });
    });

    it('supports text with no refs', () => {
      const node = text('0');

      expect(Object.keys(node.refs)).to.be.empty;
    });
  });

  describe('nodeFactory', () => {
    it('returns a function', () => {
      expect(nodeFactory('paragraph', {})).to.be.an.instanceOf(Function);
    });

    it('returns a factory that returns ref\'d nodes', () => {
      const p = nodeFactory('paragraph', {});

      expect(p()).to.have.property('refs');
    });

    it('correctly calculates flat node ref positions', () => {
      const p = nodeFactory('paragraph', {});
      const node = p('t{a}ex{b}t');
      const { a, b } = node.refs;

      expect(node.textBetween(a, b)).to.equal('ex');
    });

    it('correctly calculates flat node ref positions with refs tracking node', () => {
      const p = nodeFactory('paragraph', {});
      const node = p('{a}', 'text', '{b}');
      const { a, b } = node.refs;

      expect(node.textBetween(a, b)).to.equal('text');
    });

    it('correctly calculates single nested node ref positions', () => {
      const p = nodeFactory('paragraph', {});
      const node = p(p('t{a}ex{b}t'));
      const { a, b } = node.refs;

      expect(node.textBetween(a, b)).to.equal('ex');
    });

    it('correctly calculates twice nested node ref positions', () => {
      const p = nodeFactory('paragraph', {});
      const node = p(p(p('t{a}ex{b}t')));
      const { a, b } = node.refs;

      expect(node.textBetween(a, b)).to.equal('ex');
    });

    it('supports a < ref', () => {
      const node = text('{<}0');

      expect(node.refs).to.deep.equal({ '<': 0 });
    });
  });

  describe('markFactory', () => {
    const em = markFactory('em', {});

    it('returns a function', () => {
      expect(markFactory('em', {})).to.be.an.instanceOf(Function);
    });

    it('returns a builder that returns an array', () => {
      expect(em()).to.be.an.instanceOf(Array);
    });

    it('correctly calculates refs', () => {
      const node = p(em('t{a}ex{b}t'));
      const { a, b } = node.refs;
      expect(node.textBetween(a, b)).to.equal('ex');
    });

    it('supports being composed with text() and maintaining refs', () => {
      const node = p(em(text('t{a}ex{b}t')));
      const { a, b } = node.refs;
      expect(node.textBetween(a, b)).to.equal('ex');
    });

    it('supports being composed with multiple text() and maintaining refs', () => {
      const node = p(em(text('t{a}ex{b}t'), text('t{c}ex{d}t')));
      const { a, b, c, d } = node.refs;
      expect(node.textBetween(a, b)).to.equal('ex');
      expect(node.textBetween(c, d)).to.equal('ex');
    });
  });

  describe('sequence', () => {
    it('makes no changes to nodes with no refs', () => {
      const a = text('0');
      const b = text('0');
      const arefsSnapshot = clone(a.refs);
      const brefsSnapshot = clone(b.refs);

      sequence(a, b);
      expect(a.refs).to.deep.equal(arefsSnapshot);
      expect(b.refs).to.deep.equal(brefsSnapshot);
    });

    it('makes no changes to nodes with refs', () => {
      const a = text('0{a}');
      const b = text('0{a}');
      const arefsSnapshot = clone(a.refs);
      const brefsSnapshot = clone(b.refs);

      sequence(a, b);
      expect(a.refs).to.deep.equal(arefsSnapshot);
      expect(b.refs).to.deep.equal(brefsSnapshot);
    });

    it('returns an array of the nodes', () => {
      const a = text('0{a}');
      const b = text('0{b}');
      const c = text('0{c}');

      const { nodes } = sequence(a, b, c);
      expect(nodes).to.deep.equal([a, b, c]);
    });

    it('returns refs with keys for each ref in the children node refs', () => {
      const a = text('0{a}');
      const b = text('0{b}');
      const c = text('0{c}');

      const { refs } = sequence(a, b, c);
      expect(Object.keys(refs)).to.deep.equal(['a', 'b', 'c']);
    });

    it('returns refs with correct positions for text nodes', () => {
      const a = text('0{a}');
      const b = text('0{b}');
      const c = text('0{c}');

      const { refs } = sequence(a, b, c);
      expect(refs['a']).to.equal(1);
      expect(refs['b']).to.equal(2);
      expect(refs['c']).to.equal(3);
    });

    it('returns refs with correct positions for refs tracking nodes', () => {
      const a = text('{a}');
      const b = text('b');
      const c = text('{c}');

      const { refs } = sequence(a, b, c);
      expect(refs['a']).to.equal(0);
      expect(refs['c']).to.equal(1);
    });

    it('returns refs with correct positions for mixed nodes', () => {
      const a = text('0{a}');
      const b = p('0{b}');
      const c = text('0{c}');

      const { refs } = sequence(a, b, c);
      expect(refs['a']).to.equal(1);
      expect(refs['b']).to.equal(3);
      expect(refs['c']).to.equal(5);
    });

    it('returns refs with correct positions for nested tracking nodes', () => {
      const a = p(p('{a}'));

      const { refs } = sequence(a);
      expect(refs['a']).to.equal(2);
    });
  });
});

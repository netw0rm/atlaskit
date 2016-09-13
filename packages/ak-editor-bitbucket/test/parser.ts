import { Parser } from '../src/parser';
import { Schema } from 'ak-editor-prosemirror';
import { chaiPlugin, doc, p, text,
         h1, h2, h3, h4, h5, h6, hr } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';

chai.use(chaiPlugin);

const parse = (new Parser()).parse;

// Based on https://bitbucket.org/tutorials/markdowndemo
describe('Parse Bitbucket rendered HTML', () => {
  describe('block elements', () => {
    it('should support level 1 to 6 headings', () => {
      expect(parse('<h1>text</h1>')).to.deep.equal(doc(h1('text')));
      expect(parse('<h2>text</h2>')).to.deep.equal(doc(h2('text')));
      expect(parse('<h3>text</h3>')).to.deep.equal(doc(h3('text')));
      expect(parse('<h4>text</h4>')).to.deep.equal(doc(h4('text')));
      expect(parse('<h5>text</h5>')).to.deep.equal(doc(h5('text')));
      expect(parse('<h6>text</h6>')).to.deep.equal(doc(h6('text')));
    });

    it('should support paragraphs', () => {
      expect(parse('<p>text</p>')).to.deep.equal(doc(p('text')));
    });

    it('should support horizontal rules', () => {
      expect(parse('<hr>')).to.deep.equal(doc(hr));
    });
  });

  describe('inline elements', () => {
    it('should support emphasis');

    it('should support strikethrough');

    it('should support inline preformatted code');

    it('should support links');

    it('should support images');
  });

  describe('blockquotes', () => {
    it('should support blockquotes');

    it('should support nested blockquotes');

    it('should support blockquotes containing other block level elements');
  });

  describe('lists', () => {
    it('should support ordered (numbered) lists');

    it('should support unordered (bulleted) lists');

    it('should supprt embedding lists in lists');

    it('should supprt list items that consist of multiple paragrpahs');

    it('should support list items that consits of multiple paragraphs and embedded lists');

    it('should support embedding blockquotes in a list item');

    it('should support embdding code blocks in a list item');
  });

  describe('tables', () => {
    it('should strip content in tables into paragraphs');
  });

  describe('code blocks', () => {
    it('should preserve the identation in lines');

    it('should preserve the language as an attribute');
  });

  describe('mentions', () => {
    it('should extract the username and store as the entity id');
  });

  describe('emojis', () => {
    it('should extract the emoji name and store as the entity id');
  });

  describe('linkified content and object links', () => {
    it('should strip the link from a commit hash');
    it('should strip the link from a issue or PR link');
  });
});

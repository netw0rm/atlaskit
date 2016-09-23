import parse from '../src/parse-html';
import { Schema } from 'ak-editor-prosemirror';
import { chaiPlugin, doc, p, text,
         h1, h2, h3, h4, h5, h6, hr, img } from 'ak-editor-test';
import * as chai from 'chai';
import { expect } from 'chai';
import schema from 'ak-editor-schema';

chai.use(chaiPlugin);

const createMark = (mark: string, attrs?: {}) => schema.marks[mark].create(attrs);

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

    it('should support images', () => {
      const parsed = parse('<p><img alt="Alt text" src="http://path/to/image.jpg"></p>')
      expect(parsed).to.deep.equal(doc(p(img({ src: "http://path/to/image.jpg", alt: "Alt text", title: "" }))));
    });
  });

  describe('inline elements', () => {
    it('should support emphasis', () => {
      const em = createMark('em');
      expect(parse('<p><em>text</em></p>')).to.have.textWithMarks('text', [ em ]);
    });

    it('should support strong', () => {
      const strong = createMark('strong');
      expect(parse('<p><strong>text</strong></p>')).to.have.textWithMarks('text', [ strong ]);
    });

    it('should support strikethrough', () => {
      const del = createMark('del');
      expect(parse('<p><del>text</del></p>')).to.have.textWithMarks('text', [ del ]);
    });

    it('should support inline preformatted code', () => {
      const code = createMark('code');
      expect(parse('<p><code>text</code></p>')).to.have.textWithMarks('text', [ code ]);
    });

    it('should support links', () => {
      const link = createMark('link', { href: 'http://example.com' });
      expect(parse('<p><a href="http://example.com">example link</a></p>')).to.have.textWithMarks('example link', [ link ]);
    });

    it('should support both strong and em', () => {
      const em = createMark('em');
      const strong = createMark('strong');
      expect(parse('<p><strong><em>text</em></strong></p>')).to.have.textWithMarks('text', [em, strong]);
    });
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

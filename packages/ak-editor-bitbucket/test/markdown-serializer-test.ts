import markdownSerializer from '../src/markdown-serializer';
import {
  doc, text, p, pre, img, code, strong, blockquote, hr,
  h1, h2, h3, h4, h5, h6, ol, ul, li, br, a, em, del
} from 'ak-editor-test';
import { expect } from 'chai';

describe('Bitbucket markdown serializer', () => {
  it('should serialize paragraphs', () => {
    expect(markdownSerializer.serialize(doc(p(text('foo'))))).to.eq('foo');
    expect(markdownSerializer.serialize(doc([
      p(text('foo')),
      p(text('bar')),
    ]))).to.eq('foo\n\nbar');

    const longText = 'foo '.repeat(100);
    expect(markdownSerializer.serialize(doc([
      p(text(longText)),
      p(text(longText))
    ]))).to.eq(`${longText}\n\n${longText}`);
  });

  describe('code block', () => {
    it('with simple text should be serialized', () => {
      expect(markdownSerializer.serialize(doc(pre(text('foo'))))).to.eq('    foo');
    });

    it('with newlines preserves newlines in markdown', () => {
      expect(markdownSerializer.serialize(doc([
        pre(text('foo\nbar')),
      ]))).to.eq('    foo\n    bar');
    });

    it('with adjacent code block keeps empty space between', () => {
      expect(markdownSerializer.serialize(doc([
        pre(text('foo')),
        pre(text('bar')),
      ]))).to.eq('    foo\n\n    bar');
    });

    it('with attributes uses backtick notation and preserves attributes', () => {
      expect(markdownSerializer.serialize(doc([
        pre(text('foo'), 'js'),
      ]))).to.eq('```js\nfoo\n```');

      expect(markdownSerializer.serialize(doc([
         pre(text('foo\nbar'), 'js'),
      ]))).to.eq('```js\nfoo\nbar\n```');
    });

    it('with no text is preserved', () => {
      expect(markdownSerializer.serialize(doc([
        pre(text('')),
      ]))).to.eq('    ');

      expect(markdownSerializer.serialize(doc([
        pre(),
      ]))).to.eq('    ');

      expect(markdownSerializer.serialize(doc([
        pre(),
      ]))).to.eq('    ');
    });
  });

  it('should serialize headings (level 1 - 6)', () => {
    expect(markdownSerializer.serialize(doc(h1(text('level 1'))))).to.eq('# level 1');
    expect(markdownSerializer.serialize(doc(h2(text('level 2'))))).to.eq('## level 2');
    expect(markdownSerializer.serialize(doc(h3(text('level 3'))))).to.eq('### level 3');
    expect(markdownSerializer.serialize(doc(h4(text('level 4'))))).to.eq('#### level 4');
    expect(markdownSerializer.serialize(doc(h5(text('level 5'))))).to.eq('##### level 5');
    expect(markdownSerializer.serialize(doc(h6(text('level 6'))))).to.eq('###### level 6');

    expect(markdownSerializer.serialize(doc([
      h1(text('foo')),
      h2(text('bar')),
      p(text('baz')),
    ]))).to.eq(`# foo\n\n## bar\n\nbaz`);
  });

  it('should serialize horizontal_rule', () => {
    expect(markdownSerializer.serialize(doc(hr))).to.eq('---');
    expect(markdownSerializer.serialize(doc([
      p(text('foo')),
      hr,
      p(text('bar')),
    ]))).to.eq('foo\n\n---\n\nbar');
  });

  describe('bullet list', () => {
    it('with elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(ul([
        li(p(text('foo'))),
        li(p(text('bar'))),
        li(p(text('baz'))),
      ])))).to.eq('* foo\n* bar\n* baz');
    });

    it('surrounded with other block elements keeps empty line between', () => {
      expect(markdownSerializer.serialize(doc([
        p(text('para')),
        ul([
          li(p(text('foo'))),
          li(p(text('bar'))),
        ]),
        p(text('baz')),
      ]))).to.eq('para\n\n* foo\n* bar\n\nbaz');
    });

    it('with code block preserves indentation', () => {
      expect(markdownSerializer.serialize(doc([
        ul([
          li([
            p('item'),
            pre(text('code\nblock')),
          ])
        ])
      ]))).to.eq('* item\n\n      code\n      block');
    });

    it('with one empty element is preserved', () => {
      expect(markdownSerializer.serialize(doc(ul([li()])))).to.eq('* ');
    });
  });

  describe('ordered list', () => {
    it('with elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(ol([
        li(p(text('foo'))),
        li(p(text('bar'))),
        li(p(text('baz'))),
      ])))).to.eq('1. foo\n2. bar\n3. baz');
    });

    it('surrounded with other block elements keeps empty line between', () => {
      expect(markdownSerializer.serialize(doc([
        p(text('para')),
        ol([
          li(p(text('foo'))),
          li(p(text('bar'))),
        ]),
        p(text('baz')),
      ]))).to.eq('para\n\n1. foo\n2. bar\n\nbaz');
    });

    it('with 10+ elements aligns numbers to right', () => {
      expect(markdownSerializer.serialize(doc(ol([
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
        li(p(text('item'))),
      ])))).to.eq(' 1. item\n 2. item\n 3. item\n 4. item\n 5. item\n 6. item\n 7. item\n 8. item\n 9. item\n10. item');
    });

    it('with code block preserves indentation', () => {
      expect(markdownSerializer.serialize(doc([
        ol([
          li([
            p('item'),
            pre(text('code\nblock')),
          ])
        ])
      ]))).to.eq('1. item\n\n       code\n       block');
    });

    it('with one empty element is preserved', () => {
      expect(markdownSerializer.serialize(doc(ol([li()])))).to.eq('1. ');
    });
  });

  describe('image', () => {
    it('with no alt to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com'
      })))).to.eq('![](http://example.com)');
    });

    it('with alt and no title to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image'
      })))).to.eq('![an image](http://example.com)');
    });

    it('with alt and title to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a title'
      })))).to.eq('![an image](http://example.com "a title")');
    });

    it('with title containing double-quote to serialize without escaping', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a " "title"'
      })))).to.eq('![an image](http://example.com "a " "title"")');
    });

    it('with alt containing quotes to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: '\'an\' "image"'
      })))).to.eq('![\'an\' "image"](http://example.com)');
    });

    it('inline with text to serialize', () => {
      expect(markdownSerializer.serialize(doc([
        p([
          text('foo '),
          img({
            src: 'http://example.com',
            alt: 'an image',
            title: 'a title'
          }),
          text(' bar'),
        ])
      ]))).to.eq('foo ![an image](http://example.com "a title") bar');
    });

    it('in blockquote to serialize', () => {
      expect(markdownSerializer.serialize(doc([
        blockquote([
          p([
            img({
              src: 'http://example.com',
              alt: 'an image',
              title: 'a title'
            }),
            text(' foo')
          ])
        ])
      ]))).to.eq('> ![an image](http://example.com "a title") foo');

      expect(markdownSerializer.serialize(doc([
        blockquote([
          blockquote([
            p([
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              text(' foo')
            ])
          ])
        ])
      ]))).to.eq('> > ![an image](http://example.com "a title") foo');
    });
  });

  it('should serialize hard_break to newline', () => {
    expect(markdownSerializer.serialize(doc(
      p([text('foo '), br, text('bar')])
    ))).to.eq('foo \nbar');
  });

  describe('blockquotes', () => {
    it('of any level should serialized', () => {
      expect(markdownSerializer.serialize(doc(blockquote(p(text('foo')))))).to.eq('> foo');
      expect(markdownSerializer.serialize(doc(blockquote(blockquote(p(text('foo'))))))).to.eq('> > foo');
      expect(markdownSerializer.serialize(doc([
        blockquote(p(text('foo'))),
        blockquote(blockquote(p(text('bar')))),
        blockquote(blockquote(blockquote(p(text('baz'))))),
        blockquote(p(text('bar'))),
      ]))).to.eq('> foo\n\n> > bar\n\n> > > baz\n\n> bar');
    });

    it('containing other elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(blockquote(hr)))).to.eq('> ---');
      expect(markdownSerializer.serialize(doc([
        blockquote([
          p('foo'),
          hr,
          h2('bar'),
          blockquote([
            hr,
            p('baz')
          ])
        ]),
      ]))).to.eq('> foo\n>\n> ---\n>\n> ## bar\n>\n> > ---\n> >\n> > baz');
    });
  });
});

describe('marks -', () => {
  it('should serialize em', () => {
    expect(markdownSerializer.serialize(doc(p(em(text('foo')))))).to.eq('*foo*');
    expect(markdownSerializer.serialize(doc(p(
      text('foo '),
      em(text('bar')),
      text(' baz'),
    )))).to.eq('foo *bar* baz');
  });

  it('should serialize strong', () => {
    expect(markdownSerializer.serialize(doc(p(strong(text('foo')))))).to.eq('**foo**');
    expect(markdownSerializer.serialize(doc(p(
      text('foo '),
      strong(text('bar bar')),
      text(' baz'),
    )))).to.eq('foo **bar bar** baz');
  });

  it('should serialize strikethrough', () => {
    expect(markdownSerializer.serialize(doc(p(del(text('foo')))))).to.eq('~~foo~~');
    expect(markdownSerializer.serialize(doc(p(
      text('foo '),
      del(text('bar bar')),
      text(' baz'),
    )))).to.eq('foo ~~bar bar~~ baz');
  });

  it('should serialize inline code', () => {
    it('should serialize em', () => {
      expect(markdownSerializer.serialize(doc(p(code(text('foo')))))).to.eq('`foo`');
      expect(markdownSerializer.serialize(doc(p(
        text('foo '),
        code(text('bar baz')),
        text(' foo'),
      )))).to.eq('foo `bar baz` foo');
    });
  });

  describe('links', () => {
    it('with no text to be ignored', () => {
      let link = a({ href: 'http://example.com' });

      expect(markdownSerializer.serialize(doc(p(
        link(text('')),
      )))).to.eq('');
    });

    it('with no title to serialize', () => {
      let link = a({ href: 'http://example.com' });

      expect(markdownSerializer.serialize(doc(p(
        link(text('foo')),
      )))).to.eq('[foo](http://example.com)');
    });

    it('with title to serialize', () => {
      let link = a({
        href: 'http://example.com',
        title: 'title'
      });

      expect(markdownSerializer.serialize(doc(p(
        link(text('foo')),
      )))).to.eq('[foo](http://example.com "title")');
    });

    it('with title containing double-quotes to serialize', () => {
      let link = a({
        href: 'http://example.com',
        title: 'some " "title"'
      });

      expect(markdownSerializer.serialize(doc(p(
        link(text('foo')),
      )))).to.eq('[foo](http://example.com "some " "title"")');
    });

    it('with alt and title to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a title'
      })))).to.eq('![an image](http://example.com "a title")');
    });

    it('with title containing double-quote to serialize without escaping', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a " "title"'
      })))).to.eq('![an image](http://example.com "a " "title"")');
    });

    it('with alt containing quotes to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: '\'an\' "image"'
      })))).to.eq('![\'an\' "image"](http://example.com)');
    });

    it('inline with text to serialize', () => {
      expect(markdownSerializer.serialize(doc([
        p([
          text('foo '),
          img({
            src: 'http://example.com',
            alt: 'an image',
            title: 'a title'
          }),
          text(' bar'),
        ])
      ]))).to.eq('foo ![an image](http://example.com "a title") bar');
    });

    it('in blockquote to serialize', () => {
      expect(markdownSerializer.serialize(doc([
        blockquote([
          p([
            img({
              src: 'http://example.com',
              alt: 'an image',
              title: 'a title'
            }),
            text(' foo')
          ])
        ])
      ]))).to.eq('> ![an image](http://example.com "a title") foo');

      expect(markdownSerializer.serialize(doc([
        blockquote([
          blockquote([
            p([
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              text(' foo')
            ])
          ])
        ])
      ]))).to.eq('> > ![an image](http://example.com "a title") foo');
    });

    it('in heading to serialize', () => {
      expect(markdownSerializer.serialize(doc([
        h1([
          p([
            img({
              src: 'http://example.com',
              alt: 'an image',
              title: 'a title'
            }),
            text(' foo')
          ])
        ])
      ]))).to.eq('# ![an image](http://example.com "a title") foo');

      expect(markdownSerializer.serialize(doc([
        h2([
          p([
            img({
              src: 'http://example.com',
              alt: 'an image',
              title: 'a title'
            }),
            text(' foo')
          ])
        ])
      ]))).to.eq('## ![an image](http://example.com "a title") foo');
    });
  });

  describe('emphasis -', () => {
    it('asterisk within strings should be escaped', () => {
      expect(markdownSerializer.serialize(doc(p(
        text('*foo bar*'),
      )))).to.eq('\\*foo bar\\*');

      expect(markdownSerializer.serialize(doc(p(
        text('**foo bar**'),
      )))).to.eq('\\*\\*foo bar\\*\\*');

      expect(markdownSerializer.serialize(doc(p(
        text('***foo bar***'),
      )))).to.eq('\\*\\*\\*foo bar\\*\\*\\*');
    });

    it('underscore within strings should be escaped', () => {
      expect(markdownSerializer.serialize(doc(p(
        text('_foo bar_'),
      )))).to.eq('\\_foo bar\\_');

      expect(markdownSerializer.serialize(doc(p(
        text('__foo bar__'),
      )))).to.eq('\\_\\_foo bar\\_\\_');

      expect(markdownSerializer.serialize(doc(p(
        text('___foo bar___'),
      )))).to.eq('\\_\\_\\_foo bar\\_\\_\\_');
    });


    it('"strong em" should be escaped in its entirety', () => {
      expect(markdownSerializer.serialize(doc(p(
        text('***strong**em*')
      )))).to.eq('\\*\\*\\*strong\\*\\*em\\*');
    });

    it('"smart em" should be escaped in its entirety', () => {
      expect(markdownSerializer.serialize(doc(p(
        text('_smart_emphasis_')
      )))).to.eq('\\_smart\\_emphasis\\_');
    });

    it('combinations should be properly serialized', () => {
      expect(markdownSerializer.serialize(doc(p(
        del(strong(text('foo bar baz')))
      )))).to.eq('**~~foo bar baz~~**');

      expect(markdownSerializer.serialize(doc(p(
        strong(del(text('foo bar')), text(' baz')),
      )))).to.eq('**~~foo bar~~ baz**');

      expect(markdownSerializer.serialize(doc(p(
        em(del(text('foo bar')), text(' baz')),
      )))).to.eq('*~~foo bar~~ baz*');
    });
  });
});

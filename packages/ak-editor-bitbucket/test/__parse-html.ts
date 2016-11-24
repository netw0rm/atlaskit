import parse from '../src/parse-html';
import { Schema } from 'ak-editor-prosemirror';
import { chaiPlugin } from 'ak-editor-test';
import {
  a, blockquote, code, code_block, doc, emoji, strong,
  h1, h2, h3, h4, h5, h6, hr, img, ul, ol, li, p, mention
} from './_schema-builder';
import { default as chai, expect } from 'chai';;
import schema from '../src/schema';

chai.use(chaiPlugin);

const pre = code_block();

// Based on https://bitbucket.org/tutorials/markdowndemo
describe('ak-editor-bitbucket parsing Bitbucket rendered HTML', () => {
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

    it('should remove all zero-with-non-joiners', () => {
      expect(parse('<p>foo</p><p>&zwnj;</p><p>&zwnj;</p><p>bar</p>')).to.deep.equal(doc(p('foo'), p(''), p(''), p('bar')));
    });

    it('should support horizontal rules', () => {
      expect(parse('<hr>')).to.deep.equal(doc(hr));
    });

    it('should support images', () => {
      const parsed = parse('<p><img alt="Alt text" src="http://path/to/image.jpg"></p>');
      expect(parsed).to.deep.equal(doc(p(img({ src: "http://path/to/image.jpg", alt: "Alt text", title: "" }))));
    });
  });

  describe('inline elements', () => {
    it('should support emphasis', () => {
      const em = schema.marks.em.create();
      expect(parse('<p><em>text</em></p>')).to.have.textWithMarks('text', [ em ]);
    });

    it('should support strong', () => {
      const strong = schema.marks.strong.create();
      expect(parse('<p><strong>text</strong></p>')).to.have.textWithMarks('text', [ strong ]);
    });

    it('should support strikethrough', () => {
      const del = schema.marks.del.create();
      expect(parse('<p><del>text</del></p>')).to.have.textWithMarks('text', [ del ]);
    });

    it('should support inline preformatted code', () => {
      const code = schema.marks.code.create();
      expect(parse('<p><code>text</code></p>')).to.have.textWithMarks('text', [ code ]);
    });

    it('should support links', () => {
      const link = schema.marks.link.create({ href: 'http://example.com' });
      expect(parse('<p><a href="http://example.com">example link</a></p>')).to.have.textWithMarks('example link', [ link ]);
    });

    it('should support both strong and em', () => {
      const em = schema.marks.em.create();
      const strong = schema.marks.strong.create();
      expect(parse('<p><strong><em>text</em></strong></p>')).to.have.textWithMarks('text', [em, strong]);
    });
  });

  describe('blockquotes', () => {
    it('should be parsed', () => {
      expect(parse('<blockquote><p>text</p></blockquote>')).to.deep.equal(doc(blockquote(p('text'))));
    });

    it('with nested blockquotes should be parsed', () => {
      expect(parse(
        '<blockquote><blockquote><p>text</p></blockquote></blockquote>'
      )).to.deep.equal(
        doc(blockquote(blockquote(p('text'))))
      );
    });

    it('containing other block level elements should be parse', () => {
      expect(parse(
        '<blockquote>' +
          '<p>foo</p>' +
          '<ul>' +
            '<li>bar</li>' +
            '<li>baz</li>' +
          '</ul>' +
          '<h1>boo</h1>' +
        '</blockquote>'
      )).to.deep.equal(
        doc(
          blockquote(
            p('foo'),
            ul(
              li(p('bar')),
              li(p('baz')),
            ),
            h1('boo')
          )
        )
      );
    });
  });

  describe('lists', () => {
    it('that are unordered should be parsed', () => {
      expect(parse(
        '<ul>' +
          '<li>foo</li>' +
          '<li>bar</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(p('foo')),
            li(p('bar')),
          ),
        )
      );
    });

    it('that are ordered should be parsed', () => {
      expect(parse(
        '<ol>' +
          '<li>foo</li>' +
          '<li>bar</li>' +
        '</ol>'
      )).to.deep.equal(
        doc(
          ol(
            li(p('foo')),
            li(p('bar')),
          ),
        )
      );
    });

    it('that are nested and homogeneous should be parsed', () => {
      expect(parse(
        '<ol>' +
          '<li>foo</li>' +
          '<li>bar' +
            '<ol>' +
              '<li>baz</li>' +
            '</ol>' +
          '</li>' +
        '</ol>'
      )).to.deep.equal(
        doc(
          ol(
            li(p('foo')),
            li(
              p('bar'),
              ol(
                li(p('baz')),
              ),
            ),
          ),
        )
      );

      expect(parse(
        '<ul>' +
          '<li>foo</li>' +
          '<li>bar' +
            '<ul>' +
              '<li>baz</li>' +
            '</ul>' +
          '</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(p('foo')),
            li(
              p('bar'),
              ul(
                li(p('baz')),
              ),
            ),
          ),
        )
      );
    });

    it('that are nested and heterogeneous should be parsed', () => {
      expect(parse(
        '<ul>' +
          '<li>foo</li>' +
          '<li>bar' +
            '<ol>' +
              '<li>baz</li>' +
            '</ol>' +
          '</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(p('foo')),
            li(
              p('bar'),
              ol(
                li(p('baz')),
              ),
            ),
          ),
        )
      );
    });

    it('with multiple paragraphs should be parsed', () => {
      expect(parse(
        '<ul>' +
          '<li>' +
            '<p>foo</p>' +
            '<p>bar</p>' +
            '<ol>' +
              '<li>nested foo</li>' +
            '</ol>' +
            '<p>baz</p>' +
          '</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(
              p('foo'),
              p('bar'),
              ol(
                li(p('nested foo')),
              ),
              p('baz'),
            ),
          ),
        )
      );
    });

    it('should support embedding blockquotes in a list item', () => {
      expect(parse(
        '<ul>' +
          '<li>' +
            'foo' +  // NOTE: python-markdown skips <p></p> on the first line
            '<blockquote>' +
              '<p>bar</p>' +
            '</blockquote>' +
          '</li>' +
          '<li>' +
            '<p>baz</p>' +
          '</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(
              p('foo'),
              blockquote(
                p('bar')
              ),
            ),
            li(p('baz'))
          ),
        )
      );
    });

    it('should support embedding code blocks in a list item', () => {
      expect(parse(
        '<ul>' +
          '<li>' +
            '<p>foo</p>' +
            '<p>bar</p>' +
            '<div class="codehilite">' +
              '<pre><span></span><span class="kn">import</span> <span class="nn">schema</span> <span class="nn">from</span> <span class="s1">\'ak-editor-schema\'</span><span class="p">;</span></pre>' +
            '</div>' +
          '</li>' +
          '<li>' +
            '<p>baz</p>' +
          '</li>' +
        '</ul>'
      )).to.deep.equal(
        doc(
          ul(
            li(
              p('foo'),
              p('bar'),
              pre(
                'import schema from \'ak-editor-schema\';'
              ),
            ),
            li(p('baz'))
          ),
        )
      );
    });
  });

  describe('tables', () => {
    it('with header, multiple rows and columns should be converted into paragraphs', () => {
      expect(parse(
        '<table>' +
          '<thead>' +
            '<tr>' +
              '<th>First Header</th>' +
              '<th>Second Header</th>' +
              '<th>Third Header</th>' +
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            '<tr>' +
              '<td>Content Cell</td>' +
              '<td>Content Cell</td>' +
              '<td>Content Cell</td>' +
            '</tr>' +
            '<tr>' +
              '<td>Content Cell</td>' +
              '<td>Content Cell</td>' +
              '<td>Content Cell</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>'
      )).to.deep.equal(doc(
        p(strong('First Header, Second Header, Third Header')),
        p('Content Cell, Content Cell, Content Cell'),
        p('Content Cell, Content Cell, Content Cell'),
      ));
    });

    it('with a single column should be converted into paragraphs', () => {
      const result = parse(
        '<table>' +
          '<thead>' +
            '<tr>' +
              '<th>First Header</th>' +
              '<th></th>' +           // a single column table produces empty zombie cells
            '</tr>' +
          '</thead>' +
          '<tbody>' +
            '<tr>' +
              '<td>Content Cell</td>' +
              '<td></td>' +
            '</tr>' +
            '<tr>' +
              '<td>Content Cell</td>' +
              '<td></td>' +
            '</tr>' +
          '</tbody>' +
        '</table>'
      );

      expect(result).to.deep.equal(doc(
        p(strong('First Header')),
        p('Content Cell'),
        p('Content Cell'),
      ));
    });
  });

  describe('code', () => {
    it('inline should be parsed', () => {
      expect(parse(
        '<p>foo <code>bar </code>baz</p>'
      )).to.deep.equal(doc(
        p('foo ', code('bar '), 'baz')
      ));
    });

    it('blocks should be parsed preserving newlines and whitespace', () => {
      expect(parse(
        '<p>foo</p>' +
        '<div class="codehilite"><pre><span></span>    bar\n       baz\n</pre></div>'
      )).to.deep.equal(doc(
        p('foo'),
        pre('    bar\n       baz\n')
      ));
    });

    it('block with specified language should be parsed', () => {
      // TODO: Implement this after FAB-1024 is done
    });
  });

  describe('mentions', () => {
    it('should be parsed preserving display name and user id', () => {
      expect(parse(
        '<p>' +
          'foo ' +
          '<a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>' +
          ' bar' +
        '</p>'
      )).to.deep.equal(doc(
        p(
          'foo ',
          mention({displayName: 'Artur Bodera', id: 'abodera'}),
          ' bar'
        )
      ));
    });
  });

  describe('emojis', () => {
    it('should be parsed preserving emoji id', () => {
        expect(parse(
          '<p>' +
          'foo ' +
          '<img ' +
            'src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" ' +
            'alt="diamond shape with a dot inside" ' +
            'title="diamond shape with a dot inside" ' +
            'class="emoji"' +
          '>' +
          ' bar' +
          '</p>'
        )).to.deep.equal(doc(
          p(
            'foo ',
            emoji({id: 'diamond_shape_with_a_dot_inside'}),
            ' bar'
          )
        ));
    });
  });

  describe('links', () => {
    it('created manually by the user should be recreated', () => {
      const link = a({
        href: 'http://www.atlassian.com'
      });

      // The following HTML is rendered from an absolute link in markdown:
      //   [Atlassian](http://www.atlassian.com)
      expect(parse(
        '<p>' +
          'foo ' +
          '<a href="http://www.atlassian.com">Atlassian</a>' +
          ' baz' +
        '</p>'
      )).to.deep.equal(doc(
        p(
          'foo ',
          link('Atlassian'),
          ' baz'
        )
      ));
    });

    it('created automatically for paths should be preserved', () => {
      const link = a({
        href: '/atlassian/atlaskit/src/dcc507bc8d05d3101955ec509033eb47c19cb3a9/' +
              'packages/ak-editor-bitbucket/package.json'
      });

      // The following HTML is rendered in a PR comment from relative markdown link:
      //   [bar](packages/ak-editor-bitbucket/package.json)
      expect(parse(
        '<p>' +
          'foo ' +
          '<a href="/atlassian/atlaskit/src/dcc507bc8d05d3101955ec509033eb47c19cb3a9/packages/ak-editor-bitbucket/package.json">' +
            'bar' +
          '</a>' +
          ' baz' +
        '</p>'
      )).to.deep.equal(doc(
        p(
          'foo ',
          link('bar'),
          ' baz'
        )
      ));
    });

    it('with title, created manually, should be preserved', () => {
      const link = a({
        href: 'http://www.atlassian.com',
        title: 'bar'
      });

      // The following HTML is rendered from an absolute link in markdown:
      //   [Atlassian](http://www.atlassian.com)
      expect(parse(
        '<p>' +
        'foo ' +
        '<a href="http://www.atlassian.com" title="bar">Atlassian</a>' +
        ' baz' +
        '</p>'
      )).to.deep.equal(doc(
        p(
          'foo ',
          link('Atlassian'),
          ' baz'
        )
      ));
    });
  });
});

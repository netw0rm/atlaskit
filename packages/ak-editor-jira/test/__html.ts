import { parse, encode } from '../src/html';
import { chaiPlugin } from 'ak-editor-test';
import {
  br, doc, em, h1, h2, h3, h4, h5, h6, hr,
  li, mono, ol, p, strike, strong, sub, sup, u, ul
} from './_schema-builder';
import { Node } from 'ak-editor-prosemirror';
import { default as chai, expect } from 'chai';
import schema from '../src/schema';

chai.use(chaiPlugin);

const checkParse = (description: string, htmls: string[], node: Node) => {
  it(`parses HTML: ${description}`, () => {
    for (const html of htmls) {
      const actual = parse(html);
      expect(actual).to.deep.equal(node);
    }
  });
};

const checkEncode = (description: string, node: Node, html: string) => {
  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node);
    expect(html).to.deep.equal(encoded);
  });
};

const checkBuilder = (fn: any, description: string, html: string, node: Node) => {
  fn(`parses HTML: ${description}`, () => {
    const actual = parse(html);
    expect(actual).to.deep.equal(node);
  });

  fn(`encodes HTML: ${description}`, () => {
    const encoded = encode(node);
    expect(html).to.deep.equal(encoded);
  });

  fn(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node))
    expect(roundTripped).to.deep.equal(node);
  });
}

const check = (description: string, html: string, node: Node) =>
  checkBuilder(it, description, html, node);

const checkOnly = (description: string, html: string, node: Node) =>
  checkBuilder(it.only, description, html, node)

describe('ak-editor-jira html:', () => {
  describe('basic formatting:', () => {
    describe('paragraphs:', () => {
      check('empty',
        '&nbsp;',
        doc(p('')));

      check('a paragraph with text',
        '<p>Text here.</p>',
        doc(p('Text here.')));

      check('two adjacent paragraphs',
        '<p>Text here.</p><p>And more here.</p>',
        doc(
          p('Text here.'),
          p('And more here.'),
        ));

      check('a paragraph with a hard break in it',
        '<p>Text on two<br>lines.</p>',
        doc(
          p('Text on two', br, 'lines.'),
        ));
    });

    describe('breaks:', () => {
      check('a hard break in a paragraph',
        '<p>one<br>two</p>',
        doc(p('one', br, 'two')));
    });

    describe('marks formatting:', () => {
      check('<tt> tag',
        '<p>Text with <tt>monospace words</tt>.</p>',
        doc(p(
          'Text with ',
          mono('monospace words'),
          '.'
        )));

      checkParse('<tt> and <b>',
        [
          '<p>Text with <tt><b>monospace words</b></tt>.</p>',
          '<p>Text with <b><tt>monospace words</tt></b>.</p>'
        ],
        doc(p(
          'Text with ',
          strong(mono('monospace words')),
          '.'
        )));

      checkEncode('<tt> and <b>',
        doc(p(
          'Text with ',
          strong(mono('monospace words')),
          '.'
        )),
        '<p>Text with <b><tt>monospace words</tt></b>.</p>');

      check('<ins> tag',
        '<p>Text with <ins>underline words</ins>.</p>',
        doc(p(
          'Text with ',
          u('underline words'),
          '.'
        )));

    //   check('<b> tag',
    //     '<p>Text with <b>bold words</b>.</p>',
    //     doc(p(
    //       'Text with ',
    //       strong('bold words'),
    //       '.'
    //     )));

      check('<em> tag',
        '<p>Text with <em>emphasised words</em>.</p>',
        doc(p(
          'Text with ',
          em('emphasised words'),
          '.'
        )));

      check('<b> tag',
        '<p>Text with <b>strong words</b>.</p>',
        doc(p(
          'Text with ',
          strong('strong words'),
          '.'
        )));

      checkParse('<b> and <em>',
        [
          '<p>Text with <b><em>strong emphasised words</em></b>.</p>',
          '<p>Text with <em><b>strong emphasised words</b></em>.</p>'
        ],
        doc(p(
          'Text with ',
          em(strong('strong emphasised words')),
          '.'
        )));

      checkEncode('<b> and <em>',
        doc(p(
          'Text with ',
          em(strong('strong emphasised words')),
          '.'
        )),
        '<p>Text with <b><em>strong emphasised words</em></b>.</p>');

      check('<del>',
        '<p><del>struck</del></p>',
        doc(p(strike('struck'))));

    //   check('<code>',
    //     '<p>Text with <code>function bar() { return foo; }</code>.</p>',
    //     doc(p(
    //       'Text with ',
    //       code('function bar() { return foo; }'),
    //       '.'
    //     )));

      check('<sub>',
        '<p>Text with <sub>subscript emphasised words</sub>.</p>',
        doc(p(
          'Text with ',
          sub('subscript emphasised words'),
          '.'
        )));

      checkEncode('<em> and <sub>',
        doc(p(
          'Text with ',
          em(sub('subscript emphasised words')),
          '.'
        )),
        '<p>Text with <em><sub>subscript emphasised words</sub></em>.</p>');

      checkParse('<em> and <sub>',
        [
          '<p>Text with <em><sub>subscript emphasised words</sub></em>.</p>',
          '<p>Text with <sub><em>subscript emphasised words</em></sub>.</p>'
        ],
        doc(p(
          'Text with ',
          em(sub('subscript emphasised words')),
          '.'
        )));

      check('<sup>',
        '<p>Text with <sup>subscript emphasised words</sup>.</p>',
        doc(p(
          'Text with ',
          sup('subscript emphasised words'),
          '.'
        )));

      checkEncode('<em> and <sup>',
        doc(p(
          'Text with ',
          em(sup('subscript emphasised words')),
          '.'
        )),
        '<p>Text with <em><sup>subscript emphasised words</sup></em>.</p>');

      checkParse('<em> and <sup>',
        [
          '<p>Text with <em><sup>subscript emphasised words</sup></em>.</p>',
          '<p>Text with <sup><em>subscript emphasised words</em></sup>.</p>'
        ],
        doc(p(
          'Text with ',
          em(sup('subscript emphasised words')),
          '.'
        )));

    //   check('<i><code> nesting',
    //     '<p>Text <i>in italics <code>AND SOME CODE</code> and others italics</i> and plain.</p>',
    //     doc(p(
    //       'Text ',
    //       em(
    //         'in italics ',
    //         code('AND SOME CODE'),
    //         ' and others italics'
    //       ),
    //       ' and plain.'
    //     )));
    });

    describe('heading:', () => {
      check('<h1> with anchor',
        '<h1><a name="Readallaboutit%21"></a>Read all about it!</h1>',
        doc(h1('Read all about it!')));

      check('<h2> with anchor',
        '<h2><a name="Readallaboutit%21"></a>Read all about it!</h2>',
        doc(h2('Read all about it!')));

      check('<h3> with anchor',
        '<h3><a name="Readallaboutit%21"></a>Read all about it!</h3>',
        doc(h3('Read all about it!')));

      check('<h4> with anchor',
        '<h4><a name="Readallaboutit%21"></a>Read all about it!</h4>',
        doc(h4('Read all about it!')));

      check('<h5> with anchor',
        '<h5><a name="Readallaboutit%21"></a>Read all about it!</h5>',
        doc(h5('Read all about it!')));

      check('<h6> with anchor',
        '<h6><a name="Readallaboutit%21"></a>Read all about it!</h6>',
        doc(h6('Read all about it!')));

      check('<h1> with nested <b>',
        '<h1><a name="Readallaboutit%21"></a>Read all <b>about</b> it!</h1>',
        doc(
          h1(
            'Read all ',
            strong('about'),
            ' it!'
          )
        ));

      check('<h1> with nested <b><em>',
        '<h1><a name="Readallaboutit%21"></a>Read all <b><em>about</em></b> it!</h1>',
        doc(
          h1(
            'Read all ',
            strong(em('about')),
            ' it!'
          )
        ));
    });

    describe('horizontal rule', () => {
      check('<hr>',
        '<hr>',
        doc(hr()));

    //   // The XHTML parser chokes parsing these, since technically <p> only permits
    //   // phrasing content, and <hr /> is not that (it's flow content). If we determine
    //   // that we want to support HTML-ish content (where a <hr /> would split a <p />)
    //   // we should uncomment these.

    //   // check('<p><hr /></p> nesting splits the paragraph',
    //   //   '<p><hr /></p>',
    //   //   doc(p(), hr(), p()));

    //   // check('<p><hr /><hr /></p> nesting splits the paragraph once',
    //   //   '<p><hr /><hr /></p>',
    //   //   doc(p(), hr(), hr(), p()));
    });

    describe('lists', () => {
      check('bullet list',
        '<ul class="alternate" type="square"><li>one</li><li>two</li></ul>',
        doc(
          ul(
            li(p('one')),
            li(p('two'))
          )
        ));

      check('ordered list',
        '<ol><li>one</li><li>two</li></ol>',
        doc(
          ol(
            li(p('one')),
            li(p('two'))
          )
        ));


    //   check('bullet list with strong',
    //     '<ul><li>A piggy</li><li><strong>Bigger</strong> piggy</li></ul>',
    //     doc(
    //       ul(
    //         li(p('A piggy')),
    //         li(p(strong('Bigger'), ' piggy'))
    //       )
    //     ));

    //   check('ordered list',
    //     '<ol><li>A piggy</li></ol>',
    //     doc(
    //       ol(
    //         li(p('A piggy'))
    //       )
    //     ));

    //   check('ordered list with strong',
    //     '<ol><li>A piggy</li><li><strong>Bigger</strong> piggy</li></ol>',
    //     doc(
    //       ol(
    //         li(p('A piggy')),
    //         li(p(strong('Bigger'), ' piggy'))
    //       )
    //     ));
    });
  });

// Color text span
// ```````````````````````````````` xample
// <span style="color: rgb(23,43,77);">Background</span>
// .
// {"type":"doc","content":[
// 		{"type":"text","text":"Background",
// 			"marks":[{"type":"color", "attrs": { "color": "rgb(23,43,77)"}}]
// 		}
// ]}
// ````````````````````````````````

// Alignment span - @todo can these appear on anything other than a p? is this the right markup?
// ```````````````````````````````` xample
// <p style="text-align: right;">Right wing</p>
// .
// {"type":"doc","content":[ {"type":"paragraph",
// 	"attrs": {"align":"right"},
// 	"content": [{"type":"text","text":"Right wing"}]
// }]}
// ````````````````````````````````


// All the less used formatting types
// ```````````````````````````````` xample
// <s>struck</s> <del>struck</del> <u>under</u> <ins>ins</ins> <sup>high</sup> <sub>low</sub> <small>tiny</small> <big>huge</big>
// .
// {"type":"doc","content":[
// 	{"type":"text","text":"struck","marks":[{"type":"strikethrough"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"struck","marks":[{"type":"strikethrough"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"under","marks":[{"type":"underline"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"ins","marks":[{"type":"underline"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"high","marks":[{"type":"superscript"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"low","marks":[{"type":"subscript"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"tiny","marks":[{"type":"small"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"huge","marks":[{"type":"big"}]}
// ]}
// ````````````````````````````````


// ## Other Blocks
// ```````````````````````````````` xample
// <blockquote>Elementary my dear Watson</blockquote>
// .
// {"type":"doc","content":[
// 	{"type":"blockquote", "content":[
// 			{"type":"text","text":"Elementary my dear Watson"}
// 	]}
// ]}
// ````````````````````````````````
// Pre
// ```````````````````````````````` xample
// <pre>Elementary my dear Watson</pre>
// .
// {"type":"doc","content":[
// 	{"type":"pre", "content":[
// 			{"type":"text","text":"Elementary my dear Watson"}
// 	]}
// ]}
// ````````````````````````````````
});

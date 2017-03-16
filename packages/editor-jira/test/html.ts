import { Node } from '@atlaskit/editor-core';
import { chaiPlugin, markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { name } from '../package.json';
import { encode, parse } from '../src/html';
import { JIRASchema, makeSchema } from '../src/schema';

chai.use(chaiPlugin);

export const schema = makeSchema({ allowLists: false }) as JIRASchema;

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);
const br = schema.node(schema.nodes.hard_break);
const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
const h2 = nodeFactory(schema.nodes.heading, { level: 2 });
const h3 = nodeFactory(schema.nodes.heading, { level: 3 });
const h4 = nodeFactory(schema.nodes.heading, { level: 4 });
const h5 = nodeFactory(schema.nodes.heading, { level: 5 });
const h6 = nodeFactory(schema.nodes.heading, { level: 6 });
const hr = nodeFactory(schema.nodes.horizontal_rule);

// Marks
const em = markFactory(schema.marks.em);
const code = markFactory(schema.marks.code);
const strike = markFactory(schema.marks.strike);
const strong = markFactory(schema.marks.strong);
const sub = markFactory(schema.marks.subsup, { type: 'sub' });
const sup = markFactory(schema.marks.subsup, { type: 'sup' });
const u = markFactory(schema.marks.u);

function checkParse(description: string, htmls: string[], node: Node) {
  it(`parses HTML: ${description}`, () => {
    for (const html of htmls) {
      const actual = parse(html, schema);
      expect(actual).to.deep.equal(node);
    }
  });
};

function checkEncode(description: string, node: Node, html: string) {
  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema);
    expect(encoded).to.deep.equal(html);
  });
};

function check(description: string, html: string, node: Node) {
  it(`parses HTML: ${description}`, () => {
    const actual = parse(html, schema);
    expect(actual).to.deep.equal(node);
  });

  it(`encodes HTML: ${description}`, () => {
    const encoded = encode(node, schema);
    expect(html).to.deep.equal(encoded);
  });

  it(`round-trips HTML: ${description}`, () => {
    const roundTripped = parse(encode(node, schema), schema);
    expect(roundTripped).to.deep.equal(node);
  });
};

describe(`${name} html:`, () => {
  describe('paragraphs:', () => {
    check('empty',
      '',
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
      '<p>Text on two<br />lines.</p>',
      doc(
        p('Text on two', br, 'lines.'),
      ));
  });

  describe('breaks:', () => {
    check('a hard break in a paragraph',
      '<p>one<br />two</p>',
      doc(p('one', br, 'two')));

    check('multiple hard break in a paragraph',
      '<p>one<br /><br />two</p>',
      doc(p('one', br, br, 'two')));
  });

  describe('marks formatting:', () => {
    check('<tt> tag',
      '<p>Text with <tt>code words</tt>.</p>',
      doc(p(
        'Text with ',
        code('code words'),
        '.'
      )));

    checkParse('<tt> and <b>',
      [
        '<p>Text with <tt><b>code words</b></tt>.</p>',
        '<p>Text with <b><tt>code words</tt></b>.</p>'
      ],
      doc(p(
        'Text with ',
        strong(code('code words')),
        '.'
      )));

    checkEncode('<tt> and <b>',
      doc(p(
        'Text with ',
        strong(code('code words')),
        '.'
      )),
      '<p>Text with <b><tt>code words</tt></b>.</p>');

    check('<ins> tag',
      '<p>Text with <ins>underline words</ins>.</p>',
      doc(p(
        'Text with ',
        u('underline words'),
        '.'
      )));

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
    check('single <hr />',
      '<hr />',
      doc(hr()));

    check('multiple <hr />',
      '<hr /><hr />',
      doc(hr(), hr()));
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

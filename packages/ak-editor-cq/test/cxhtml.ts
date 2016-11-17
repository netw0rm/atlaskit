import { parse, encode } from '../src/cxhtml';
import { chaiPlugin } from 'ak-editor-test';
import {
  br, code, doc, em, h1, h2, h3, h4, h5, h6, hr,
  li, ol, p, strike, strong, sub, sup, u, ul
} from './_schema-builder';
import { DocNode } from 'ak-editor-schema';
import * as chai from 'chai';
import { expect } from 'chai';
import schema from '../src/schema';

chai.use(chaiPlugin);

const checkBuilder = (fn: any, description: string, cxhtml: string, node: DocNode) => {
  fn(`parses CXHTML: ${description}`, () => {
    const actual = parse(cxhtml);
    expect(actual).to.deep.equal(node);
  });

  fn(`round-trips CXHTML: ${description}`, () => {
    const roundTripped = parse(encode(node))
    expect(roundTripped).to.deep.equal(node);
  });
}

const check = (description: string, cxhtml: string, node: DocNode) =>
  checkBuilder(it, description, cxhtml, node);

const checkOnly = (description: string, cxhtml: string, node: DocNode) =>
  checkBuilder(it.only, description, cxhtml, node)

describe('ak-editor-cq encode-cxml:', () => {
  describe('basic formatting:', () => {
    describe('text:', () => {
      check('basic text',
        'War and peace',
        doc(p('War and peace')));

      check('<span> with no attributes',
        '<span>War and peace</span>',
        doc(p('War and peace')));
    });

    describe('paragraphs:', () => {
      check('a paragraph with text',
        '<p>Text here.</p>',
        doc(p('Text here.')));

      check('an empty paragraph',
        '<p></p>',
        doc(p('')));

      check('two adjacent paragraphs',
      '<p>Text here.</p>\n<p>And more here.</p>',
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
      check('a self-closing break',
        '<br />',
        doc(p(br)));

      check('a self-closing break in a paragraph',
        '<p><br /></p>',
        doc(p(br)));
    });

    describe('marks formatting:', () => {
      check('<u> tag',
        '<p>Text with <u>underline words</u>.</p>',
        doc(p(
          'Text with ',
          u('underline words'),
          '.'
        )));

      check('<strong> tag',
        '<p>Text with <strong>bold words</strong>.</p>',
        doc(p(
          'Text with ',
          strong('bold words'),
          '.'
        )));

      check('<b> tag',
        '<p>Text with <b>bold words</b>.</p>',
        doc(p(
          'Text with ',
          strong('bold words'),
          '.'
        )));

      check('<em> tag',
        '<p>Text with <em>emphasised words</em>.</p>',
        doc(p(
          'Text with ',
          em('emphasised words'),
          '.'
        )));

      check('<i> tag',
        '<p>Text with <i>emphasised words</i>.</p>',
        doc(p(
          'Text with ',
          em('emphasised words'),
          '.'
        )));

      check('<strong><em> nesting',
        '<p>Text with <strong><em>strong emphasised words</em></strong>.</p>',
        doc(p(
          'Text with ',
          em(strong('strong emphasised words')),
          '.'
        )));

      check('<em><strong> nesting',
        '<p>Text with <em><strong>strong emphasised words</strong></em>.</p>',
        doc(p(
          'Text with ',
          em(strong('strong emphasised words')),
          '.'
        )));

      check('combination of strong and emphasis',
        '<p><b>Bold words,</b> and <i><strong>strongly emphasised words</strong></i>.</p>',
        doc(
          p(
            strong('Bold words,'),
            ' and ',
            em(strong('strongly emphasised words')),
            '.'
          )
        ));

      check('<del>',
        '<del>struck</del>',
        doc(p(strike('struck'))));

      check('<s>',
        '<s>struck</s>',
        doc(p(strike('struck'))));

      check('<code>',
        '<p>Text with <code>function bar() { return foo; }</code>.</p>',
        doc(p(
          'Text with ',
          code('function bar() { return foo; }'),
          '.'
        )));

      check('<i><sub> nesting',
        '<p>Text with <i><sub>subscript emphasised words</sub></i>.</p>',
        doc(p(
          'Text with ',
          em(sub('subscript emphasised words')),
          '.'
        )));

      check('<sub><i> nesting',
        '<p>Text with <sub><i>subscript emphasised words</i></sub>.</p>',
        doc(p(
          'Text with ',
          em(sub('subscript emphasised words')),
          '.'
        )));

      check('<i><sup> nesting',
        '<p>Text with <i><sup>subscript emphasised words</sup></i>.</p>',
        doc(p(
          'Text with ',
          em(sup('subscript emphasised words')),
          '.'
        )));

      check('<sup><i> nesting',
        '<p>Text with <sup><i>subscript emphasised words</i></sup>.</p>',
        doc(p(
          'Text with ',
          em(sup('subscript emphasised words')),
          '.'
        )));

      check('<i><code> nesting',
        '<p>Text <i>in italics <code>AND SOME CODE</code> and others italics</i> and plain.</p>',
        doc(p(
          'Text ',
          em(
            'in italics ',
            code('AND SOME CODE'),
            ' and others italics'
          ),
          ' and plain.'
        )));

    });

    describe('heading:', () => {
      check('<h1>',
        '<h1>Read all about it!</h1>',
        doc(h1('Read all about it!')));

      check('<h2>',
        '<h2>Read all about it!</h2>',
        doc(h2('Read all about it!')));

      check('<h3>',
        '<h3>Read all about it!</h3>',
        doc(h3('Read all about it!')));

      check('<h4>',
        '<h4>Read all about it!</h4>',
        doc(h4('Read all about it!')));

      check('<h5>',
        '<h5>Read all about it!</h5>',
        doc(h5('Read all about it!')));

      check('<h6>',
        '<h6>Read all about it!</h6>',
        doc(h6('Read all about it!')));

      check('<h1> with nested <b>',
        '<h1>Read all <b>about</b> it!</h1>',
        doc(
          h1(
            'Read all ',
            strong('about'),
            ' it!'
          )
        ));
    });

    describe('horizontal rule', () => {
      check('<hr />',
        '<hr />',
        doc(hr()));

      // The XHTML parser chokes parsing these, since technically <p> only permits
      // phrasing content, and <hr /> is not that (it's flow content). If we determine
      // that we want to support HTML-ish content (where a <hr /> would split a <p />)
      // we should uncomment these.

      // check('<p><hr /></p> nesting splits the paragraph',
      //   '<p><hr /></p>',
      //   doc(p(), hr(), p()));

      // check('<p><hr /><hr /></p> nesting splits the paragraph once',
      //   '<p><hr /><hr /></p>',
      //   doc(p(), hr(), hr(), p()));
    });

    describe('lists', () => {
      check('bullet list',
        '<ul><li>A piggy</li></ul>',
        doc(
          ul(
            li(p('A piggy'))
          )
        ));

      check('bullet list with strong',
        '<ul><li>A piggy</li><li><strong>Bigger</strong> piggy</li></ul>',
        doc(
          ul(
            li(p('A piggy')),
            li(p(strong('Bigger'), ' piggy'))
          )
        ));

      check('ordered list',
        '<ol><li>A piggy</li></ol>',
        doc(
          ol(
            li(p('A piggy'))
          )
        ));

      check('ordered list with strong',
        '<ol><li>A piggy</li><li><strong>Bigger</strong> piggy</li></ol>',
        doc(
          ol(
            li(p('A piggy')),
            li(p(strong('Bigger'), ' piggy'))
          )
        ));
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

// Time tags
// ```````````````````````````````` xample
// <time datetime="2016-09-08" />
// .
// {"type":"doc","content":
// 	[ {"type":"time", "attrs": { "datetime": "2016-09-08"}} ]
// }
// ````````````````````````````````

// ## Task Lists

// A simple, single task:

// ```````````````````````````````` xample
// <ac:task-list> <ac:task> <ac:task-id>12</ac:task-id> <ac:task-status>incomplete</ac:task-status> <ac:task-body>Bar</ac:task-body> </ac:task> </ac:task-list>
// .
// {"type":"doc","content":
// 	[{"type":"task-list",
// 		"content":[
// 			{"type":"task",
// 				"attrs": { "id": "12", "status": "incomplete" },
// 				"content":[{"type":"text", "text":"Bar"}]
// 			}
// 		]
// 	}]
// }
// ````````````````````````````````

// A more complex, real world xample with multiple tasks, completion, assignees and dates.
// ```````````````````````````````` xample
// <p>What if I put:</p>
// <ac:task-list>
// <ac:task>
// 	<ac:task-id>9</ac:task-id>
// 	<ac:task-status>incomplete</ac:task-status>
// 	<ac:task-body>
// 		<span>and a task for<ac:link><ri:user ri:userkey="ff808081560b912f01560c66bad90078" /></ac:link> with a date of <time datetime="2016-09-08" /></span>
// 	</ac:task-body>
// </ac:task>
// <ac:task>
// 	<ac:task-id>10</ac:task-id>
// 	<ac:task-status>complete</ac:task-status>
// 	<ac:task-body><span>another task</span></ac:task-body>
// </ac:task>
// </ac:task-list>
// <p><span><br /></span></p>
// .
// {"type":"doc","content":[
// 	{"type":"paragraph","content":[
// 		{"type":"text","text":"What if I put:"}
// 	]},
//   {"type":"task-list","content":[
// 		{"type":"task",
// 			"attrs": { "id": "9", "status": "incomplete" },
// 			"content":[
// 				{"type":"text", "text":"and a task for"},
// 				{"type":"mention","userkey":"ff808081560b912f01560c66bad90078"},
// 				{"type":"text", "text":"with a date of"},
// 				{"type":"time", "attrs": {"datetime": "2016-09-08"}}
// 		]
// 		},
// 		{"type":"task",
// 			"attrs": { "id": "10", "status": "complete" },
// 			"content":[{"type":"text", "text":"another task"}]
// 		}
// 	]},
// 	{
// 		 "content": [
// 			 {
// 				 "type": "hard_break"
// 			 }
// 		 ],
// 		 "type": "paragraph"
// 	 }
// ]}
// ````````````````````````````````

// ## Inline Comments
// ```````````````````````````````` xample
// <p><ac:inline-comment-marker ac:ref="fcb5d260">The underlying</ac:inline-comment-marker> <strong><ac:inline-comment-marker ac:ref="qrf4d320">feature set</ac:inline-comment-marker></strong></p>
// .
// {"type":"doc","content":[
// 	{"type":"paragraph", "content":[
// 		{"type":"text", "text":"The underlying",
// 			"marks":[{ "type": "inlinecomment", "attrs": { "ref": "fcb5d260"}}]
// 		},
// 		{"type":"text", "text":" "},
// 		{"type":"text", "text":"feature set",
// 			"marks":[{ "type": "inlinecomment", "attrs": { "ref": "qrf4d320"}},
// 				{"type": "strong" }]
// 		}
// 	]}
// ]}
// ````````````````````````````````

// ## Placeholders
// ```````````````````````````````` xample
// <ac:placeholder>The <b>bold</b> placeholders.</ac:placeholder>
// .
// {"type":"doc","content":[
// 	{"type":"placeholder", "content":[
// 		{"type":"text", "text":"The "},
// 		{"type":"text", "text":"bold", "marks":[{ "type": "strong"}]},
// 		{"type":"text", "text":" placeholders."}
// 	]}
// ]}
// ````````````````````````````````
// A mention type
// ```````````````````````````````` xample
// <ac:placeholder ac:type="mention">A person</ac:placeholder>
// .
// {"type":"doc","content":[
// 	{"type":"placeholder", "placeholder-type": "mention", "content":[
// 		{"type":"text", "text":"A person"}
// 	]}
// ]}
// ````````````````````````````````
});

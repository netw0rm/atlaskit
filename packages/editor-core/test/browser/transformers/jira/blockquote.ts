import { nodeFactory } from '../../../../src/test-helper';
import { checkParse, checkParseEncodeRoundTrips } from './_test-helpers';
import { createJIRASchema } from '../../../../src/schema';

const schema = createJIRASchema({ allowBlockQuote: true,  allowLists: true  });

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const blockquote = nodeFactory(schema.nodes.blockquote!, {});
const p = nodeFactory(schema.nodes.paragraph);
const ul = nodeFactory(schema.nodes.bulletList!);
const li = nodeFactory(schema.nodes.listItem!);

describe('JIRASerializer', () => {
  describe('blockquote', () => {
    checkParseEncodeRoundTrips('simple content',
      schema,
      `<blockquote><p>content</p></blockquote>`,
      doc(blockquote(p('content')))
    );

    checkParseEncodeRoundTrips('with lists inside',
      schema,
      `<blockquote><ul class="alternate" type="disc"><li data-parent="ul">A piggy</li><li data-parent="ul">Bigger piggy</li></ul></blockquote>`,
      doc(
        blockquote(
          ul(
            li(p('A piggy')),
            li(p('Bigger piggy'))
          )
        )
      )
    );

    checkParse('empty node',
      schema,
      [`<blockquote></blockquote>`],
      doc(blockquote(p()))
    );

    checkParseEncodeRoundTrips('no content',
      schema,
      `<blockquote><p></p></blockquote>`,
      doc(blockquote(p()))
    );
  });
});

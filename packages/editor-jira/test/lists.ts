import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParseEncodeRoundTrips } from '../test-helpers';
import { name } from '../package.json';
import { JIRASchema, makeSchema } from '../src/schema';

const schema = makeSchema({ allowLists: true }) as JIRASchema;

// Nodes
const ul = nodeFactory(schema.nodes.bullet_list!);
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);
const li = nodeFactory(schema.nodes.list_item!);
const ol = nodeFactory(schema.nodes.ordered_list!);

// Marks
const strong = markFactory(schema.marks.strong);

describe(name, () => {
  describe('lists', () => {
    checkParseEncodeRoundTrips('bullet list',
      schema,
      '<ul class="alternate" type="square"><li>one</li><li>two</li></ul>',
      doc(
        ul(
          li(p('one')),
          li(p('two'))
        )
      ));

    checkParseEncodeRoundTrips('ordered list',
      schema,
      '<ol><li>one</li><li>two</li></ol>',
      doc(
        ol(
          li(p('one')),
          li(p('two'))
        )
      ));

    checkParseEncodeRoundTrips('bullet list with strong',
      schema,
      '<ul class="alternate" type="square"><li>A piggy</li><li><b>Bigger</b> piggy</li></ul>',
      doc(
        ul(
          li(p('A piggy')),
          li(p(strong('Bigger'), ' piggy'))
        )
      ));

    checkParseEncodeRoundTrips('ordered list with strong',
      schema,
      '<ol><li>A piggy</li><li><b>Bigger</b> piggy</li></ol>',
      doc(
        ol(
          li(p('A piggy')),
          li(p(strong('Bigger'), ' piggy'))
        )
      ));
  });
});

import { nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParseEncodeRoundTrips, checkEncode } from '../test-helpers';
import { name } from '../package.json';
import { JIRASchema, makeSchema } from '../src/schema';

const schema = makeSchema({ allowCodeBlock: true }) as JIRASchema;

// Nodes
const code = (attrs: { language?: string }) => nodeFactory(schema.nodes.code_block!, attrs);
const doc = nodeFactory(schema.nodes.doc);

describe(name, () => {
  describe('code block', () => {
    checkParseEncodeRoundTrips('code_block node',
      schema,
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-javascript">var foo = "bar";</pre></div></div>`,
      doc(code({ language: 'javascript' })('var foo = "bar";'))
    );

    checkEncode('default language is java',
      schema,
      doc(code({})('var foo = "bar";')),
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-java">var foo = "bar";</pre></div></div>`,
    );

    checkEncode('lowercase language',
      schema,
      doc(code({ language: 'JavaScript' })('var foo = "bar";')),
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-javascript">var foo = "bar";</pre></div></div>`,
    );
  });
});

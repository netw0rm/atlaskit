import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  CodeBlock,
} from '../../src/renderer/react/nodes';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/codeBlock', () => (
    <CodeBlock language="javascript">
    {`if (type) {
      switch (NodeType[type]) {
        case NodeType.codeBlock:
          const { text } = node;
          if (text) {
            const { attrs } = node;
            return {
              text,
              type,
              attrs
            }
          }
          break;
        default:
          return {};
      }
    }`}
    </CodeBlock>
  ))
;

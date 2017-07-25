import { storiesOf } from '@kadira/storybook';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  BulletList,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  ListItem,
  Paragraph,
  Rule,
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
  .add('nodes/hardBreak', () => (
    <div>Some text that contains a hard<HardBreak />break between lines</div>
  ))
  .add('nodes/heading', () => (
    <div>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ))
  .add('nodes/paragraph', () => (
    <Paragraph>This is a paragraph</Paragraph>
  ))
  .add('nodes/bulletList', () => (
    <BulletList>
      <ListItem>Depth 1: Item 1</ListItem>
      <ListItem>Depth 1: Item 2</ListItem>
      <ListItem>
        <p>Depth 1: Item 3</p>
        <BulletList>
          <ListItem>Depth 2: Item 1</ListItem>
          <ListItem>Depth 2: Item 2</ListItem>
          <ListItem>
            <p>Depth 2: Item 2</p>
            <BulletList>
              <ListItem>Depth 3: Item 1</ListItem>
              <ListItem>Depth 1: Item 2</ListItem>
              <ListItem>
                <p>Depth 3: Item 3</p>
                <BulletList>
                  <ListItem>Depth 4: Item 1</ListItem>
                  <ListItem>Depth 4: Item 2</ListItem>
                  <ListItem>Depth 4: Item 3</ListItem>
                </BulletList>
              </ListItem>
            </BulletList>
          </ListItem>
        </BulletList>
      </ListItem>
    </BulletList>
  ))
  .add('nodes/orderedList', () => (
    <OrderedList>
      <ListItem>Depth 1: Item 1</ListItem>
      <ListItem>Depth 1: Item 2</ListItem>
      <ListItem>
        <p>Depth 1: Item 3</p>
        <OrderedList>
          <ListItem>Depth 2: Item 1</ListItem>
          <ListItem>Depth 2: Item 2</ListItem>
          <ListItem>
            <p>Depth 2: Item 3</p>
            <OrderedList>
              <ListItem>Depth 3: Item 1</ListItem>
              <ListItem>Depth 3: Item 2</ListItem>
              <ListItem>
                <p>Depth 3: Item 3</p>
                <OrderedList>
                  <ListItem>Depth 4: Item 1</ListItem>
                  <ListItem>Depth 4: Item 2</ListItem>
                  <ListItem>
                    <p>Depth 4: Item 3</p>
                    <OrderedList>
                      <ListItem>Depth 5: Item 1</ListItem>
                      <ListItem>Depth 5: Item 2</ListItem>
                      <ListItem>
                        <p>Depth 5: Item 3</p>
                        <OrderedList>
                          <ListItem>Depth 6: Item 1</ListItem>
                          <ListItem>Depth 6: Item 2</ListItem>
                          <ListItem>
                            <p>Depth 6: Item 3</p>
                            <OrderedList>
                              <ListItem>Depth 7: Item 1</ListItem>
                              <ListItem>Depth 7: Item 2</ListItem>
                              <ListItem>
                                <p>Depth 7: Item 3</p>
                                <OrderedList>
                                  <ListItem>Depth 8: Item 1</ListItem>
                                  <ListItem>Depth 8: Item 2</ListItem>
                                  <ListItem>
                                    <p>Depth 8: Item 3</p>
                                    <OrderedList>
                                      <ListItem>Depth 9: Item 1</ListItem>
                                      <ListItem>Depth 9: Item 2</ListItem>
                                      <ListItem>
                                        <p>Depth 9: Item 3</p>
                                        <OrderedList>
                                          <ListItem>Depth 10: Item 1</ListItem>
                                          <ListItem>Depth 10: Item 2</ListItem>
                                          <ListItem>
                                            <p>Depth 10: Item 3</p>
                                          </ListItem>
                                        </OrderedList>
                                      </ListItem>
                                    </OrderedList>
                                  </ListItem>
                                </OrderedList>
                              </ListItem>
                            </OrderedList>
                          </ListItem>
                        </OrderedList>
                      </ListItem>
                    </OrderedList>
                  </ListItem>
                </OrderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </ListItem>
    </OrderedList>
  ))
  .add('nodes/blockquote', () => (
    <Blockquote>Blockquote</Blockquote>
  ))
  .add('nodes/rule', () => (
    <Rule />
  ))
;

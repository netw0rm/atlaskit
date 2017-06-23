import { action, storiesOf } from '@kadira/storybook';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { StoryBookTokenProvider, defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers';
import * as React from 'react';
import { name } from '../package.json';

import {
  Code,
  Em,
  Link,
  Strike,
  Strong,
  Subsup,
  Underline,
} from '../src/renderer/react/marks';

import {
  BulletList,
  Blockquote,
  Emoji,
  HardBreak,
  Heading,
  OrderedList,
  ListItem,
  Mention,
  Panel,
  Paragraph,
  Rule,
} from '../src/renderer/react/nodes';

import { EmojiProps } from '../src/renderer/react/nodes/emoji';
import ProviderFactory from '../src/providerFactory';
import Renderer from '../src/ui/Renderer';
import { document } from './story-data';

const mentionProvider = Promise.resolve({
  shouldHighlightMention(mention) {
    return mention.id === 'ABCDE-ABCDE-ABCDE-ABCDE';
  }
});

const mediaProvider = Promise.resolve({
  viewContext: Promise.resolve({
    clientId: defaultClientId,
    serviceHost: defaultServiceHost,
    tokenProvider: StoryBookTokenProvider.tokenProvider,
  })
});

storiesOf(name, module)
  .add('renderer', () => {
    const providerFactory = new ProviderFactory();
    providerFactory.setProvider('mentionProvider', mentionProvider);
    providerFactory.setProvider('mediaProvider', mediaProvider);

    const eventHandlers = {
      mention: {
        onClick: action('onClick'),
        onMouseEnter: action('onMouseEnter'),
        onMouseLeave: action('onMouseLeave'),
      },
      media: {
        onClick: action('onClick'),
      },
    };

    return (
      <div>
        <Renderer
          document={document}
          eventHandlers={eventHandlers}
          dataProviders={providerFactory}
        />
      </div>
    );
  })
  .add('renderer without providers', () => {
    return (
      <div>
        <Renderer document={document}/>
      </div>
    );
  })
  .add('renderer/marks/em', () => (
    <Em>This is italic</Em>
  ))
  .add('renderer/marks/link', () => (
    <Link href="https://www.atlassian.com">This is a link</Link>
  ))
  .add('renderer/marks/strike', () => (
    <Strike>This is strike-through</Strike>
  ))
  .add('renderer/marks/strong', () => (
    <Strong>This is strong</Strong>
  ))
  .add('renderer/marks/subsup', () => (
    <div>
      <Subsup type="sub">This is sub</Subsup>
      <Subsup type="sup">This is sup</Subsup>
    </div>
  ))
  .add('renderer/marks/underline', () => (
    <Underline>This is underlined</Underline>
  ))
  .add('renderer/marks/code', () => (
    <Code>This is code</Code>
  ))
  .add('nodes/hardBreak', () => (
    <div>Some text with that<HardBreak />breaks on multiple lines</div>
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
  .add('nodes/media', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult"/>
  ))
  .add('nodes/mention', () => (
    <Mention id="abcd-abcd-abcd" text="@Oscar Wallhult"/>
  ))
  .add('nodes/emoji', () => {
    const { emojiStoryData, emojiTestData } = emojiData;
    const loadingEmojiProvider = new Promise(() => {});
    const emojiProvider = emojiData.emojiStoryData.getEmojiResource();
    const lorem = emojiStoryData.lorem;

    // tslint:disable-next-line:variable-name
    const Sample = (props: any) => {
      const providerFactory = new ProviderFactory();
      providerFactory.setProvider('emojiProvider', props.emojiProvider);

      const evilBurnsEmojiProps: EmojiProps = { ...emojiTestData.evilburnsEmoji, providers: providerFactory };
      const grinEmojiProps: EmojiProps = { ...emojiTestData.grinEmoji, providers: providerFactory };

      const nopeEmojiProps: EmojiProps = { shortName: ':nope:' };
      if (props.emojiProvider) {
        const providerFactory = new ProviderFactory();
        providerFactory.setProvider('emojiProvider', loadingEmojiProvider);

        nopeEmojiProps.providers = providerFactory;
      }

      return (
        <span>
          Example emoji:&nbsp;
          <Emoji {...evilBurnsEmojiProps} />
          <Emoji {...grinEmojiProps} />
          <Emoji {...nopeEmojiProps} />
        </span>
      );
    };

    const sampleStyle = {
      display: 'inline-block',
      verticalAlign: 'top',
      paddingRight: '10px',
      width: '45%',
    };
    return (
      <div>
        <p>
          This story shows emoji in various contexts, the line height between the left and
          right columns should be consistent if the emoji do not impact the line height.
        </p>
        <hr/>
        <div style={sampleStyle}>
          <Paragraph><Sample emojiProvider={emojiProvider} /></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample emojiProvider={emojiProvider} /> {lorem}</Paragraph>
          <hr/>
          <h1><Sample emojiProvider={emojiProvider} /></h1>
          <hr/>
          <h2><Sample emojiProvider={emojiProvider} /></h2>
          <hr/>
          <h3><Sample emojiProvider={emojiProvider} /></h3>
          <hr/>
          <h4><Sample emojiProvider={emojiProvider} /></h4>
          <hr/>
          <h5><Sample emojiProvider={emojiProvider} /></h5>
          <hr/>
          <h6><Sample emojiProvider={emojiProvider} /></h6>
          <hr/>
        </div>
        <div style={sampleStyle}>
          <Paragraph><Sample/></Paragraph>
          <hr/>
          <Paragraph>{lorem} <Sample/> {lorem}</Paragraph>
          <hr/>
          <h1><Sample/></h1>
          <hr/>
          <h2><Sample/></h2>
          <hr/>
          <h3><Sample/></h3>
          <hr/>
          <h4><Sample/></h4>
          <hr/>
          <h5><Sample/></h5>
          <hr/>
          <h6><Sample/></h6>
          <hr/>
        </div>
      </div>
    );
  })
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
  .add('nodes/panel', () => (
    <div>
      <Panel panelType="info">This is a info panel</Panel>
      <Panel panelType="note">This is a note panel</Panel>
      <Panel panelType="tip">This is a tip panel</Panel>
      <Panel panelType="warning">This is a warning panel</Panel>
    </div>
  ))
  .add('nodes/rule', () => (
    <Rule />
  ))
;

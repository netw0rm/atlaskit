import { storiesOf } from '@kadira/storybook';
import { toEmojiId } from '@atlaskit/emoji';
import { storyData as  emojiStoryData, testData as emojiTestData } from '@atlaskit/emoji/dist/es5/support';

import * as React from 'react';
import { name, version } from '../../package.json';
import { storyDecorator } from '../../src/test-helper';

import {
  Emoji,
  Paragraph,
} from '../../src/renderer/react/nodes';

import { EmojiProps } from '../../src/renderer/react/nodes/emoji';
import ProviderFactory from '../../src/providerFactory';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('nodes/emoji', () => {
    const loadingEmojiProvider = new Promise(() => {});
    const emojiProvider = emojiStoryData.getEmojiResource();
    const lorem = emojiStoryData.lorem;

    // tslint:disable-next-line:variable-name
    const Sample = (props: any) => {
      const providerFactory = new ProviderFactory();
      providerFactory.setProvider('emojiProvider', props.emojiProvider);

      const evilBurnsEmojiProps: EmojiProps = {
        ...toEmojiId(emojiTestData.evilburnsEmoji),
        providers: providerFactory
      };
      const grinEmojiProps: EmojiProps = {
        ...toEmojiId(emojiTestData.grinEmoji),
        providers: providerFactory
      };

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
;

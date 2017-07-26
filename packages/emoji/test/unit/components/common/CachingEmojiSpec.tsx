import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { waitUntil } from '@atlaskit/util-common-test';

import EmojiResource from '../../../../src/api/EmojiResource';
import Emoji from '../../../../src/components/common/Emoji';
import EmojiPlaceholder from '../../../../src/components/common/EmojiPlaceholder';
import CachingEmoji, { CachingMediaEmoji } from '../../../../src/components/common/CachingEmoji';
import { imageEmoji, loadedMediaEmoji, mediaEmoji } from '../../../../src/support/test-data';

describe('<CachingEmoji />', () => {
  describe('Non-media emoji', () => {
    it('CachingMediaEmoji not used, just an Emoji rendered', () => {
      const component = mount(<CachingEmoji emoji={imageEmoji} />);
      expect(component.find(CachingMediaEmoji).length).toBe(0);
      expect(component.find(Emoji).length).toBe(1);
    });
  });

  describe('Media emoji', () => {
    let contextOptions;
    let emojiProviderStub;

    beforeEach(() => {
      emojiProviderStub = sinon.createStubInstance(EmojiResource);
      contextOptions = {
        context: {
          emoji: {
            emojiProvider: emojiProviderStub
          }
        },
        childContextTypes: {
          emoji: React.PropTypes.object
        }
      };
    });

    it('Nothing rendered if missing context', () => {
      const component = mount(<CachingEmoji emoji={mediaEmoji} />);
      expect(component.find(CachingMediaEmoji).length).toBe(1);
      expect(component.find(Emoji).length).toBe(0);
      expect(component.find(EmojiPlaceholder).length).toBe(1);
    });

    it('Renders direct url if optimistic rendering true', () => {
      emojiProviderStub.optimisticMediaRendering.returns(true);
      const component = mount(<CachingEmoji emoji={mediaEmoji} />, contextOptions);
      expect(component.find(CachingMediaEmoji).length).toBe(1);
      return waitUntil(() => component.find(Emoji).length > 0).then(() => {
        const emoji = component.find(Emoji);
        expect(emoji.length).toBe(1);
        const emojiDescription = emoji.prop('emoji');
        expect(emojiDescription).toEqual(mediaEmoji);
      });
    });

    it('Loads emoji via cache (promise) if optimistic rendering false', () => {
      emojiProviderStub.optimisticMediaRendering.returns(false);
      emojiProviderStub.loadMediaEmoji.returns(Promise.resolve(loadedMediaEmoji));
      const component = mount(<CachingEmoji emoji={mediaEmoji} />, contextOptions);
      expect(component.find(CachingMediaEmoji).length).toBe(1);
      return waitUntil(() => component.find(Emoji).length > 0).then(() => {
        const emoji = component.find(Emoji);
        expect(emoji.length).toBe(1);
        const emojiDescription = emoji.prop('emoji');
        expect(emojiDescription).toEqual(loadedMediaEmoji);
      });
    });

    it('Loads emoji via cache (non-promise) if optimistic rendering false', () => {
      emojiProviderStub.optimisticMediaRendering.returns(false);
      emojiProviderStub.loadMediaEmoji.returns(loadedMediaEmoji);
      const component = mount(<CachingEmoji emoji={mediaEmoji} />, contextOptions);
      expect(component.find(CachingMediaEmoji).length).toBe(1);
      return waitUntil(() => component.find(Emoji).length > 0).then(() => {
        const emoji = component.find(Emoji);
        expect(emoji.length).toBe(1);
        const emojiDescription = emoji.prop('emoji');
        expect(emojiDescription).toEqual(loadedMediaEmoji);
      });
    });
  });
});

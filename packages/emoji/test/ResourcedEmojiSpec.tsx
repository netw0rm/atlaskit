import { mount } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription } from '../src/types';
import Emoji from '../src/components/common/Emoji';
import ResourcedEmoji, { EmojiPlaceholder } from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { MockEmojiResourceConfig } from './MockEmojiResource';
import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { areyoukiddingmeEmoji, grinEmoji, getEmojiResourcePromise }  = emojiTestData.emojiTestData;

const findEmoji = component => component.find(Emoji);
const emojiVisible = (component) => findEmoji(component).length === 1;
const emojiVisibleById = (component, id) => emojiVisible(component) && findEmoji(component).prop('emoji').id === id;
const emojiPlaceHolderVisible = (component) => component.find(EmojiPlaceholder).length === 1;

describe('<ResourcedEmoji />', () => {
  it('should render emoji', () => {
    const grinEmojiDesc = grinEmoji();
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ id: grinEmojiDesc.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmojiDesc.id);
    });
  });

  it('should update emoji on id change', () => {
    const grinEmojiDesc = grinEmoji();
    const areyoukiddingmeEmojiDesc = areyoukiddingmeEmoji();
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ id: grinEmojiDesc.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmojiDesc.id);
      component.setProps({
        emojiId: { id: areyoukiddingmeEmojiDesc.id },
      });

      return waitUntil(() => emojiVisibleById(component, areyoukiddingmeEmojiDesc.id)).then(() => {
        expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(areyoukiddingmeEmojiDesc.id);
      });
    });
  });

  it('unknown emoji', () => {
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ id: 'doesnotexist' }}
    />);

    return waitUntil(() => !!resolver).then(() => {
      resolver();
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        expect(true, 'EmojiPlaceholder found').to.equal(true);
      });
    });
  });

  it('placeholder while loading emoji', () => {
    const grinEmojiDesc = grinEmoji();
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    const component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ id: grinEmojiDesc.id }}
    />);

    return waitUntil(() => !!resolver).then(() => {
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        resolver(resolverResult);
        return waitUntil(() => emojiVisible(component)).then(() => {
          expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmojiDesc.id);
        });
      });
    });
  });
});

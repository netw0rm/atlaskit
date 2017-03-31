import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription } from '../src/types';
import Emoji from '../src/components/common/Emoji';
import EmojiPlaceholder from '../src/components/common/EmojiPlaceholder';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { MockEmojiResourceConfig } from './MockEmojiResource';
import { areyoukiddingmeEmoji, grinEmoji, getEmojiResourcePromise } from './TestData';

const findEmoji = component => component.find(Emoji);
const emojiVisible = (component) => findEmoji(component).length === 1;
const emojiVisibleById = (component, id) => emojiVisible(component) && findEmoji(component).prop('emoji').id === id;
const emojiPlaceHolderVisible = (component) => component.find(EmojiPlaceholder).length === 1;

describe('<ResourcedEmoji />', () => {

  let component: ReactWrapper<any, any>;

  afterEach(() => {
    component.unmount();
  });

  it('should render emoji', () => {
    component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ id: grinEmoji.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
    });
  });

  it('should update emoji on id change', () => {
    component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      emojiId={{ id: grinEmoji.id }}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
      component.setProps({
        emojiId: { id: areyoukiddingmeEmoji.id },
      });

      return waitUntil(() => emojiVisibleById(component, areyoukiddingmeEmoji.id)).then(() => {
        expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(areyoukiddingmeEmoji.id);
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
    component = mount(<ResourcedEmoji
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
    let resolver;
    let resolverResult;
    const config: MockEmojiResourceConfig = {
      promiseBuilder: (result: EmojiDescription) => {
        resolverResult = result;
        return new Promise(resolve => { resolver = resolve; });
      },
    };
    component = mount(<ResourcedEmoji
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      emojiId={{ id: grinEmoji.id }}
    />);

    return waitUntil(() => !!resolver).then(() => {
      return waitUntil(() => emojiPlaceHolderVisible(component)).then(() => {
        resolver(resolverResult);
        return waitUntil(() => emojiVisible(component)).then(() => {
          expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
        });
      });
    });
  });
});

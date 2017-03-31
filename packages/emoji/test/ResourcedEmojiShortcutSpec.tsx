import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { expect } from 'chai';
import { waitUntil } from '@atlaskit/util-common-test';

import { EmojiDescription } from '../src/types';
import Emoji from '../src/components/common/Emoji';
import EmojiPlaceholder from '../src/components/common/EmojiPlaceholder';
import ResourcedEmojiShortcut from '../src/components/common/ResourcedEmojiShortcut';
import { EmojiProvider } from '../src/api/EmojiResource';

import { MockEmojiResourceConfig } from './MockEmojiResource';
import { areyoukiddingmeEmoji, grinEmoji, getEmojiResourcePromise } from './TestData';

const findEmoji = component => component.find(Emoji);
const emojiVisible = (component) => findEmoji(component).length === 1;
const emojiVisibleById = (component, id) => emojiVisible(component) && findEmoji(component).prop('emoji').id === id;
const emojiPlaceHolderVisible = (component) => component.find(EmojiPlaceholder).length === 1;

describe('<ResourcedEmojiShortcut />', () => {

  let component: ReactWrapper<any, any>;

  afterEach(() => {
    component.unmount();
  });

  it('should render emoji', () => {
    component = mount(<ResourcedEmojiShortcut
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      shortcut={grinEmoji.shortcut}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
    });
  });

  it('should update emoji on shortcut change', () => {
    component = mount(<ResourcedEmojiShortcut
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      shortcut={grinEmoji.shortcut}
    />);

    return waitUntil(() => emojiVisible(component)).then(() => {
      expect(findEmoji(component).prop('emoji').id, 'Emoji rendered').to.equal(grinEmoji.id);
      component.setProps({
        shortcut: areyoukiddingmeEmoji.shortcut,
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
    component = mount(<ResourcedEmojiShortcut
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      shortcut="doesnotexist"
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
    component = mount(<ResourcedEmojiShortcut
      emojiProvider={getEmojiResourcePromise(config) as Promise<EmojiProvider>}
      shortcut={grinEmoji.shortcut}
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

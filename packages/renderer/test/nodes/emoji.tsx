import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EmojiProvider } from '@atlaskit/emoji';
import Emoji, { EmojiWrapper } from '../../src/nodes/emoji';

describe('Emoji', () => {

  const emojiProvider = Promise.resolve({} as EmojiProvider);

  it('should render "text" if there is no emojiProvider prop', () => {
    const component = shallow(<Emoji emojiId={{ shortName: 'anything', fallback: 'fallback' }} text="fallback-text" />);
    const fallbackSpan = component.find('span');
    expect(fallbackSpan.length).to.equal(1);
    expect(fallbackSpan.text()).to.equal('fallback-text');
  });

  it('should render a EmojiWrapper component if emojiProvider supplied', () => {
    const component = shallow(<Emoji emojiId={{ shortName: 'anything', fallback: 'fallback' }} text="fallback-text" emojiProvider={emojiProvider}/>);
    const emojiWrapper = component.find(EmojiWrapper);
    expect(emojiWrapper.length).to.equal(1);
  });

});

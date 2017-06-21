import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import { MentionDescription } from '../../src/types';
import { Props, State } from '../../src/components/MentionList';
import MentionItem from '../../src/components/MentionItem';
import NumericAvatar from '../../src/components/NumericAvatar';
import Avatar from '@atlaskit/avatar';

const mentionWithNickname = {
    id: '0',
    name: 'Raina Halper',
    mentionName: 'Caprice',
    nickname: 'Carolyn',
    avatarUrl: ''
};

const mentionWithoutNickname =  {
    id: '1',
    name: 'Kaitlyn Prouty',
    mentionName: 'Fidela',
    avatarUrl: ''
};

function setupMentionItem(mention: MentionDescription, props?: Props): ShallowWrapper<Props, State> {
  return shallow(
    <MentionItem
      mention={mention}
      onSelection={props && props.onSelection}
    />
  ) as ShallowWrapper<Props, State>;
}

describe('MentionItem', () => {
  it('should display @-nickname if nickname is present', () => {
    const component = setupMentionItem(mentionWithNickname);
    expect(component.html()).contains(`@${mentionWithNickname.nickname}`);
  });

  it('should not display @-name if nickname is not present', () => {
    const component = setupMentionItem(mentionWithoutNickname);
    expect(component.html()).to.not.contains('@');
  });

  it('should display access restriction if accessLevel is not CONTAINER', () => {
    const component = setupMentionItem({
        id: '1',
        name: 'Kaitlyn Prouty',
        mentionName: 'Fidela',
        avatarUrl: '',
        accessLevel: 'SITE'
    });
    expect(component.find(LockCircleIcon).length).to.equal(1);
  });

  it('should not display access restriction if accessLevel is CONTAINER', () => {
    const component = setupMentionItem({
        id: '1',
        name: 'Kaitlyn Prouty',
        mentionName: 'Fidela',
        avatarUrl: '',
        accessLevel: 'CONTAINER'
    });
    expect(component.find(LockCircleIcon).length).to.equal(0);
  });

  it('should not display access restriction if no accessLevel data', () => {
    const component = setupMentionItem({
      id: '1',
      name: 'Kaitlyn Prouty',
      mentionName: 'Fidela',
      avatarUrl: '',
    });
    expect(component.find(LockCircleIcon).length).to.equal(0);
  });

  it('should display number on avatar for specific avatar URLs', () => {
    const component = setupMentionItem({
      id: '1',
      name: 'Monkey Trousers',
      mentionName: 'monkeytrousers',
      avatarUrl: 'ak-numvatar:32',
    });

    const avatar = component.find(NumericAvatar);
    expect(avatar.length).to.equal(1);
    expect(avatar.prop('num')).to.equal(32);
  });

  it('should display default avator for numeric URL containing non-number', () => {
    const component = setupMentionItem({
      id: '1',
      name: 'Monkey Trousers',
      mentionName: 'monkeytrousers',
      avatarUrl: 'ak-numvatar:32d',
    });

    expect(component.find(NumericAvatar).length).to.equal(0);
    expect(component.find(Avatar).length).to.equal(1);
  });

  it('should display standard avatar for HTTP urls', () => {
    const expectedUrl = 'http://www.example.org/monkeytrousers.png';
    const component = setupMentionItem({
      id: '1',
      name: 'Monkey Trousers',
      mentionName: 'monkeytrousers',
      avatarUrl: expectedUrl,
    });

    const avatar = component.find(Avatar);
    expect(avatar.length).to.equal(1);
    expect(avatar.prop('src')).to.equal(expectedUrl);
  });
});

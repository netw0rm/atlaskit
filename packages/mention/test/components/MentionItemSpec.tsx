import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';

import { Mention } from '../../src/types';
import { Props, State } from '../../src/components/MentionList';
import MentionItem from '../../src/components/MentionItem';

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

function setupMentionItem(mention: Mention, props?: Props): ShallowWrapper<Props, State> {
  return shallow(
    <MentionItem
      mention={mention}
      {...props}
    />
  ) as ShallowWrapper<Props, State>;
}

describe('MentionItem', () => {
  it('should display @-nickname if nickname is present', () => {
    const component = setupMentionItem(mentionWithNickname);
    expect(component.text()).contains('@' + mentionWithNickname.nickname);
  });

  it('should display @-name if nickname is not present', () => {
    const component = setupMentionItem(mentionWithoutNickname);
    expect(component.text()).contains('@' + mentionWithoutNickname.name);
  });
});

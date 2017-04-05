import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';

import { Mention } from '../../src/types';
import mentionData from '../_mention-data';
import { Props, State } from '../../src/components/MentionList';
import MentionItem from '../../src/components/MentionItem';

const mentions = mentionData.mentions;

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
    const component = setupMentionItem(mentions[0]);
    expect(component.text()).contains('@' + mentions[0].nickname);
  });

  it('should display @-name if nickname is not present', () => {
    const component = setupMentionItem(mentions[1]);
    expect(component.text()).contains('@' + mentions[1].name);
  });
});

import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Mention as AKMention } from '@atlaskit/mention';
import Mention from '../../src/nodes/mention';

const mentionData = {
  attrs: {
    id: 'abcd-abcd-abcd',
    text: '@Oscar Wallhult'
  }
};

describe('<Mention/>', () => {
  const mention = shallow(<Mention {...mentionData} />);

  it('should render @atlaskit/mention', () => {
    const akMention = mention.find(AKMention);
    expect(akMention.length).to.equal(1);
    expect(akMention.props()).to.have.property('id', mentionData.attrs.id);
    expect(akMention.props()).to.have.property('text', mentionData.attrs.text);
  });

  describe('backwards compatibility', () => {
    it('should try and use attrs.displayName if attrs.text is not present', () => {
      const mention = shallow(<Mention attrs={{ id: 'abcd-abcd-abcd', displayName: '@Oscar Wallhult'}} />);
      const akMention = mention.find(AKMention);
      expect(akMention.length).to.equal(1);
      expect(akMention.props()).to.have.property('id', 'abcd-abcd-abcd');
      expect(akMention.props()).to.have.property('text', '@Oscar Wallhult');
    });

    it('should try and use text property if there is no attrs.text or attrs.displayName', () => {
      const mention = shallow(<Mention attrs={{ id: 'abcd-abcd-abcd'}} text="@Oscar Wallhult" />);
      const akMention = mention.find(AKMention);
      expect(akMention.length).to.equal(1);
      expect(akMention.props()).to.have.property('id', 'abcd-abcd-abcd');
      expect(akMention.props()).to.have.property('text', '@Oscar Wallhult');
    });

    it('should set text to @unknown if there is no usable property', () => {
      const mention = shallow(<Mention attrs={{ id: 'abcd-abcd-abcd'}} />);
      const akMention = mention.find(AKMention);
      expect(akMention.length).to.equal(1);
      expect(akMention.props()).to.have.property('id', 'abcd-abcd-abcd');
      expect(akMention.props()).to.have.property('text', '@unkown');
    });
  });

});

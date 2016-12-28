import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import ToneSelector from '../src/internal/ToneSelector';
import EmojiButton from '../src/internal/EmojiButton';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

function skinVariation(id) {
  return {
    imagePath: `https://path-to-skin-variation-tone${id}.png`,
    width: 24,
    height: 24,
  };
}

const handEmoji = {
  shortcut: ':raised_back_of_hand:',
  representation: {
    imagePath: '',
    width: 24,
    height: 24,
  },
  skinVariations: [
    skinVariation(1),
    skinVariation(2),
    skinVariation(3),
    skinVariation(4),
    skinVariation(5),
  ],
};

describe('<ToneSelector />', () => {
  it('should display one emoji per skin variations + default', () => {
    const onToneSelectedSpy = sinon.spy();
    const wrapper = shallow(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    expect(wrapper.find(EmojiButton)).to.have.length(6);
  });

  it('should call onToneSelected on click', () => {
    const onToneSelectedSpy = sinon.spy();
    const wrapper = mount(<ToneSelector
      emoji={handEmoji}
      onToneSelected={onToneSelectedSpy}
    />);

    wrapper.find(EmojiButton).first().simulate('mousedown', { button: 0 });
    expect(onToneSelectedSpy).to.have.been.calledWith(0);
  });
});

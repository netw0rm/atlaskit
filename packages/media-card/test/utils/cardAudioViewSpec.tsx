import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';

import { CardAudioView } from '../../src/utils';
import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';
import { AudioBars } from '../../src/utils/cardAudioView/audioWidget/audioBars';
import { Wrapper } from '../../src/utils/cardAudioView/styled';
import { MediaImage } from '../../src/utils/mediaImage';

/* tslint:disable */ //:no-unused-expressions

describe.only('CardAudioView', () => {
  const audioUrl = Promise.resolve('');
  const subtitle = 'File size';
  const dataURI = 'audio-cover.png';

  it('should render audio bars when audioUrl is provided', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl}/>);

    expect(card.find(AudioBars)).to.have.length(1);
  });

  it('should render subtitle when provided', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl} subtitle={subtitle} />);

    expect(card.find(CardOverlay).props().subtitle).to.equal(subtitle);
  });

  it('should render the audio cover image when dataURI is provided', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl} dataURI={dataURI} />);

    expect(card.find(MediaImage).props().dataURI).to.equal(dataURI);
  });

  it('should render the overlay as persistent when there is no dataURI', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl}/>);

    expect(card.find(CardOverlay).props().persistent).to.be.true;
  });

  it('should start playing the audio when user hovers the card', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl}/>);
    const spy = sinon.spy();
    const audioElement = {play: spy};

    card.setState({audioElement});
    expect(spy.called).to.be.false;
    card.find(Wrapper).simulate('mouseover');
    expect(spy.called).to.be.true;
  });

  it.only('should pause the audio when user cursor leaves the card', () => {
    const card = mount(<CardAudioView audioUrl={audioUrl}/>);
    const spy = sinon.spy();
    const audioElement = {pause: spy};

    card.setState({audioElement});
    expect(spy.called).to.be.false;
    card.find(Wrapper).simulate('mouseleave');
    expect(spy.called).to.be.true;
  });
});

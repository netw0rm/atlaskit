import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';

import { CardVideoView } from '../../src/utils';
import { Video, Wrapper } from '../../src/utils/cardVideoView/styled';
import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';
import { PlayButton } from '../../src/utils';

/* tslint:disable */ //:no-unused-expressions

describe('CardVideoView', () => {
  const videoSrc = 'my-video.mp4';
  const videoUrl = Promise.resolve(videoSrc);
  const title = 'Video name';
  const subtitle = 'Video size';

  it('should render title and subtitle when provided', () => {
    const card = mount(<CardVideoView videoUrl={videoUrl} title={title} subtitle={subtitle}/>);

    expect(card.find(CardOverlay).props().mediaName).to.equal(title);
    expect(card.find(CardOverlay).props().subtitle).to.equal(subtitle);
  });

  it('should render a video element with the right video src', (done) => {
    const card = mount(<CardVideoView videoUrl={videoUrl}/>);

    // Wait for async video resolution
    setTimeout(() => {
      expect(card.find(Video).props().src).to.equal(videoSrc);
      done();
    }, 10)
  });

  it('should start playing the video when user hovers the card', () => {
    const card = mount(<CardVideoView videoUrl={videoUrl}/>);
    const spy = sinon.spy();
    const videoElement = {play: spy};

    card.component.getInstance().videoElement = videoElement;
    expect(spy.called).to.be.false;
    card.find(Wrapper).simulate('mouseover');
    expect(spy.called).to.be.true;
  });

  it('should pause the video when user cursor leaves the card', (done) => {
    const card = mount(<CardVideoView videoUrl={videoUrl}/>);
    const spy = sinon.spy();
    const videoElement = {play: Promise.resolve(), pause: spy};

    card.component.getInstance().videoElement = videoElement;
    card.find(Wrapper).simulate('mouseleave');

    // Wait for async video resolution
    setTimeout(() => {
      expect(spy.called).to.be.true;
      done();
    }, 10);
  });
});

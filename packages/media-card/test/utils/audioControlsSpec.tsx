import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';

import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import VidPauseIcon from '@atlaskit/icon/glyph/vid-pause';
import { AudioControls } from '../../src/utils/cardAudioView/audioWidget/audioControls';
import { PlayButtonWrapper } from '../../src/utils/cardAudioView/audioWidget/audioControls/styled';

/* tslint:disable */ //:no-unused-expressions

describe('AudioControls', () => {
  const audioEl = document.createElement('audio');

  it('should show playing state by default', () => {
    const card = shallow(<AudioControls audioEl={audioEl}/>);

    expect(card.find(VidPauseIcon)).to.have.length(1);
  });

  it('should show paused status when users press pause button', () => {
    const card = shallow(<AudioControls audioEl={audioEl}/>);

    card.find(PlayButtonWrapper).simulate('click');
    expect(card.find(VidPlayIcon)).to.have.length(1);
  });

  it.skip('should show paused state when audio finishes playing', () => {
    const card = shallow(<AudioControls audioEl={audioEl}/>);

    audioEl.dispatchEvent(new Event('ended'));
    expect(card.state('isPlaying')).to.be.false;
  });
});

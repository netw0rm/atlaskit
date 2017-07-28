import * as React from 'react';
import { mount } from 'enzyme';
import { LinkCardPlayer } from '../../../src/links';

describe('LinkCardPlayer', () => {
  const url = '';
  const playerUrl = 'http://player-url';
  const title = '';

  it('should not load the iframe until the user press play', () => {
    const cardPlayer = mount(<LinkCardPlayer linkUrl={url} playerUrl={playerUrl} title={title} />) as any;

    expect(cardPlayer.find('iframe').get(0).getAttribute('src')).not.toContain(playerUrl);

    cardPlayer.find('.play-button-wrapper').simulate('click');

    expect(cardPlayer.state('isPlayed')).toBe(true);
    expect(cardPlayer.state('isLoading')).toBe(true);
    expect(cardPlayer.find('iframe').get(0).getAttribute('src')).toContain(playerUrl);
  });

  it('should hide the player details after the embed loads', () => {
    const cardPlayer = mount(<LinkCardPlayer linkUrl={url} playerUrl={playerUrl} title={title} />);

    cardPlayer.find('.play-button-wrapper').simulate('click');
    cardPlayer.find('iframe').simulate('load');

    expect(cardPlayer.find('.is-played')).toHaveLength(1);
    expect(cardPlayer.find('.is-playing')).toHaveLength(0);
  });
});

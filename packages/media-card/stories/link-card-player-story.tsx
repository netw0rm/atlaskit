import * as React from 'react';
import {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {LinkCardPlayer} from '../src';
import {tallImage, wideImage, wideTransparentImage, smallImage} from './images';
import {StoryList} from '@atlaskit/media-test-helpers';

const onClick = (event: Event) => {
  action('click')();
};

const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

storiesOf('LinkCardPlayer', {})
  .add('Default', () => (
    <StoryList>
      {[{
        title: 'Youtube',
        content: <LinkCardPlayer
          title="DEADPOOL 2 Teaser Trailer (2018)"
          description=`Official \"Deadpool 2\" Movie Teaser Trailer 2018 | Subscribe ➤ http://abo.yt/kc | Ryan Reynolds Movie #Trailer | Release: 2 Mar 2018 | More https://KinoCheck....`
          linkUrl="http://localhost:9001/?selectedKind=LinkCardViewHorizontal&selectedStory=Various%20text%20lengths&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel"
          thumbnailUrl="https://i.ytimg.com/vi/I4tFNfROlqk/hqdefault.jpg"
          iconUrl="https://www.youtube.com/yts/img/favicon_144-vflWmzoXw.png"
          playerUrl="https://www.youtube.com/embed/I4tFNfROlqk?feature=oembed"
          menuActions={menuActions}
        /> 
      }, {
        title: 'Spotify',
        content: <LinkCardPlayer
          title="Trouble"
          description=`by Cage The Elephant \non Trouble`
          linkUrl="https://open.spotify.com/track/3pxw9Agh9VB9kyx79REpRQ"
          thumbnailUrl="https://i.scdn.co/image/e9cdc3892cfc26b9a224844e9583b687ec146ddc"
          iconUrl="http://d2c87l0yth4zbw.cloudfront.net/i/_global/favicon.png"
          playerUrl="https://open.spotify.com/embed?uri=spotify:track:3pxw9Agh9VB9kyx79REpRQ"
          menuActions={menuActions}
        /> 
      }, {
        title: 'SoundCloud',
        content: <LinkCardPlayer
          title="iSpy feat. Lil Yachty"
          description=`Feat. Lil Yachty (https://soundcloud.com/770rd)\nProd. by Ayo. (https://soundcloud.com/ayoayo)\nAdd'tl prod. by LegeKale (https://soundcloud.com/legekale)\nArt by Vlad (http://vsepetov.com)\nBuy/Stream (https://lnk.to/KYLE-iSpy)`
          linkUrl="https://soundcloud.com/superduperkylemusic/kyle-ispy-feat-lil-yachty"
          thumbnailUrl="https://i1.sndcdn.com/artworks-000196529492-77zopd-t500x500.jpg"
          iconUrl="https://a-v2.sndcdn.com/assets/images/sc-icons/favicon-2cadd14b.ico"
          playerUrl="https://w.soundcloud.com/player/?visual=true&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F295926514&show_artwork=true"
          menuActions={menuActions}
        /> 
      }]}
    </StoryList>
  ));

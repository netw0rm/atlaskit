import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from '../src/index';
import avatarStoryStyles from 'style!./stories.less';
import { name } from '../package.json';
import hostStyles from 'style!./../src/host.less';

import React from 'React';

const Avatar = reactify(AkAvatar);

const avatarClass = hostStyles.akAvatar;
const avatarUrl = require('url!./doge.jpg');
const transparentAvatarUrl = require('url!./face-w-transparency.png');
const tickUrl = require('url!./tick.svg');
const tickWithBackgroundUrl = require('url!./tick.png');

const avatarRowClass = avatarStoryStyles.rowOfAvatarsStory;
const storybookExampleClass = avatarStoryStyles.example;

const DefaultAvatar = (props) => <Avatar
  src={avatarUrl}
  style={{ marginLeft: '10px' }}
  className={avatarClass}
  {...props}
/>;

const AllAvatarSizes = (props) => <div className={avatarRowClass}>
  <DefaultAvatar size="small" {...props} />
  <DefaultAvatar size="medium" {...props} />
  <DefaultAvatar size="large" {...props} />
  <DefaultAvatar size="xlarge" {...props} />
</div>;


storiesOf(name, module)
  .add('A default avatar', () => (
    <div>
      <div>
        By default an avatar should be medium sized and have no presence
      </div>
      <DefaultAvatar />
    </div>
  ))
  .add('An avatar with an incorrectly defined size (falls back to default)', () => (
    <DefaultAvatar size="megalarge" />
  ))
  .add('Avatars on colored background', () => {
    const rainbowStyle = {
      background: 'linear-gradient(red, orange, yellow, green, blue, indigo, violet)',
      padding: '10px',
      marginTop: '10px',
    };
    const cubeStyle = {
      backgroundColor: '#556',
      // eslint-disable-next-line max-len
      backgroundImage: `linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a)`,
      backgroundSize: '80px 140px',
      backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
      padding: '10px',
      color: 'white',
    };
    const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // eslint-disable-line  max-len
    return (
      <div>
        <div>
          Here we have a xlarge avatar, an avatar with partial transparency, and a completely
          transparent image. No border is shown around them.
        </div>
        <div style={rainbowStyle}>
          <DefaultAvatar size="xlarge" />
          <DefaultAvatar size="xlarge" src={transparentAvatarUrl} />
          <DefaultAvatar size="xlarge" src={transparentPixel} />
        </div>
        <div style={cubeStyle}>
          <DefaultAvatar size="xlarge" />
          <DefaultAvatar size="xlarge" src={transparentAvatarUrl} />
          <DefaultAvatar size="xlarge" src={transparentPixel} />
        </div>
      </div>
    );
  })
  .add('All avatar sizes', () => (
    <AllAvatarSizes />
  ))
  .add('All avatars with online presence', () => (
    <div>
      <div>Presence icons should be allowed to be shown at any size,
        but are reccomended only for <strong>medium</strong>
      </div>
      <AllAvatarSizes presence="online" />
    </div>
  ))
  .add('All presences', () => (
    <div className={avatarRowClass}>
      <DefaultAvatar size="large" presence="none" />
      <DefaultAvatar size="large" presence="online" />
      <DefaultAvatar size="large" presence="busy" />
      <DefaultAvatar size="large" presence="offline" />
    </div>)
  )
  .add('Avatars with images in the slot', () => (
    <div>
      <div>As well as the presence attribute, avatars can also display custom content on their badge
        by slotting it inside the element. <br />
        No styling is applied to slotted content by default and it is up the consumer to make the
        content fit (height and width of 100% and a background color
        are a good start)
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars have an image in their default slot and have been styled with "height: 100%;
          width: 100%;"
        </div>
        <AllAvatarSizes>
          <img
            src={tickWithBackgroundUrl}
            role="presentation"
            style={{ height: '100%', width: '100%' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars show the behaviour of transparent images in slots.
          Note there is no added background color
        </div>
        <AllAvatarSizes>
          <img
            src={tickUrl}
            role="presentation"
            style={{ height: '100%', width: '100%', color: 'green' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars have presence AND an image in the slot. The expected behaviour is that the
          images will take precedence.
        </div>
        <AllAvatarSizes presence="online">
          <img
            src={tickWithBackgroundUrl}
            role="presentation"
            style={{ height: '100%', width: '100%' }}
          />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          This example shows using a styled div as a presence.
        </div>
        <AllAvatarSizes presence="online">
          <div
            style={{
              backgroundColor: 'green',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              color: 'white',
              marginTop: '1px',
              lineHeight: '100%',
              fontSize: '1em',
            }}
          >
            1
          </div>
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          Another example showing a styled div as the inserted content
        </div>
        <AllAvatarSizes presence="online">
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'grey',
              display: 'inline-block',
            }}
          >
            <div
              style={{
                width: '60%',
                height: '20%',
                background: 'red',
                position: 'relative',
                top: '45%',
                left: '20%',
                transform: 'rotate(50deg)',
              }}
            >
            </div>
          </div>
        </AllAvatarSizes>
      </div>
    </div>
  ))
  .add('Avatar with a label', () => (
    <div className={avatarRowClass}>
      <div>
        This image should have an aria-label that should be read out when tabbing to the link
          around it and also an alt text.
      </div>
      <a href="#"><DefaultAvatar size="xlarge" label="This is an avatar!" /></a>
      <a href="#"><DefaultAvatar size="xlarge" label="This is an avatar!" src="" /></a>
    </div>
  ));

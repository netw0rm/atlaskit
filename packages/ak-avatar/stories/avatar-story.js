import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from '../src/index';
import avatarStoryStyles from 'style!./stories.less';
import { name } from '../package.json';
import hostStyles from 'style!./../src/host.less';

const { React, ReactDOM } = window;

const Avatar = reactify(AkAvatar, {
  React,
  ReactDOM,
});

const avatarClass = hostStyles.akAvatar;
const avatarUrl = require('url!./avatar-96.png');
const transparentAvatarUrl = require('url!./avatar-96-transparent.png');
const tickUrl = require('url!./tick.png');
const tickWithBackgroundUrl = require('url!./tick-with-background.png');

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
      <div className={storybookExampleClass} >
        <div>
          These avatars have an image in their default slot
        </div>
        <AllAvatarSizes>
          <img src={tickWithBackgroundUrl} role="presentation" />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars show the behaviour of transparent images in slots
        </div>
        <AllAvatarSizes>
          <img src={tickUrl} role="presentation" />
        </AllAvatarSizes>
      </div>
      <div className={storybookExampleClass} >
        <div>
          These avatars show that an image in the slot should override the presence
        </div>
        <AllAvatarSizes presence="online">
          <img src={tickWithBackgroundUrl} role="presentation" />
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

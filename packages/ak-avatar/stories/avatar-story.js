import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from '../src/index';
import avatarStoryStyles from 'style!./stories.less';
import { name } from '../package.json';
import hostStyles from 'style!./../src/host.less';

/* eslint-disable max-len */
const { React, ReactDOM } = window;

const Avatar = reactify(AkAvatar, {
  React,
  ReactDOM,
});

const avatarClass = hostStyles['ak-avatar'];
const avatarUrl = require('url!./avatar-96.png');

storiesOf(name, module)
  .add('A default avatar', () => (
    <Avatar src={avatarUrl} className={avatarClass} />
  ))
  .add('An avatar with an incorrectly defined size (falls back to default)', () => (
    <Avatar src={avatarUrl} size="megalarge" className={avatarClass} />
  ))
  .add('A xlarge avatar on background', () => {
    const divStyle = {
      backgroundColor: 'blue',
      padding: '10px',
    };
    return (
      <div style={divStyle}>
        <Avatar src={avatarUrl} size="xlarge" className={avatarClass} />
      </div>
    );
  })
  .add('A row of avatars', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} />
    </div>);
  })
  .add('A row of avatars with border color', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    const borderColor = 'red';
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} borderColor={borderColor} className={avatarClass} />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} borderColor={borderColor} className={avatarClass} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} borderColor={borderColor} className={avatarClass} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} className={avatarClass} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} borderColor={borderColor} className={avatarClass} />
    </div>);
  })
  .add('A row of avatars with online presence', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="online" />
    </div>);
  })
  .add('All presences', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="none" />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="away" />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="busy" />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="offline" />
    </div>);
  })
  .add('Avatar with a description', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} description="This is an avatar!" />
    </div>);
  });

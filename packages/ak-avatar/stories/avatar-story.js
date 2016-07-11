import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import definition from '../src/index';
import { define } from 'skatejs';
import avatarStoryStyles from 'style!./stories.less'; // eslint-disable-line import/no-unresolved
import { name } from '../package.json';

const { React, ReactDOM, uniqueWebComponent } = window;

const Avatar = reactify(uniqueWebComponent(name, definition, define), {
  React,
  ReactDOM,
});

const avatarUrl = 'https://design.atlassian.com/images/avatars/avatar-96.png';

storiesOf(name, module)
  .add('A default avatar', () => (
    <Avatar src={avatarUrl} />
  ))
  .add('An avatar with an incorrectly defined size (falls back to default)', () => (
    <Avatar src={avatarUrl} size="megalarge" />
  ))
  .add('A xsmall avatar', () => (
    <Avatar src={avatarUrl} size="xsmall" />
  ))
  .add('A xlarge avatar', () => (
    <Avatar src={avatarUrl} size="xlarge" />
  ))
  .add('A row of avatars', () => {
    const avatarRowStyle = 'margin-left: 10px;';
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} />
    </div>);
  })
  .add('A row of avatars with border color', () => {
    const avatarRowStyle = 'margin-left: 10px;';
    const borderColor = 'red';
    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} borderColor={borderColor} />
    </div>);
  })
  .add('Avatars in a group', () => {
    const avatarRowStyle = 'margin-left: -10px; position: relative;';
    const borderColor = 'white';
    const divStyle = {
      marginLeft: '5px',
      marginTop: '14.3px',
    };
    return (<div style={divStyle}>
      <Avatar src={avatarUrl} size="large" />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} borderColor={borderColor} />
    </div>);
  });

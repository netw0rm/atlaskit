import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';
import avatarStoryStyles from 'style!./stories.less'; // eslint-disable-line import/no-unresolved
import { name } from '../package.json';

const { React, ReactDOM, uniqueWebComponent } = window;

const Avatar = reactify(uniqueWebComponent(name, definition, define), {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('A default avatar', () => (
    <Avatar src="//docs.atlassian.com/aui/latest/docs/images/avatar-96.png" />
  ))
  .add('A xsmall avatar', () => (
    <Avatar src="//docs.atlassian.com/aui/latest/docs/images/avatar-96.png" size="xsmall" />
  ))
  .add('A xxlarge avatar', () => (
    <Avatar src="//docs.atlassian.com/aui/latest/docs/images/avatar-96.png" size="xxlarge" />
  ))
  .add('A row of avatars', () => {
    const avatarRowStyle = 'margin-left: 10px;';
    const avatarUrl = '//docs.atlassian.com/aui/latest/docs/images/avatar-96.png';

    return (<div className={avatarStoryStyles.rowOfAvatarsStory}>
      <Avatar src={avatarUrl} size="xsmall" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="xxlarge" style={avatarRowStyle} />
    </div>);
  })
  .add('Avatars in a group', () => {
    const avatarRowStyle = 'margin-left: -10px; position: relative;';
    const avatarUrl = '//docs.atlassian.com/aui/latest/docs/images/avatar-96.png';
    const divStyle = {
      marginLeft: '5px',
      marginTop: '14.3px',
    };
    return (<div style={divStyle}>
      <Avatar src={avatarUrl} size="large" />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
    </div>);
  })
  .add('Avatars in a group - DESIGN', () => (
    <img src="http://i.imgur.com/T6K0UrW.png" alt="Avatars in a group" />
  ))
  .add('A row of avatars - DESIGN', () => (
    <img src="http://i.imgur.com/VIZxsbk.png" alt="A row of Avatars" />
  ));

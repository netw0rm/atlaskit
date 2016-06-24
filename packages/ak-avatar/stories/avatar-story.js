import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

const Avatar = reactify(window.uniqueWebComponent('ak-avatar', definition, define), {
  React,
  ReactDOM,
});

storiesOf('ak-avatar', module)
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
    /* Not the best way to do this. Will need to figure something out. */
    const avatarRowStyle = 'margin-left: 10px;';
    const avatarUrl = '//docs.atlassian.com/aui/latest/docs/images/avatar-96.png';
    return (<div>
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
    return (<div>
      <Avatar src={avatarUrl} size="large" />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} />
    </div>);
  });

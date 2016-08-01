import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from '../src/index';
import { getInitialsForAllColors } from '../src/helpers';
import avatarStoryStyles from 'style!./stories.less';
import { name } from '../package.json';
import hostStyles from 'style!./../src/host.less';

const { React, ReactDOM } = window;

const Avatar = reactify(AkAvatar, {
  React,
  ReactDOM,
});

const avatarClass = hostStyles['ak-avatar'];
const avatarUrl = require('url!./avatar-96.png');

const avatarRowClass = avatarStoryStyles.rowOfAvatarsStory;
const rowClass = avatarStoryStyles.row;
const colClass = avatarStoryStyles.col;
const headerClass = avatarStoryStyles.header;

// Create an avatar with some sensible defaults
const DefaultAvatar = (props) => <Avatar
  src={avatarUrl}
  style={{ marginLeft: '10px' }}
  className={avatarClass}
  {...props}
/>;

// Create a row of avatars, one of each size with whatever props are passed in
const AllAvatarSizes = (props) => <div className={avatarRowClass}>
  <DefaultAvatar size="small" {...props} />
  <DefaultAvatar size="medium" {...props} />
  <DefaultAvatar size="large" {...props} />
  <DefaultAvatar size="xlarge" {...props} />
</div>;


storiesOf(name, module)
  .add('A default avatar', () => (
    <DefaultAvatar />
  ))
  .add('An avatar with an incorrectly defined size (falls back to default)', () => (
    <DefaultAvatar size="megalarge" />
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
  .add('A row of avatars', () => (
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
      <DefaultAvatar presence="none" />
      <DefaultAvatar presence="online" />
      <DefaultAvatar presence="busy" />
      <DefaultAvatar presence="offline" />
    </div>)
  )
  .add('Avatar with a label', () => (
    <div className={avatarRowClass}>
      <div>
        This image should have an aria-label that should be read out when tabbing to the link
          around it.
      </div>
      <a href="#"><DefaultAvatar size="xlarge" label="This is an avatar!" /></a>
    </div>
  ))
  .add('Avatars with names instead of images', () => (
    // We override the src in each one so that we force the initials to show
    <div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon Snow"</div>
          <AllAvatarSizes fullName="Jon Snow" src="" />
        </div>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon P. Snow"</div>
          <AllAvatarSizes fullName="Jon P. Snow" src="" />
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon"</div>
          <AllAvatarSizes fullName="Jon" src="" />
        </div>
        <div className={colClass}>
          <div className={headerClass}>fullName="Kit Harrington"</div>
          <AllAvatarSizes fullName="Kit Harrington" src="" />
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>Wide letters</div>
          <AllAvatarSizes fullName="W W" src="" />
        </div>
        <div className={colClass}>
          <div className={headerClass}>Wide letters</div>
          <AllAvatarSizes fullName="M M" src="" />
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>Chinese Characters</div>
          <AllAvatarSizes fullName="王 鹏" src="" />
        </div>
        <div className={colClass}>
          <div className={headerClass}>Arabic characters</div>
          <AllAvatarSizes fullName="عبد العزيز" src="" />
        </div>
      </div>
    </div>
  ))
  .add('All avatar colors', () => {
    // a generated list of initials that happen to fall on each value in the palette in order
    const initials = getInitialsForAllColors();
    const colorsInOrder = Object.keys(initials).sort();
    const initialsInOrder = colorsInOrder.map(colName => initials[colName]);
    return (<div className={avatarRowClass} style={{ width: '400px' }} >
      {
        initialsInOrder.map((user) => <Avatar fullName={user} size="large" />)
      }
    </div>);
  })
  .add('All avatar colors with all presences', () => {
    // a generated list of initials that happen to fall on each value in the palette in order
    const initials = getInitialsForAllColors();
    return (<div >
      <div className={rowClass}>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) =>
                <DefaultAvatar src="" fullName={user} presence="online" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) =>
                <DefaultAvatar src="" fullName={user} presence="away" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) =>
                <DefaultAvatar src="" fullName={user} presence="busy" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) =>
                <DefaultAvatar src="" fullName={user} presence="offline" />)
            }
          </div>
        </div>
      </div>
    </div>);
  });

import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkAvatar from '../src/index';
import { getInitialsForAllColors } from '../src/helpers';
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

const avatarRowClass = avatarStoryStyles.rowOfAvatarsStory;
const rowClass = avatarStoryStyles.row;
const colClass = avatarStoryStyles.col;
const headerClass = avatarStoryStyles.header;


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
    return (<div className={avatarRowClass}>
      <Avatar src={avatarUrl} size="small" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="large" style={avatarRowStyle} className={avatarClass} />
      <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} />
    </div>);
  })
  .add('All avatars with online presence', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div>
      <div>Only medium sized avatars should have presence displayed</div>
      <div className={avatarRowClass}>
        <Avatar src={avatarUrl} size="small" style={avatarRowStyle} className={avatarClass} presence="online" />
        <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="online" />
        <Avatar src={avatarUrl} size="large" style={avatarRowStyle} className={avatarClass} presence="online" />
        <Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} presence="online" />
      </div>
    </div>);
  })
  .add('All presences', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div className={avatarRowClass}>
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="none" />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="online" />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="away" />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="busy" />
      <Avatar src={avatarUrl} size="medium" style={avatarRowStyle} className={avatarClass} presence="offline" />
    </div>);
  })
  .add('Avatar with a label', () => {
    const avatarRowStyle = { margin: '10px' };
    return (<div className={avatarRowClass}>
      <div>This image should have an aria-label that should be read out when tabbing to the link around it.</div>
      <a href="#"><Avatar src={avatarUrl} size="xlarge" style={avatarRowStyle} className={avatarClass} label="This is an avatar!" /></a>
    </div>);
  })
  .add('Avatars with names instead of images', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    return (<div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon Snow"</div>
          <div className={avatarRowClass}>
            <Avatar fullName="Jon Snow" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon Snow" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon Snow" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon Snow" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon P. Snow"</div>
          <div className={avatarRowClass}>
            <Avatar fullName="Jon P. Snow" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon P. Snow" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon P. Snow" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon P. Snow" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>fullName="Jon"</div>
          <div className={avatarRowClass}>
            <Avatar fullName="Jon" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Jon" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
        <div className={colClass}>
          <div className={headerClass}>fullName="Kit Harrington"</div>
          <div className={avatarRowClass}>
            <Avatar fullName="Kit Harrington" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Kit Harrington" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Kit Harrington" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="Kit Harrington" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>Wide letters</div>
          <div className={avatarRowClass}>
            <Avatar fullName="W W" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="W W" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="W W" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="W W" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
        <div className={colClass}>
          <div className={headerClass}>Wide letters</div>
          <div className={avatarRowClass}>
            <Avatar fullName="M M" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="M M" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="M M" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="M M" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
      </div>
      <div className={rowClass}>
        <div className={colClass}>
          <div className={headerClass}>Chinese Characters</div>
          <div className={avatarRowClass}>
            <Avatar fullName="王 鹏" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="王 鹏" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="王 鹏" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="王 鹏" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
        <div className={colClass}>
          <div className={headerClass}>Arabic characters</div>
          <div className={avatarRowClass}>
            <Avatar fullName="عبد العزيز" size="small" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="عبد العزيز" size="medium" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="عبد العزيز" size="large" style={avatarRowStyle} className={avatarClass} />
            <Avatar fullName="عبد العزيز" size="xlarge" style={avatarRowStyle} className={avatarClass} />
          </div>
        </div>
      </div>
    </div>);
  })
  .add('All avatar colors', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    // a generated list of initials that happen to fall on each value in the palette in order
    const initials = getInitialsForAllColors();
    const colorsInOrder = Object.keys(initials).sort();
    const initialsInOrder = colorsInOrder.map(colName => initials[colName]);
    return (<div className={avatarRowClass} style={{ width: '400px' }} >
      {
        initialsInOrder.map((user) => <Avatar fullName={user} size="large" style={avatarRowStyle} className={avatarClass} />)
      }
    </div>);
  })
  .add('All avatar colors with all presences', () => {
    const avatarRowStyle = { marginLeft: '10px' };
    // a generated list of initials that happen to fall on each value in the palette in order
    const initials = getInitialsForAllColors();
    return (<div >
      <div className={rowClass}>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) => <Avatar fullName={user} size="medium" style={avatarRowStyle} className={avatarClass} presence="online" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) => <Avatar fullName={user} size="medium" style={avatarRowStyle} className={avatarClass} presence="away" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) => <Avatar fullName={user} size="medium" style={avatarRowStyle} className={avatarClass} presence="busy" />)
            }
          </div>
        </div>
        <div className={colClass}>
          <div className={avatarRowClass} style={{ width: '270px' }} >
            {
              Object.values(initials).map((user) => <Avatar fullName={user} size="medium" style={avatarRowStyle} className={avatarClass} presence="offline" />)
            }
          </div>
        </div>
      </div>
    </div>);
  });

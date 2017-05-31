
import * as React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import { AvatarGroup } from '../src';

const james = {
  label: 'James',
  presence: 'online',
  src: 'https://avatar-cdn.atlassian.com/14a437ba346533f33ca25e51172042ad?by=hash',
};
const ivan = {
  label: 'Ivan',
  presence: 'busy',
  src: 'https://avatar-cdn.atlassian.com/430b342a6970f547a1e3f99faa62c316?by=hash',
};
const hector = {
  label: 'Hector',
  presence: 'offline',
  src: 'https://avatar-cdn.atlassian.com/40f3a22018c4540f3f0e57757a7afce9?by=hash',
};
const michael = {
  label: 'Michael',
  icon: <span style={{ lineHeight: 1 }}>😀</span>,
  src: 'https://avatar-cdn.atlassian.com/cabecefa08b69935ac90301e21605cc2?by=hash',
};

const noAvatars = [];
const singleAvatar = [james];
const multipleAvatars = [james, ivan, hector, michael];

storiesOf(name, module)
  .add('AvatarGroup', () => (
    <div>

      <h1>&lt;AvatarGroup/&gt;</h1>

      <AvatarGroup avatars={noAvatars} />
      <br />
      <AvatarGroup avatars={singleAvatar} />
      <br />
      <AvatarGroup avatars={multipleAvatars} />

      <h3>size</h3>
      <table>
        <tr>
          <th>small</th>
          <td><AvatarGroup size="small" avatars={multipleAvatars} /></td>
        </tr>
        <tr>
          <th>medium</th>
          <td><AvatarGroup size="medium" avatars={multipleAvatars} /></td>
        </tr>
      </table>

      <h3>max</h3>
      <table>
        <tr>
          <th>2</th>
          <td><AvatarGroup max={2} avatars={multipleAvatars} /></td>
        </tr>
        <tr>
          <th>3</th>
          <td><AvatarGroup max={3} avatars={multipleAvatars} /></td>
        </tr>
      </table>

      <h3>borderColor</h3>
      <table>
        <tr>
          <th>red</th>
          <td><AvatarGroup borderColor="red" avatars={multipleAvatars} /></td>
        </tr>
        <tr>
          <th>green</th>
          <td><AvatarGroup borderColor="green" avatars={multipleAvatars} /></td>
        </tr>
      </table>

    </div>
  ))
;

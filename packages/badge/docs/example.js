/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import Badge from '@atlaskit/badge';

const Badges = () => (
  <div>
    <div>
      <Badge value={5} />
      <Badge appearance="primary" value={-5} />
      <Badge appearance="important" value={25} />
      <Badge appearance="added" max={99} value={3000} />
      <Badge appearance="removed" />
      <Badge appearance="default" theme="dark" />
    </div>
  </div>
);

export default Badges;

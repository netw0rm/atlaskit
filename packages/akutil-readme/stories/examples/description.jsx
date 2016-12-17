import React from 'react';
import { Description } from 'akutil-readme';

export default (
  <div>
    <Description>Single line</Description>
    <Description>{['multiple lines', 'of content']}</Description>
  </div>
);

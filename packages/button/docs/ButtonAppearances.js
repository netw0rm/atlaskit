import React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';

const ButtonAppearance = () => (
  <ButtonGroup>
    <Button>
      Default
    </Button>
    <Button appearance="primary">
      Primary
    </Button>
    <Button appearance="link">
      Link
    </Button>
    <Button appearance="subtle" >
      Subtle
    </Button>
    <Button appearance="subtle-link" >
      Subtle link
    </Button>
  </ButtonGroup>
);

export default ButtonAppearance;

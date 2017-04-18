import React, { PureComponent } from 'react';
import Button from '../src';

export default class Docs extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Buttons are used as triggers for actions. They are used in forms,
          toolbars, dialog footers and as stand-alone action triggers.
        </div>
        <div>
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
          <Button isSelected>
            Selected
          </Button>
        </div>
      </div>
    );
  }
}

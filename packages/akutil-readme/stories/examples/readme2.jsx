import React, { PureComponent } from 'react';
import Readme from 'akutil-readme';

class MyComponent extends PureComponent {
  static displayName = 'MyComponent'
}

export default (
  <Readme
    component={MyComponent}
    description="Short description."
  />
);
